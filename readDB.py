import sqlite3


def read_sqlite_table():
    sqlite_connection = sqlite3.connect('db.sqlite3')
    cursor = sqlite_connection.cursor()
    print("Подключен к SQLite")

    sqlite_select_query = """SELECT * from app1_sign"""
    cursor.execute(sqlite_select_query)
    records = cursor.fetchall()
    print("Всего строк:", len(records))

    for row in records:
        print("ID:", row[0])
        print("Name:", row[1])
        print("Description:", row[2])
        print("Category:", row[3])
        print("Photo:", row[4], end="\n\n")

    cursor.close()


read_sqlite_table()
