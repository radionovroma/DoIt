const notes = {
  list: [
    {
      id: 0,
      title: 'Lorem ipsum',
      changed: false,
      data: new Date(2022, 10, 5, 22, 7, 52, 234),
      description: 'Dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
    },
    {
      id: 1,
      title: '',
      changed: false,
      data: new Date(2022, 10, 11, 23, 33, 41, 693),
      description: 'Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.',
    },
    {
      id: 2,
      title: 'Nullam dictum ',
      changed: true,
      data: new Date(2022, 10, 21, 6, 3, 14, 865),
      tasksList: [
        {
          id: 0,
          task: 'felis eu pede mollis pretium',
          completed: false,
        },
        {
          id: 1,
          task: 'integer tincidunt',
          completed: false,
        },
        {
          id: 2,
          task: 'cras dapibus',
          completed: true,
        },
        {
          id: 3,
          task: 'vivamus elementum semper nisi',
          completed: false,
        },
        {
          id: 5,
          task: 'aenean vulputate eleifend tellus',
          completed: true,
        },
      ],
    },
    {
      id: 4,
      title: 'Aenean leo ligula',
      changed: false,
      data: new Date(2022, 10, 15, 19, 49, 37, 129),
      description: 'porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.',
    },
    {
      id: 5,
      title: 'quisque rutrum',
      changed: true,
      data: new Date(2022, 10, 17, 17, 15, 51, 428),
      tasksList: [
        {
          id: 0,
          task: 'etiam ultricies nisi vel augue',
          completed: true,
        },
        {
          id: 2,
          task: 'curabitur ullamcorper ultricies nisi',
          completed: true,
        },
        {
          id: 3,
          task: 'nam eget dui',
          completed: true,
        },
        {
          id: 7,
          task: 'etiam rhoncus',
          completed: true,
        },
        {
          id: 8,
          task: 'maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum',
          completed: true,
        },
        {
          id: 9,
          task: 'nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus',
          completed: true,
        },
      ],
    },
    {
      id: 6,
      title: 'Donec vitae sapien ut libero venenatis faucibus',
      changed: true,
      data: new Date(2022, 10, 26, 20, 26, 17, 937),
      description: 'Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla',
    },
    {
      id: 10,
      title: 'Vestibulum ante',
      changed: false,
      data: new Date(2022, 10, 22, 9, 35, 4, 732),
      description: 'ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia',
    },
    {
      id: 11,
      title: '',
      changed: false,
      data: new Date(2022, 10, 21, 10, 23, 13, 352),
      tasksList: [
        {
          id: 0,
          task: 'Nam pretium turpis et arcu',
          completed: false,
        },
        {
          id: 1,
          task: 'Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum',
          completed: false,
        },
        {
          id: 2,
          task: 'Sed aliquam ultrices mauris',
          completed: false,
        },
        {
          id: 3,
          task: 'Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris',
          completed: false,
        },
        {
          id: 4,
          task: 'Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum',
          completed: false,
        },
        {
          id: 5,
          task: 'Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede',
          completed: false,
        },
        {
          id: 6,
          task: 'Sed lectus. Donec mollis hendrerit risus',
          completed: false,
        },
        {
          id: 7,
          task: 'Phasellus nec sem in justo pellentesque facilisis',
          completed: false,
        },
        {
          id: 8,
          task: 'Etiam imperdiet imperdiet orci. Nunc nec neque',
          completed: false,
        },
      ],
    },
    {
      id: 12,
      title: '',
      changed: false,
      data: new Date(2022, 10, 24, 17, 36, 43, 842),
      description: 'Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo',
    },
    {
      id: 13,
      title: 'Maecenas malesuada',
      changed: true,
      data: new Date(2022, 11, 1, 13, 23, 6, 543),
      tasksList: [
        {
          id: 0,
          task: 'praesent congue erat at massa',
          completed: false,
        },
        {
          id: 1,
          task: 'sed cursus turpis vitae tortor',
          completed: false,
        },
        {
          id: 3,
          task: 'donec posuere vulputate arcu',
          completed: false,
        },
      ],
    },
  ],
  addNote(title, description, tasksList) {
    const note = {
      id: this.getNoteId(),
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
  getNoteId() {
    return this.list.length ? (this.list[this.list.length - 1].id + 1) : 0;
  },
};

export default notes;
