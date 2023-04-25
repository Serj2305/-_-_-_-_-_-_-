import sqlite3


def read_sqlite_table():
    data_from_database = {}
    id = 0
    sqlite_connection = sqlite3.connect('db.sqlite3')
    cursor = sqlite_connection.cursor()

    sqlite_select_query = """SELECT * from app1_sign"""
    cursor.execute(sqlite_select_query)
    records = cursor.fetchall()

    for row in records:
        id += 1
        data_from_database[f'{id}'] = {'name': row[1], 'description': row[2], 'category': row[3],
                                       'picture': "/media/" + row[4]}
    return data_from_database
