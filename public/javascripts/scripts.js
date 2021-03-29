const app = {
  COLORS: [{
      name: 'green',
      hexa: '#00CABA'
    },
    {
      name: 'red',
      hexa: '#EB6769'
    },
    {
      name: 'yellow',
      hexa: '#F8E87F'
    },
    {
      name: 'blue',
      hexa: '#00ACD1'
    }
  ],

  // elements in the DOM
  fetchComponents: {
    PLAYGROUND: document.querySelector('.container__playground'),
  },

  // func() => creation of the cells in the playground
  drawCells: () => {
    // for each object in the array of colors
    for (const color of app.COLORS) {
      // we create a div, with a class, id and style
      let cell = document.createElement('div');
      cell.className = 'playground__cell';
      cell.id = color.name;
      cell.style.backgroundColor = color.hexa;

      // and we append the cell in the DOM
      app.fetchComponents.PLAYGROUND.appendChild(cell);

      // we also add it an addEventListener for when we click on the cell
      cell.addEventListener('click', app.clickOnCell);
    }
  },

  bumpCell: (color) => {
    const clickedCell = document.querySelector(`#${color}`);

    // let's modify the style of our cell
    clickedCell.style.borderWidth = '10px';

    // and reset the same style, after a small pause (150 ms)
    setTimeout(() => {
      clickedCell.style.borderWidth = '0px';
    }, 150);
  },

  clickOnCell: (event) => {
    // console.log('CLICK ON CELL!!!');
    // console.log(event.target);

    const clickedCell = event.target.id;

    app.bumpCell(clickedCell);
  },

  init: () => {
    app.drawCells();
  },
};

app.init();