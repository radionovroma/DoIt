import editingBlock from './editingBox';
import checklist from './checklist';
import notes from '../store/notes';
import noteList from './noteList';

const addingForm = {
  mainBlock: document.querySelector('.main-block'),
  form: document.createElement('form'),
  unfoldButton: document.createElement('button'),
  renderButton() {
    this.unfoldButton.classList.add('main-block__adding-button');
    this.unfoldButton.setAttribute('type', 'button');
    this.unfoldButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
      </svg>
    `;
    this.mainBlock.append(this.unfoldButton);
  },
  renderForm() {
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
          <textarea class="input-box__description" placeholder="Note"></textarea>
        </label>
      </div>
    `;
    this.mainBlock.append(this.form);
  },
  unfoldForm() {
    this.form.append(editingBlock.block);
    const formInput = this.form.querySelector('.input-box__input');
    [formInput, this.unfoldButton].forEach((item) => {
      item.addEventListener('click', () => {
        if (document.body.clientWidth < 1024) {
          document.body.style.overflowY = 'hidden';
        }
        this.form.classList.add('active');
        const textarea = this.form.querySelector('.input-box__description');
        textarea.style.display = 'block';
        textarea.style.height = '32px';
        textarea.focus();
        checklist.calcTextareaHeight(textarea);
      });
    });
  },
  addSwitchingEvent() {
    const title = this.form.querySelector('.input-box__title');
    title.addEventListener('keydown', (e) => {
      let nextField = this.form.querySelector('.adding-field__checkbox-textarea');
      if (nextField === null) {
        nextField = this.form.querySelector('textarea');
      }
      if (e.key === 'Enter') {
        nextField.focus();
        e.preventDefault();
      }
    });
  },
  addNote() {
    const title = this.form.querySelector('.input-box__title').value.trim();
    const description = this.form.querySelector('.input-box__description').value.trim();
    const checkList = this.form.querySelectorAll('.checkbox-item');
    const tasksList = [];
    if (checkList.length) {
      checkList.forEach((item) => {
        const id = +item.querySelector('.checkbox').getAttribute('value');
        const task = item.querySelector('.checkbox-textarea').value.trim();
        const completed = item.querySelector('.checkbox').checked;
        if (task) {
          tasksList.push({ id, task, completed });
        }
      });
    }
    if (title || description || tasksList.length) {
      notes.addNote(title, description, tasksList);
    }
  },
  rollbackFormByClick() {
    document.addEventListener('click', (e) => {
      if (this.form.classList.contains('active') && document.body.clientWidth >= 1024) {
        const withinBoundaries = e.composedPath().includes(this.form);
        if (!withinBoundaries) {
          this.rollbackForm();
        }
      }
    });
  },
  rollbackFormByEsc() {
    document.addEventListener('keydown', (e) => {
      if (document.body.clientWidth >= 1024 && e.key === 'Escape') {
        this.rollbackForm();
      }
    });
  },
  rollbackFormByBtn() {
    const backButton = this.form.querySelector('.nav-box__back-button');
    const cancelButton = editingBlock.block.querySelector('.editing-box__cancel-button');
    [backButton, cancelButton].forEach((button) => {
      button.addEventListener('click', () => {
        this.rollbackForm();
      });
    });
  },
  rollbackForm() {
    if (document.body.clientWidth < 1024) {
      document.body.style.overflowY = 'auto';
    }
    this.form.classList.remove('active');
    const textarea = this.form.querySelector('.input-box__description');
    textarea.style.display = 'none';
    const checklistButton = editingBlock.block.querySelector('.checklist-button');
    checklistButton.removeAttribute('disabled');
    checklistButton.classList.remove('pressed');
    this.addNote();
    noteList.renderNotes();
    this.form.reset();
    this.removeCheckboxes();
    this.removeAddingField();
  },
  removeCheckboxes() {
    const tasksList = this.form.querySelectorAll('.checkbox-item');
    tasksList.forEach((item) => {
      item.remove();
    });
  },
  removeAddingField() {
    const field = this.form.querySelector('.input-box__adding-field');
    if (field) {
      field.remove();
    }
  },
  init() {
    this.renderButton();
    this.renderForm();
    this.unfoldForm();
    checklist.init();
    editingBlock.init();
    this.addSwitchingEvent();
    this.rollbackFormByClick();
    this.rollbackFormByEsc();
    this.rollbackFormByBtn();
  },
};

export default addingForm;
