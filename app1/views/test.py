import random

from django.http import JsonResponse

from app1.models import Sign


# формирует тест
def send_test(request):
    data = Sign.objects.all().values("photo", "realObjectPhoto", "question1", "answer1", "question2", "answer2",
                                     "question3", "answer3", "question4", "answer4", "question5", "answer5")
    questions = []
    answers = []
    textQuestions = []
    answersList = []
    for row in data:
        questions.append(row["question1"])
        questions.append(row["question2"])
        questions.append(row["question3"])
        questions.append(row["question4"])
        questions.append(row["question5"])

        answers.append(row["answer1"])
        answers.append(row["answer2"])
        answers.append(row["answer3"])
        answers.append(row["answer4"])
        answers.append(row["answer5"])

        count = 0
        for i in questions:
            if i == "":
                count += 1
        for i in range(count):
            questions.remove("")

        count = 0
        for i in answers:
            if i == "":
                count += 1
        for i in range(count):
            answers.remove("")

        textQuestions.append(questions)
        answersList.append(answers)

        questions = []
        answers = []

    data_from_database = {}

    id = 0
    for row in data:
        id += 1
        data_from_database[f'{id}'] = {'number': id, 'picture': "/static/" + row["photo"],
                                       'textQuestions': textQuestions[id - 1],
                                       'answersList': answersList[id - 1],
                                       'pictureWorld': "/static/" + row["realObjectPhoto"]}

    keys = [*data_from_database]
    random.shuffle(keys)
    new_data = dict()
    count = 0
    for key in keys:
        count += 1
        new_data.update({key: data_from_database[key]})

        new_data[count] = new_data[key]
        del new_data[key]

    for i in range(1, len(new_data)):
        new_data[i]["number"] = i

    return JsonResponse(new_data)