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
        loadCards: function () {
            // retrieves boards and makes showBoards called
            dataHandler.getAllCards(function (cards) {
                dom.showCards(cards);
            });
        },
        showBoards: function (boards) {
            // it adds necessary event listeners also

            // shows boards appending them to #boards div
            let boardList = '';
            console.log(boards);

            const boardsTemplate = document.querySelector('#board-template');
            const clone = document.importNode(boardsTemplate.content, true);
            clone.querySelector('.board-title').textContent = boards[0].title;
            document.querySelector('.board-container').appendChild(clone);


            for (let board of boards) {
                boardList += `
                    <li>${board.title}</li>
                `;
            }
            console.log(boardList);
            document.querySelector('#boards').textContent = '';

            const outerHtml = `
                <ul class="board-container">
                    ${boardList}
                </ul>
            `;

            this._appendToElement(document.querySelector('#boards'), outerHtml);

        },
        showCards: function (cards) {
            // shows the cards of a board
            // it adds necessary event listeners also
        },
// here comes more features
    };
