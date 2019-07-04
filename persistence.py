import database_connection
from psycopg2 import sql

_cache = {}  # We store cached data in this dict to avoid multiple file readings

def clear_cache():
    for key in list(_cache.keys()):
        _cache.pop(key)


def get_statuses(force=False):
    return _get_data('statuses', STATUSES_FILE, force)


def get_boards(force=False):
    return _get_data('boards', BOARDS_FILE, force)


def get_cards(force=False):
    return _get_data('cards', CARDS_FILE, force)


@database_connection.connection_handler
def get_data_from_table(cursor, table_name):
    sql_query = """
                SELECT * FROM {table_name}
                ORDER BY id
                """

    sql_query = sql.SQL(sql_query).format(table_name=sql.Identifier(table_name))

    cursor.execute(sql_query, {'table_name': table_name})
    result = cursor.fetchall()

    return result


@database_connection.connection_handler
def get_all_cards(cursor):
    sql_query = """
                SELECT * FROM cards;
                """


    cursor.execute(sql_query)
    result = cursor.fetchall()

    return result


@database_connection.connection_handler
def get_cards_by_board_id(cursor, board_id):
    sql_query = """
                SELECT * FROM cards
                WHERE board_id = %(board_id)s
                """
    cursor.execute(sql_query, {'board_id': board_id})
    return cursor.fetchall()


@database_connection.connection_handler
def rename_board(cursor, new_title, board_id):
    sql_query = """
                UPDATE boards
                SET title = %(new_title)s
                WHERE id = %(board_id)s
                """
    cursor.execute(sql_query, {'new_title': new_title, 'board_id': board_id})


@database_connection.connection_handler
def rename_card(cursor, new_title, card_id):
    sql_query = """
                UPDATE cards
                SET title = %(new_title)s
                WHERE id = %(card_id)s
                """
    cursor.execute(sql_query, {'new_title': new_title, 'card_id': card_id})

