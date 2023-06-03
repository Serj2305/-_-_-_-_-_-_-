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
                                           'picture': "/images/" + row[4], 'pictureWorld': "/images/" + row[5]}
        return data_from_database

    if table == "app1_test":
        data_from_database = {}
        textQuestions = []
        answersList = []
        id = 0
        for row in records:
            textQuestions.append(row[1].split(","))
            answersList.append(row[2].split(","))
        for i in range(len(textQuestions)):
            for n in range(len(textQuestions[i])):
                textQuestions[i][n] = ' '.join(textQuestions[i][n].strip().split()).title()
        for i in range(len(answersList)):
            for n in range(len(answersList[i])):
                answersList[i][n] = ' '.join(answersList[i][n].strip().split())
        for row in records:
            id += 1
            data_from_database[f'{id}'] = {'number': id, 'picture': "/images/" + row[3], 'textQuestions': textQuestions[id - 1],
                                           'answersList': answersList[id - 1]}
        print(data_from_database)
        return data_from_database

    else:
        print("Недопустимая таблица")
        return {}