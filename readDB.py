import sqlite3


def read_sqlite_table(table, list=False):
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
            data_from_database[f'{id}'] = {'name': row[1], 'description': row[2], 'category': row[5],
                                           'picture': "/images/" + row[3], 'pictureWorld': "/images/" + row[4]}
        return data_from_database

    if table == "app1_test":
        data_from_database = {}
        textQuestions = []
        answersList = []
        id = 0
        for row in records:
            textQuestions.append(row[1].split(","))
            answersList.append(row[2].split(","))
        for row in records:
            id += 1
            data_from_database[f'{id}'] = {'number': id, 'picture': "/images/" + row[3],
                                           'textQuestions': textQuestions[id - 1],
                                           'answersList': answersList[id - 1], 'pictureWorld': "/images/" + row[4]}
        return data_from_database

    if table == "app1_exam":
        data_from_database = {}
        textQuestions = []
        answersList = []
        id = 0
        for row in records:
            textQuestions.append(row[3].split(","))
            answersList.append(row[4].split(","))
        for row in records:
            id += 1
            data_from_database[f'{id}'] = {'number': id, 'picture': "/images/" + row[1],
                                           'textQuestions': textQuestions[id - 1],
                                           'answersList': answersList[id - 1], 'pictureWorld': "/images/" + row[2]}
        return data_from_database

    if table == "app1_category" and list == False:
        data_from_database = {}
        id = 0
        for row in records:
            id += 1
            data_from_database[f'{id}'] = {'name': row[1], 'description': row[2], 'category': row[3]}
        return data_from_database

    elif table == "app1_category" and list == True:
        data_from_database = []
        categories = [['1', 'no category']]
        id = 1
        for row in records:
            id += 1
            data_from_database.append(str(id))
            data_from_database.append(row[1])
            categories.append(data_from_database)
            data_from_database = []
        return categories

    else:
        print("Недопустимая таблица")
        return {}
