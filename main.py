from flask import Flask, render_template, url_for, request, redirect
from util import json_response

import data_handler, persistence

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('design.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return persistence.get_data_from_table('boards')

    # return data_handler.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return persistence.get_cards_by_board_id(board_id)


@app.route("/get-all-cards")
@json_response
def get_all_cards():
    """all the cards"""

    return persistence.get_all_cards()


@app.route("/rename-board/<int:board_id>", methods=['POST', 'GET'])
def rename_board(board_id):
    if request.method == 'POST':
        new_title = request.get_json('body')
        return persistence.rename_board(new_title, board_id)


@app.route("/rename-card/<int:card_id>", methods=['POST', 'GET'])
def rename_card(card_id):
    if request.method == 'POST':
        new_title = request.get_json('body')
        return persistence.rename_card(new_title, card_id)


@app.route('/add-card-to-board/<board_id>', methods=['GET', 'POST'])
@json_response
def add_new_card_to_board(board_id):
    new_card = request.get_json('body')
    return persistence.add_card(board_id, new_card)


@app.route('/delete-card/<string:card_id>', methods=['POST'])
@json_response
def route_delete_card(card_id):
    persistence.delete_card_by_id(card_id)

    return True


@app.route('/add-new-board', methods=['POST'])
@json_response
def route_add_new_board():
    board_title = request.get_json('body')
    new_board = persistence.add_board(board_title)
    new_board = [new_board]

    return new_board


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
