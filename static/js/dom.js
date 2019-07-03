// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

function addEventlisteners() {
    let boardTitles = document.querySelectorAll('.board-title');
    for (let title of boardTitles) {
        title.addEventListener('click', function () {
            const boardId = this.parentNode.parentNode.id;
            const titleInput = document.createElement('input');
            const newTitle = 'Új cím';
            titleInput.placeholder = title.innerHTML;
            title.replaceWith(titleInput);
            fetch(`/rename-board/${boardId[boardId.length-1]}`, {
                method: 'POST',
                body: JSON.stringify(newTitle)
            })
                .then(response => console.log(response))  // parse the response as JSON
        })
    }
}

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
                addEventlisteners();
            });
        }
        ,

        showBoards: function (boards) {
            // it adds necessary event listeners also
            // shows boards appending them to #boards div

            const boardsTemplate = document.querySelector('#board-template');
            for (let board of boards) {
                const clone = document.importNode(boardsTemplate.content, true);
                clone.querySelector('.board-title').textContent = board.title;
                clone.querySelector('.board').setAttribute('id', `board-${board.id}`);
                document.querySelector('.board-container').appendChild(clone);
                dom.loadCards(board.id);
            }
        }
        ,

        loadCards: function (board_id) {
            // retrieves boards and makes showBoards called
            dataHandler.getCardsByBoardId(board_id, function (cards) {
                dom.showCards(cards);
            });
        }
        ,

        showCards: function (cards) {
            // shows the cards of a board
            // it adds necessary event listeners also
            const cardTemplate = document.querySelector('#card-template');
            for (let card of cards) {
                const currentBoard = document.querySelector(`#board-${card.board_id}`);
                const clone = document.importNode(cardTemplate.content, true);
                clone.querySelector('.card-title').textContent = card.title;
                if (card.status_id === 1) {
                    currentBoard.querySelector('.new').appendChild(clone);
                } else if (card.status_id === 2) {
                    currentBoard.querySelector('.in-progress').appendChild(clone);
                } else if (card.status_id === 3) {
                    currentBoard.querySelector('.testing').appendChild(clone);
                } else if (card.status_id === 4) {
                    currentBoard.querySelector('.done').appendChild(clone);
                }
            }
        }
    }
;

