from pathlib import Path

from django.views.decorators.csrf import csrf_exempt

from app1.models import AdditionalInfoUser, ExamInfo
import pandas as pd


@csrf_exempt
def send_exam_data_xlsx():
    """
    Данная функция берет информацию о прохождении экзамена для всех пользователей,формирует .xlsx файл (ведомость)
    и сохраняет его в папку exam_results
    """
    data = []
    for j in AdditionalInfoUser.objects.all().values("login", "name", "group"):
        for i in ExamInfo.objects.filter(login=j["login"]).values("login", "res", "startTime", "time"):
            i["login"] = j["name"] + "(" + j["group"] + ")"
            data.append(i)

    df = pd.DataFrame({'Фио/Группа': [i['login'] for i in data],
                       'Результат': [i['res'] for i in data],
                       'Дата': [i['startTime'] for i in data],
                       'Время': [i['time'] for i in data]})

    df.to_excel(Path("static", "exam_results", "Ведомость.xlsx"), index=False)
