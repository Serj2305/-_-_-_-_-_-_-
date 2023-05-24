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
                                           'picture': "/images/" + row[4]}
        return data_from_database

    if table == "app1_test":
        data_from_database_for_questions = {}
        data_from_database_for_answers = {}
        textQuestions = []
        answersList = []
        id = 0
        for row in records:
            textQuestions = row[1].split(",")
            answersList = row[2].split(",")
        for i in range(len(textQuestions)):
            textQuestions[i] = " ".join(textQuestions[i].split())
            textQuestions[i] = textQuestions[i][0].title() + textQuestions[i][1:]
        for i in range(len(answersList)):
            answersList[i] = " ".join(answersList[i].split())
        for row in records:
            id += 1
            data_from_database_for_questions[f'{id}'] = {'number': id, 'picture': "/images/" + row[3], 'textQuestions': textQuestions,
                                           'answersList': answersList}
            data_from_database_for_answers[f'{id}'] = {'number': id, 'puctureSign': "/images/" + row[3], 'puctureWorld': "/images/" + row[6],
                                                       'nameSign': row[4], 'descriptionSign': row[5]}
        return data_from_database_for_questions#, data_from_database_for_answers

    else:
        print("Недопустимая таблица")
        return {}