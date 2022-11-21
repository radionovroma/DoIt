import editingBox from './editingBox';

const addingForm = {
  mainBlock: document.querySelector('.main-block'),
  form: document.createElement('form'),
  unfoldButton: document.createElement('button'),
  createButton() {
    this.unfoldButton.classList.add('main-block__adding-button');
    this.unfoldButton.setAttribute('type', 'button');
    this.unfoldButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
      </svg>
    `;
    this.mainBlock.append(this.unfoldButton);
  },
  createForm() {
    this.form.classList.add('main-block__adding-form');
    this.form.classList.add('adding-form');
    this.form.innerHTML = `
      <div class="adding-form__nav-box nav-box">
        <button class="nav-box__back-button" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"> <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
          </svg>
        </button>
      </div>
      <div class="adding-form__input-box input-box">
        <label>
          <input class="input-box__input" type="text" placeholder="Note...">
        </label>
        <label>
          <input class="input-box__title" type="text" placeholder="Title">
        </label>
        <label>
          <textarea class="input-box__description" placeholder="Note" autofocus></textarea>
        </label>
      </div>
    `;
    this.mainBlock.append(this.form);
  },
  unfoldForm() {
    this.form.innerHTML += `${editingBox.editing}`;
    const formInput = document.querySelector('.input-box__input');
    [formInput, this.unfoldButton].forEach((item) => {
      item.addEventListener('click', () => {
        this.form.classList.add('active');
        const textarea = document.querySelector('.input-box__description');
        textarea.focus();
        textarea.style.height = '32px';
        this.calcTextareaHeight(textarea);
      });
    });
  },
  calcTextareaHeight(textarea) {
    textarea.addEventListener('input', (e) => {
      e.target.style.height = '0';
      const textareaHeight = Math.max(e.target.scrollHeight, 32);
      e.target.style.height = `${textareaHeight}px`;
    });
  },
  rollbackFormByClick() {
    document.addEventListener('click', (e) => {
      if (document.body.clientWidth > 768 && this.form.classList.contains('active')) {
        const withinBoundaries = e.composedPath().includes(this.form);
        if (!withinBoundaries) {
          this.form.classList.remove('active');
          this.form.reset();
        }
      }
    });
  },
  rollbackFormByEsc() {
    document.addEventListener('keydown', (e) => {
      if (document.body.clientWidth > 768) {
        if (e.code === 'Escape') {
          this.form.classList.remove('active');
          this.form.reset();
        }
      }
    });
  },
  rollbackFormByBtn() {
    const backButton = document.querySelector('.nav-box__back-button');
    const cancelButton = document.querySelector('.editing-box__cancel-button');
    [backButton, cancelButton].forEach((btn) => {
      btn.addEventListener('click', () => {
        this.form.classList.remove('active');
        this.form.reset();
      });
    });
  },
  init() {
    this.createButton();
    this.createForm();
    this.unfoldForm();
    this.rollbackFormByClick();
    this.rollbackFormByEsc();
    this.rollbackFormByBtn();
  },
};

export default addingForm;
