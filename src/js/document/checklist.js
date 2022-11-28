const checklist = {
  newTaskField: document.createElement('div'),
  createNewTaskField() {
    this.newTaskField.classList.add('input-box__adding-field');
    this.newTaskField.classList.add('adding-field');
    this.newTaskField.innerHTML = `
      <svg class="adding-field__svg adding-field-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
      </svg>
      <textarea class="adding-field__checkbox-textarea checkbox-textarea" placeholder="List item"></textarea>
    `;
  },
  createCheckbox(id) {
    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('input-box__checkbox-item');
    fieldset.classList.add('checkbox-item');
    fieldset.innerHTML = `
      <input class="checkbox-item__checkbox checkbox" type="checkbox" id="cb${id}">
      <label class="checkbox-item__label checkbox-label" for="cb${id}">
        <svg viewBox="0 0 100 100">
          <path class="box" d="M82,89H18c-3.87,0-7-3.13-7-7V18c0-3.87,3.13-7,7-7h64c3.87,0,7,3.13,7,7v64C89,85.87,85.87,89,82,89z"/>
          <polyline class="check" points="25.5,53.5 39.5,67.5 72.5,34.5 "/>
        </svg>
        <textarea class="checkbox-label__textarea checkbox-textarea"></textarea>
        <button class="checkbox-label__delete-button delete-button" type="button">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 85L85 15" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M85 85C31.8903 30.8065 16.2043 15.7527 15 15" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </label>
    `;
    return fieldset;
  },
  calcTextareaHeight(textarea) {
    textarea.addEventListener('input', (e) => {
      e.target.style.height = '0';
      const textareaHeight = Math.max(e.target.scrollHeight, 26);
      e.target.style.height = `${textareaHeight}px`;
    });
  },
  removeTaskByButton(fieldset) {
    fieldset.addEventListener('click', (e) => {
      const button = fieldset.querySelector('.delete-button');
      if (button.contains(e.target)) {
        fieldset.remove();
      }
    });
  },
  removeEmptyTask(fieldset) {
    const textarea = fieldset.querySelector('.checkbox-textarea');
    textarea.addEventListener('keydown', (e) => {
      if ((e.key === 'Backspace' && textarea.value.length <= 1)) {
        fieldset.remove();
      }
    });
  },
  moveTaskField(fieldset) {
    fieldset.addEventListener('click', (e) => {
      const button = fieldset.querySelector('.delete-button');
      const textarea = fieldset.querySelector('.checkbox-textarea');
      const label = fieldset.querySelector('.checkbox-label');
      if (!button.contains(e.target) && !textarea.contains(e.target) && !label.contains(e.target)) {
        setTimeout(() => {
          let tasksList = Array.from(document.querySelectorAll('.checkbox-item'));
          const checkbox = fieldset.querySelector('.checkbox');
          const checkboxId = +checkbox.getAttribute('id').slice(2);
          let checked;
          if (checkbox.contains(e.target) && checkbox.checked) {
            tasksList = tasksList.filter((item) => {
              const itemCheckbox = item.querySelector('.checkbox');
              return !!itemCheckbox.checked;
            });
            checked = true;
          } else if (checkbox.contains(e.target) && !checkbox.checked) {
            tasksList = tasksList.filter((item) => {
              const itemCheckbox = item.querySelector('.checkbox');
              return !itemCheckbox.checked;
            });
            checked = false;
          }
          if (tasksList.length > 1) {
            for (let i = 0; i < tasksList.length; i += 1) {
              const checkedTaskId = tasksList[i].querySelector('.checkbox').getAttribute('id').slice(2);
              if (checkboxId < checkedTaskId) {
                tasksList[i].before(fieldset);
                break;
              } else if (i === tasksList.length - 1 && checked) {
                tasksList[i].after(fieldset);
              } else if (i === tasksList.length - 1 && !checked) {
                this.newTaskField.before(fieldset);
              }
            }
          } else if (checked) {
            this.newTaskField.after(fieldset);
          } else {
            this.newTaskField.before(fieldset);
          }
        }, 400);
      }
    });
  },
  focusNewTaskField(fieldset) {
    fieldset.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const newTaskFieldInput = this.newTaskField.querySelector('textarea');
        newTaskFieldInput.focus();
        e.preventDefault();
      }
    });
  },
  focusNewTaskFieldByClick() {
    const textarea = this.newTaskField.querySelector('textarea');
    const img = this.newTaskField.querySelector('svg');
    this.newTaskField.addEventListener('click', (e) => {
      if (img.contains(e.target)) {
        textarea.focus();
      }
    });
  },
  addNewTaskFieldEvent() {
    const textarea = this.newTaskField.querySelector('textarea');
    this.newTaskField.addEventListener('input', (e) => {
      textarea.value = e.target.value.trim();
      if (textarea.value) {
        const tasks = document.querySelector('.input-box__checkbox-item');
        if (!tasks) {
          this.lastCheckboxId = 0;
        } else {
          this.lastCheckboxId += 1;
        }
        const fieldset = this.createCheckbox(this.lastCheckboxId);
        this.newTaskField.before(fieldset);
        this.focusNewTaskField(fieldset);
        this.removeTaskByButton(fieldset);
        this.removeEmptyTask(fieldset);
        this.moveTaskField(fieldset);
        const lastTaskText = fieldset.querySelector('textarea');
        lastTaskText.value = e.target.value;
        lastTaskText.focus();
        this.calcTextareaHeight(lastTaskText);
        lastTaskText.setSelectionRange(lastTaskText.value.length, lastTaskText.value.length);
        e.target.value = null;
      }
    });
  },
  init() {
    this.createNewTaskField();
    this.focusNewTaskFieldByClick();
    this.addNewTaskFieldEvent();
  },
};

export default checklist;
