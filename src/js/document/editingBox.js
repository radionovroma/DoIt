import checklistButtonSvg from '../../assets/checklist-button.svg';
import reminderButtonSvg from '../../assets/reminder-button.svg';
import pinButtonSvg from '../../assets/pin-button.svg';
import tagButtonSvg from '../../assets/tag-button.svg';
import archiveButtonSvg from '../../assets/archive-button.svg';
import trashButtonSvg from '../../assets/trash-button.svg';

const editingBox = {
  editing: `
  <div class="adding-form__editing-box editing-box">
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
      Cancel
    </button>
  </div>`,
};

export default editingBox;
