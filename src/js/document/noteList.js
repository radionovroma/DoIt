import Masonry from 'masonry-layout';
import notes from '../store/notes';

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
        <svg width="76" height="100" viewBox="0 0 76 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 14C2 7.38125 7.38125 2 14 2H42C43.1046 2 44 2.89543 44 4V26C44 29.3188 46.6812 32 50 32H72C73.1046 32 74 32.8954 74 34V86C74 92.6187 68.6187 98 62 98H14C7.38125 98 2 92.6187 2 86V14ZM70.5858 22.5858C71.8457 23.8457 70.9534 26 69.1716 26H52C50.8954 26 50 25.1046 50 24V6.82843C50 5.04662 52.1543 4.15428 53.4142 5.41421L70.5858 22.5858Z" stroke="black" stroke-width="3" stroke-linejoin="round"/>
        </svg>
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
              <svg viewBox="0 0 100 100">
                <path class="box" d="M82,89H18c-3.87,0-7-3.13-7-7V18c0-3.87,3.13-7,7-7h64c3.87,0,7,3.13,7,7v64C89,85.87,85.87,89,82,89z"/>
                <polyline class="check" points="25.5,53.5 39.5,67.5 72.5,34.5 "/>
              </svg>
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
