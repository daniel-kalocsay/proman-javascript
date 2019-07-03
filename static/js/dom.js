// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    _appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (let childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }
        return elementToExtend.lastChild;
    },

    init: function () {
        // This function should run once, when the page is loaded.
    },

    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        });
    },

    showBoards: function (boards) {
        // it adds necessary event listeners also
        // shows boards appending them to #boards div

        const boardsTemplate = document.querySelector('#board-template');
        for (let board of boards) {
            dom.loadCards(board.id);
            const clone = document.importNode(boardsTemplate.content, true);
            clone.querySelector('.board-title').textContent = board.title;
            document.querySelector('.board-container').appendChild(clone);
        }
    },

    loadCards: function (board_id) {
        // retrieves boards and makes showBoards called
        dataHandler.getCardsByBoardId(board_id,function (cards) {
            dom.showCards(cards);
        });
    },

    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        const cardTemplate = document.querySelector('#card-template');
        for (let card of cards) {
            const clone = document.importNode(cardTemplate.content, true);
            clone.querySelector('.card-title').textContent = card.title;
            if (card.status_id === 1) {
                document.querySelector('.new').appendChild(clone);
            } else if (card.status_id === 2) {
                document.querySelector('.in-progress').appendChild(clone);
            } else if (card.status_id === 3) {
                document.querySelector('.testing').appendChild(clone);
            } else if (card.status_id === 4) {
                document.querySelector('.done').appendChild(clone);
            }
        }
    }
};

