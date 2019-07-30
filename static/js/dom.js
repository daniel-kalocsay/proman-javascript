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
    },

    showBoards: function (boards) {
        // it adds necessary event listeners also
        // shows boards appending them to #boards div

        const boardsTemplate = document.querySelector('#board-template');

        for (let board of boards) {
            const clone = document.importNode(boardsTemplate.content, true);

            clone.querySelector('.board-title').textContent = board.title;
            clone.querySelector('.board').setAttribute('id', `board-${board.id}`);
            clone.querySelector('.board').dataset.boardId = board.id;

            clone.querySelector('.card-add').setAttribute('id', `board-${board.id}-add-card`);

            let newBoard = clone.querySelector('.board');
            newBoard.querySelector('.board-toggle').addEventListener('click', function () {
                newBoard.querySelector('.board-columns').classList.toggle('invisible');
            });


            document.querySelector('.board-container').appendChild(clone);
            dom.loadCards(board.id);

            dom.setNewCardButton(board)
            dom.setListenerToAddNewCard(board)
        }
    },

    loadCards: function (board_id) {
        // retrieves boards and makes showBoards called
        dataHandler.getCardsByBoardId(board_id, function (cards) {
            dom.showCards(cards);
            dataHandler.addRenameCard()
        });
    },

    showCard: function (card) {
        const cardTemplate = document.querySelector('#card-template');
        const currentBoard = document.querySelector(`#board-${card.board_id}`);
        const clone = document.importNode(cardTemplate.content, true);

        clone.querySelector('.card-title').textContent = card.title;
        clone.querySelector('.card-title').dataset.cardId = card.id;

        if (card.status_id === 1) {
            currentBoard.querySelector('.new').appendChild(clone);
        } else if (card.status_id === 2) {
            currentBoard.querySelector('.in-progress').appendChild(clone);
        } else if (card.status_id === 3) {
            currentBoard.querySelector('.testing').appendChild(clone);
        } else if (card.status_id === 4) {
            currentBoard.querySelector('.done').appendChild(clone);
        }
    },

    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also

        for (let card of cards) {
            this.showCard(card);
        }
    },

    setNewCardButton: function (board) {
        let addCardButton = document.querySelector(`#board-${board.id}-add-card`);
        let currentCreateCardModal = document.querySelector('#create-card-modal');

        addCardButton.addEventListener('click', function () {
            currentCreateCardModal.querySelector('.modal-title').textContent = `Add new card to ${board.title}`;

            $("#create-card-modal").modal();


        })
    },
    setListenerToAddNewCard: function (board) {
        const modalInput = document.querySelector('.form-control');
        const modalSubmitButton = document.querySelector('.send-new-card');
        modalSubmitButton.addEventListener('click', function () {
            fetch(`/add-card-to-board/${board.id}`, {
                method: 'POST',
                body: JSON.stringify(modalInput.value)
            })
                .then(response => response.json())
                .then((card) => dom.showCard(card));
            // $("#create-card-modal").modal(); // TODO close modal
        })
    }
};

