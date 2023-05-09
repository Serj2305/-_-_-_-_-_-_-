import sqlite3


def read_sqlite_table(table):
    sqlite_connection = sqlite3.connect('db.sqlite3')
    cursor = sqlite_connection.cursor()

    sqlite_select_query = f"""SELECT * from {table}"""
    cursor.execute(sqlite_select_query)
    records = cursor.fetchall()

    if table == "app1_sign":
        data_from_database = {}
        id = 0
        for row in records:
            id += 1
            data_from_database[f'{id}'] = {'name': row[1], 'description': row[2], 'category': row[3],
                                           'picture': "/media/" + row[4]}
        return data_from_database

    if table == "app1_test":
        data_from_database = {}
        textQuestions = []
        answersList = []
        id = 0
        for row in records:
            textQuestions = row[1].split(",")
            answersList = row[2].split(",")
        for row in records:
            id += 1
            data_from_database[f'{id}'] = {'number': id, 'picture': "/media/" + row[3], 'textQuestions': textQuestions,
                                           'answerList': answersList}
        return data_from_database

    else:
        print("Недопустимая таблица")
        return {}