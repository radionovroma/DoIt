import checklistButtonSvg from 'assets/checklist-button.svg';
import reminderButtonSvg from 'assets/reminder-button.svg';
import pinButtonSvg from 'assets/pin-button.svg';
import tagButtonSvg from 'assets/tag-button.svg';
import archiveButtonSvg from 'assets/archive-button.svg';
import trashButtonSvg from 'assets/trash-button.svg';
import checklist from './checklist';

const editingBlock = {
  block: document.createElement('div'),
  createEditingBox() {
    this.block.classList.add('adding-form__editing-box');
    this.block.classList.add('editing-box');
    this.block.innerHTML = `
    <ul class="editing-box__list editing-list">
      <li class="editing-list__item editing-item">
        <button class="editing-item__checklist-button checklist-button" type="button">
          ${checklistButtonSvg}
        </button>
      </li>
      <li class="editing-list__item editing-item">
        <button class="editing-item__reminder-button reminder-button" type="button">
          ${reminderButtonSvg}
        </button>
      </li>
      <li class="editing-list__item editing-item">
        <button class="editing-item__pin-button pin-button" type="button">
          ${pinButtonSvg}
        </button>
      </li>
      <li class="editing-list__item editing-item">
        <button class="editing-item__tag-button tag-button" type="button">
          ${tagButtonSvg}
        </button>
      </li>
      <li class="editing-list__item editing-item">
        <button class="editing-item__archive-button archive-button" type="button">
          ${archiveButtonSvg}
        </button>
      </li>
      <li class="editing-list__item editing-item">
        <button class="editing-item__trash-button trash-button" type="button">
          ${trashButtonSvg}
        </button>
      </li>
    </ul>
    <button class="editing-box__cancel-button" type="button">
      Close
    </button>
    `;
  },
  changingToChecklist() {
    const checklistButton = this.block.querySelector('.checklist-button');
    const inputBox = document.querySelector('.input-box');
    const textarea = document.querySelector('.input-box__description');
    checklistButton.addEventListener('click', () => {
      textarea.style.display = 'none';
      if (textarea.value !== '') {
        const tasksList = textarea.value.split(/\r?\n/).filter((item) => item);
        checklist.lastCheckboxId = tasksList.length - 1;
        tasksList.forEach((item, id) => {
          const fieldset = checklist.createCheckbox(id);
          const fieldsetTextarea = fieldset.querySelector('.checkbox-label__textarea');
          fieldsetTextarea.value = `${item}`;
          checklist.removeTaskByButton(fieldset);
          checklist.removeEmptyTask(fieldset);
          checklist.moveTaskField(fieldset);
          checklist.calcTextareaHeight(fieldsetTextarea);
          checklist.focusNewTaskField(fieldsetTextarea);
          inputBox.append(fieldset);
        });
        textarea.value = null;
      }
      inputBox.append(checklist.newTaskField);
      const newTaskFieldInput = checklist.newTaskField.querySelector('.adding-field__checkbox-textarea');
      newTaskFieldInput.focus();
      checklistButton.classList.add('pressed');
      checklistButton.setAttribute('disabled', 'disabled');
    });
  },
  init() {
    this.createEditingBox();
    this.changingToChecklist();
  },
};

export default editingBlock;
