import { dom } from "./dom.js";

// This function is to initialize the application
function init() {
    console.log('lajhár');

    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();

}

init();
