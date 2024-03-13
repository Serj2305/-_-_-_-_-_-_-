import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.shortcuts import render
from django.shortcuts import redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pathlib import Path

import random

from fpdf import FPDF

from app1.models import AdditionalInfoUser, Sign, ExamInfo, Category


@login_required
def index_page(request):
    return render(request, 'index.html')


@login_required
def project_page(request):
    return render(request, 'project-page.html')


@login_required
def signs_page(request):
    return render(request, 'signs-page.html')


@login_required
def test_page(request):
    return render(request, 'test-page.html')


@login_required
def exam_page(request):
    return render(request, 'exam-page.html')


@login_required
def account_page(request):
    if request.user.is_superuser:
        send_exam_data_pdf()
    return render(request, 'personal-account-page.html')


# формирует словарь знаков
def send(request):
    data = Sign.objects.all().values("name", "description", "category", "photo", "realObjectPhoto")
    data_from_database = {}
    id = 0
    for row in data:
        id += 1
        data_from_database[f'{id}'] = {'name': row['name'], 'description': row['description'],
                                       'category': row['category'],
                                       'picture': "/images/" + row['photo'],
                                       'pictureWorld': "/images/" + row['realObjectPhoto']}
    return JsonResponse(data_from_database)


# формирует тест
def sendTest(request):
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

        count = 0
        for i in answers:
            if i == "":
                count += 1
        for i in range(count):
            answers.remove("")
        count = 0

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


# формирует экзамен
def sendExam(request):
    data = Sign.objects.all().values("photo", "realObjectPhoto", "category", "complexity", "question1", "answer1",
                                     "question2", "answer2",
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
                                       'pictureWorld': "/static/" + row["realObjectPhoto"],
                                       'category': row['category'], 'complexity': row["complexity"]}

    keys = [*data_from_database]
    random.shuffle(keys)
    new_data = dict()
    count = 0
    for key in keys:
        count += 1
        new_data.update({key: data_from_database[key]})

        new_data[count] = new_data[key]
        del new_data[key]

    categories = []
    filtered_data = {}

    for i in Category.objects.all().values("category"):
        categories.append(i["category"])

    index = 1
    for i in categories:
        count = 1
        for j in range(1, len(new_data)):
            if i == new_data[j]["category"] and new_data[j]["complexity"] == str(count):
                filtered_data[f'{index}'] = new_data[j]
                filtered_data[str(index)]["number"] = str(index)
                count += 1
                index += 1
            if count > 3:
                break

    return JsonResponse(filtered_data)


# отправляет информацию о результатах прохождени экзамена
def sendExamData(request):
    if request.user.is_authenticated:
        data = {}
        count = 1
        for i in ExamInfo.objects.filter(login=request.user).values("res", "startTime", "time"):
            data[count] = i
            count += 1
        return JsonResponse(data)


# функция регистрации
def registr(request):
    if request.user.is_authenticated:
        return render(request, 'index.html')
    else:
        # Массив для передачи данных шаблонны
        data = {}
        # Проверка что есть запрос POST
        if request.method == 'POST':
            # Создаём форму
            form = UserCreationForm(request.POST)
            x = form.fields['username']
            x.label = "Почта"
            x.help_text = "Почта должна быть выдана организацией УрФУ"
            # Валидация данных из формы
            if form.is_valid() and '@urfu' in form['username'].value():
                # Сохраняем пользователя
                form.save()
                # Передача надписи, если прошло всё успешно
                response = redirect('/login/')
                return response
            else:
                data['form'] = form
                return render(request, 'registr.html', data)
        else:
            # Создаём форму
            form = UserCreationForm()
            x = form.fields['username']
            x.label = "Почта"
            x.help_text = "Почта должна быть выдана организацией УрФУ"
            # Передаём форму для рендеринга
            data['form'] = form
            return render(request, 'registr.html', data)


# функция входа в аккаунт
def sign_in(request):
    if request.user.is_authenticated:
        logout(request)
    form = AuthenticationForm()
    x = form.fields['username']
    x.label = "Почта"
    x.help_text = "Почта должна быть выдана организацией УрФУ"

    if request.method == "POST":
        form = AuthenticationForm(None, data=request.POST)
        if form.is_valid():
            form.clean()
            user = form.get_user()
            new_user = authenticate(username=form.cleaned_data['username'],
                                    password=form.cleaned_data['password'],
                                    )
            login(request, new_user)
            info, created = AdditionalInfoUser.objects.get_or_create(login=form.cleaned_data['username'])
            if created:
                pass
            else:
                info.save()
            if user is not None:
                response = redirect('/index/')
                return response
    return render(request, 'login.html', {'form': form})


# отправляет информацию о категориях
def send_categories(request):
    data = Category.objects.all().values("name", "description", "category")
    data_from_database = {}
    id = 0
    for row in data:
        id += 1
        data_from_database[f'{id}'] = {'name': row['name'], 'description': row['description'],
                                       'category': row['category']}
    return JsonResponse(data_from_database)


# отправляет данные об аккаунте на фронтенд
def send_account_data(request):
    try:
        username = None
        if request.user.is_authenticated:
            username = request.user.username
        info = AdditionalInfoUser.objects.get(login=username)
        data = {'avatar': '/static/' + f'{info.avatar}', 'name': f'{info.name}', 'group': f'{info.group}',
                'is_superuser': f'{info.is_superuser}'}
    except:
        data = {'avatar': '-', 'name': '-', 'group': '-', 'is_superuser': '-'}

    return JsonResponse(data)


# получает данные об аккаунте с фронтенда
@csrf_exempt
def get_account_data(request):
    if request.user.is_authenticated:
        username = request.user.username
        t = AdditionalInfoUser.objects.get(login=username)

        t.name = request.POST.dict()['name']
        t.group = request.POST.dict()['group']
        t.is_superuser = request.user.is_superuser
        try:
            t.avatar = request.FILES['avatar']
            t.save(update_fields=["name", "group", "avatar", "is_superuser"])
        except:
            t.save(update_fields=["name", "group", "is_superuser"])
    return JsonResponse({}, status=204)


# сохраняет информацию о прохождении экзамена
@csrf_exempt
def get_exam_data(request):
    if request.user.is_authenticated:
        username = request.user.username
        t = ExamInfo.objects.create(
            login=username,
            res=json.loads(request.body)['res'],
            startTime=json.loads(request.body)['startTime'],
            time=json.loads(request.body)['time']
        )

        if (ExamInfo.objects.filter(login=username).count() > 10):
            ExamInfo.objects.filter(login=username)[0].delete()
            t.save(update_fields=["login", "res", "startTime", "time"])
    return JsonResponse({}, status=204)


# формирует pdf документ (ведомость) для суперпользователя
@csrf_exempt
def send_exam_data_pdf():
    data = [["ФИО/Группа", "Результат", "Время начала", "Заняло"]]
    for j in AdditionalInfoUser.objects.all().values("login", "name", "group"):
        for i in ExamInfo.objects.filter(login=j["login"]).values("login", "res", "startTime", "time"):
            i["login"] = j["name"] + "(" + j["group"] + ")"
            data.append(i.values())
        data.append([])

    pdf = FPDF(format='A4')
    pdf.add_font('DejaVu', '', Path("static", "fonts", 'DejaVuSansCondensed.ttf'), uni=True)
    pdf.set_font('DejaVu', '', 10)
    pdf.add_page()
    pdf.cell(0, 30, txt="Результаты экзамена", ln=1, align="C")

    row_height = pdf.font_size

    for row in data:
        for item in row:
            if list(row).index(item) == 0:
                pdf.cell(pdf.w / 2, row_height * 2,
                         txt=item, border=1)
            else:
                pdf.cell(pdf.w / 8, row_height * 2,
                         txt=item, border=1)
        pdf.ln(row_height * 2)

    pdf.output(Path("static", "exam_results", "Ведомость.pdf"))
