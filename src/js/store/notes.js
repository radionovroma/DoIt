const notes = {
  list: [],
  addNote(title, description, tasksList) {
    const note = {
      id: this.addNoteId(),
      title,
      date: new Date(),
      changed: false,
    };
    if (tasksList.length) {
      note.tasksList = tasksList;
    } else {
      note.description = description;
    }
    this.list.push(note);
  },
  addNoteId() {
    return this.list.length ? (this.list[this.list.length - 1].id + 1) : 0;
  },
};

export default notes;
