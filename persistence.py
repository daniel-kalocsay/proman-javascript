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
                SELECT * FROM {table_name};
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


