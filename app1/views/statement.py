from pathlib import Path

from django.views.decorators.csrf import csrf_exempt
from fpdf import FPDF

from app1.models import AdditionalInfoUser, ExamInfo


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

    pdf.output(Path("static", "examresults", "Ведомость.pdf"))
