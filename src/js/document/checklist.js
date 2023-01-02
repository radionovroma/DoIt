import checkboxSvg from 'assets/checkbox.svg';
import crossSvg from 'assets/cross.svg';
import plusSvg from 'assets/plus.svg';

const checklist = {
  newTaskField: document.createElement('div'),
  renderNewTaskField() {
    this.newTaskField.classList.add('input-box__adding-field');
    this.newTaskField.classList.add('adding-field');
    this.newTaskField.innerHTML = `
      ${plusSvg}
      <textarea class="adding-field__checkbox-textarea checkbox-textarea" placeholder="List item"></textarea>
    `;
  },
  renderCheckbox(id) {
    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('input-box__checkbox-item');
    fieldset.classList.add('checkbox-item');
    fieldset.innerHTML = `
      <input class="checkbox-item__checkbox checkbox" type="checkbox" id="cb${id}" value="${id}">
      <label class="checkbox-item__label checkbox-label" for="cb${id}">
        ${checkboxSvg}
        <textarea class="checkbox-label__textarea checkbox-textarea"></textarea>
        <button class="checkbox-label__delete-button delete-button" type="button">
          ${crossSvg}
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
        const fieldset = this.renderCheckbox(this.lastCheckboxId);
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
    this.renderNewTaskField();
    this.focusNewTaskFieldByClick();
    this.addNewTaskFieldEvent();
  },
};

export default checklist;
