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

  // sequences
  simon_sequence: [],
  player_sequence: [],
  // player level
  level: 0,

  // elements in the DOM
  fetchComponents: {
    PLAYGROUND: document.querySelector('.container__playground'),
    START_BUTTON: document.querySelector('.button__start'),
    PLAYER_INFOS: document.querySelector('.game__player'),
    SIMON_INFOS: document.querySelector('.game__simon'),
    CONTAINER_COUNTER: document.querySelector('.container__counter'),
    COUNTER: document.querySelector('.container__counter--bold'),
    CONTAINER_MESSAGE: document.querySelector('.container__message'),
  },

  // func() => creation of the cells in the playground
  drawCells: () => {
    // for each object in the array of colors
    for (const color of app.COLORS) {
      // we create a wrapper
      const containerCell = document.createElement('div');
      containerCell.className = 'playground__wrapper';
      app.fetchComponents.PLAYGROUND.appendChild(containerCell);

      // we create a div, with a class, id and style
      let cell = document.createElement('div');
      cell.className = `wrapper__cell ${color.name}`;
      cell.id = color.name;
      cell.style.backgroundColor = color.hexa;

      // and we append the cell in the DOM
      containerCell.appendChild(cell);

      // we also add it an addEventListener for when we click on the cell
      cell.addEventListener('click', app.clickOnCell);
    }
  },

  // func() => when the user loose the game
  resetGame: () => {
    // we emptied the sequences
    app.simon_sequence = [];
    app.player_sequence = [];

    // we reset the level of the game to zero
    app.level = 0;

    // the button to start the game and the block message is displayed
    app.fetchComponents.START_BUTTON.style.display = 'block';
    app.fetchComponents.CONTAINER_MESSAGE.style.display = 'block';

    // we hide the in game instructions
    app.fetchComponents.SIMON_INFOS.style.display = 'none';
    app.fetchComponents.PLAYER_INFOS.style.display = 'none';

    // we make the tray non-clickable
    app.fetchComponents.PLAYGROUND.style.pointerEvents = 'none';
  
    // we notified the player that he has lost his game
    app.fetchComponents.CONTAINER_MESSAGE.textContent = 'Dommage, c\'est perdu !';
  },

  // func() => when it is up to the user to play
  playerTurn: () => {
    app.fetchComponents.PLAYER_INFOS.style.display = 'flex';
    app.fetchComponents.CONTAINER_COUNTER.style.display = 'block';

    app.fetchComponents.PLAYER_INFOS.style.opacity = '1';
    app.fetchComponents.CONTAINER_COUNTER.style.opacity = '1';
    app.fetchComponents.SIMON_INFOS.style.opacity = '0.5';

    app.fetchComponents.PLAYGROUND.style.pointerEvents = 'auto';
  
    app.fetchComponents.COUNTER.textContent = `${app.level} / ${app.simon_sequence.length}`;
  },

  // func() => effect when the tiles are activated
  bumpCell: (color) => {
    const cell = document.querySelector(`#${color}`);

    cell.classList.add(`${color}--active`);

    // and reset the same style, after a small pause
    setTimeout(() => {
      cell.classList.remove(`${color}--active`);
    }, 175);
  },

  // func() => we play Simon's sequence
  playRound: (sequence) => {
    sequence.forEach((color, index) => {
      setTimeout(() => {
        app.bumpCell(color);
      }, (index + 1) * 600);
    });
  },

  // func() => we generate a new color for the Simon sequence
  getColor: () => {
    // we define a random index
    let random = Math.floor(Math.random() * 4);

    return app.COLORS[random].name;
  },

  // func() => when you click on a cell
  clickOnCell: (event) => {
    app.level += 1;

    const clickedCell = event.target.id;
    const index = app.player_sequence.push(clickedCell) - 1;

    app.bumpCell(clickedCell);

    app.fetchComponents.COUNTER.textContent = `${app.level} / ${app.simon_sequence.length}`;

    if (app.simon_sequence[index] !== app.player_sequence[index]) {
      app.resetGame();
      return;
    }

    if (app.simon_sequence.length === app.player_sequence.length) {
      app.player_sequence = [];
      setTimeout(() => {
        app.nextRound();
      }, 500);
      return; 
    }
  },

  // func() => when the user has made his sequence
  nextRound: () => {
    app.level = 0;

    // we hide the information block of the player, and the counter
    app.fetchComponents.PLAYER_INFOS.style.opacity = '0.5';
    app.fetchComponents.CONTAINER_COUNTER.style.opacity = '0.5';
    app.fetchComponents.SIMON_INFOS.style.opacity = '1';

    // we display the information block of Simon
    app.fetchComponents.SIMON_INFOS.style.display = 'flex';

    // the user is preventend from clicking on the tiles
    app.fetchComponents.PLAYGROUND.style.pointerEvents = 'none';

    // we generate a new color
    const newColor = app.getColor();
    // we create a copy of the actual sequence of Simon
    const newSequence = [...app.simon_sequence];
    // and we add in it the new color
    newSequence.push(newColor);
    // after all, we play the sequence of Simon
    app.playRound(newSequence);

    app.simon_sequence = [...newSequence];

    setTimeout(() => {
      app.playerTurn();
    }, app.simon_sequence.length * 600 + 300);
  },

  // func() => when the user clicks on the start button
  newGame: () => {
    // we hide the start button
    app.fetchComponents.START_BUTTON.style.display = 'none';

    app.fetchComponents.CONTAINER_MESSAGE.style.display = 'none';

    app.nextRound();
  },

  init: () => {
    app.drawCells();

    app.fetchComponents.PLAYGROUND.style.pointerEvents = 'none';
    app.fetchComponents.SIMON_INFOS.style.display = 'none';
    app.fetchComponents.PLAYER_INFOS.style.display = 'none';

    app.fetchComponents.START_BUTTON.style.transition = '0.3s background-color ease';

    app.fetchComponents.START_BUTTON.addEventListener('click', app.newGame);
  },
};

app.init();