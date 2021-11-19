import {Game} from './classes/Game';

const stateGame = {
    time: 1,
};

document.addEventListener("DOMContentLoaded", function(event) {
    const instance = new Game();
    instance.init();
});
