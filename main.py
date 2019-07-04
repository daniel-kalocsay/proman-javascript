from flask import Flask, render_template, url_for
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


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
