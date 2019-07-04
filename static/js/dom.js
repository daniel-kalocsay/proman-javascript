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
                dataHandler.addRenameBoard();
            });
        }
        ,

        showBoards: function (boards) {
            // it adds necessary event listeners also
            // shows boards appending them to #boards div

            const boardsTemplate = document.querySelector('#board-template');
            for (let board of boards) {
                const clone = document.importNode(boardsTemplate.content, true);
                let newBoard = clone.querySelector('.board');
                clone.querySelector('.board-title').textContent = board.title;
                newBoard.setAttribute('id', `board-${board.id}`);
                newBoard.dataset.boardId = board.id;
                newBoard.querySelector('.board-toggle').addEventListener('click', function () {
                    newBoard.querySelector('.board-columns').classList.toggle('invisible');
                });
                document.querySelector('.board-container').appendChild(clone);
                dom.loadCards(board.id);
            }
        }
        ,

        loadCards: function (board_id) {
            // retrieves boards and makes showBoards called
            dataHandler.getCardsByBoardId(board_id, dom.showCards);
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

