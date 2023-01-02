import Masonry from 'masonry-layout';
import notes from '../store/notes';
import noteSvg from '../../assets/note.svg';
import checkboxSvg from '../../assets/checkbox.svg';

const noteList = {
  list: document.createElement('ul'),
  mainBlock: document.querySelector('.main-block'),
  renderNoteList() {
    this.list.classList.add('main-block__note-list');
    this.list.classList.add('note-list');
  },
  renderNotes() {
    this.list.innerHTML = null;
    if (notes.list.length === 0) {
      const notePlaceholder = document.createElement('div');
      notePlaceholder.classList.add('note-placeholder');
      notePlaceholder.innerHTML = `
        ${noteSvg}
        <h1 class="note-placeholder__title">
          Your notes will be here
        </h1>
      `;
      this.mainBlock.append(notePlaceholder);
    } else {
      notes.list.forEach((item) => {
        const note = document.createElement('li');
        note.classList.add('note-list__item');
        note.classList.add('note');
        note.setAttribute('id', `${item.id}`);
        if (item.title) {
          const title = document.createElement('h2');
          title.classList.add('note__title');
          title.textContent = item.title;
          note.append(title);
        }
        if (item.description) {
          const description = document.createElement('p');
          description.classList.add('note__description');
          description.textContent = item.description;
          note.append(description);
        }
        if (item?.tasksList) {
          const uncheckedList = document.createElement('ul');
          uncheckedList.classList.add('note__checklist');
          uncheckedList.classList.add('note-checklist');
          uncheckedList.classList.add('note-checklist_unchecked');
          const checkedList = document.createElement('ul');
          checkedList.classList.add('note__checklist');
          checkedList.classList.add('note-checklist');
          checkedList.classList.add('note-checklist_checked');
          item.tasksList.forEach((task) => {
            const checkbox = document.createElement('li');
            checkbox.classList.add('note-checklist__item');
            checkbox.classList.add('checkbox');
            checkbox.innerHTML = `
              ${checkboxSvg}
              <p class="checkbox__task">${task.task}</p>
            `;
            if (task.completed) {
              checkedList.append(checkbox);
            } else {
              uncheckedList.append(checkbox);
            }
          });
          if (uncheckedList.querySelectorAll('.checkbox').length) {
            note.append(uncheckedList);
          }
          const countOfCheckedBoxes = checkedList.querySelectorAll('.checkbox').length;
          if (countOfCheckedBoxes) {
            note.append(checkedList);
            const checkedBoxesInfo = document.createElement('p');
            checkedBoxesInfo.classList.add('note__checked-boxes-info');
            checkedBoxesInfo.textContent = `+ ${countOfCheckedBoxes} checked items`;
            note.append(checkedBoxesInfo);
          }
        }
        this.list.prepend(note);
      });
      this.mainBlock.append(this.list);
      let gutterValue;
      if (document.body.clientWidth < 1024) {
        gutterValue = 10;
      } else {
        gutterValue = 15;
      }
      this.msnr = new Masonry(this.list, {
        itemSelector: '.note',
        gutter: gutterValue,
        fitWidth: true,
        stagger: 1,
        resize: true,
      });
    }
  },
  redrawMsnr() {
    const button = document.querySelector('.sidebar-button');
    button.addEventListener('click', () => {
      this.msnr.layout();
    });
  },
  init() {
    this.renderNoteList();
    this.renderNotes();
    this.redrawMsnr();
  },
};

export default noteList;
