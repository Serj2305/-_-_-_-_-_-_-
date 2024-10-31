from django.http import JsonResponse

from app1.models import Sign, Category


def send_signs(request):
    """
    Данная функция берет информацию о знаках из базы данных и отправляет на фронтенд (страница "Смотреть")
    """
    data = Sign.objects.all().values("name", "description", "category", "photo", "realObjectPhoto")
    data_from_database = {}
    id = 0
    for row in data:
        id += 1
        data_from_database[f'{id}'] = {'name': row['name'], 'description': row['description'],
                                       'category': row['category'],
                                       'picture': "/media/" + row['photo'],
                                       'pictureWorld': "/media/" + row['realObjectPhoto']}
    return JsonResponse(data_from_database)


def send_categories(request):
    """
    Данная функция берет информацию о категориях из базы данных и отправляет на фронтенд для фильтра
    (страница "Смотреть")
    """
    data = Category.objects.all().values("name", "description", "category")
    data_from_database = {}
    id = 0
    for row in data:
        id += 1
        data_from_database[f'{id}'] = {'name': row['name'], 'description': row['description'],
                                       'category': row['category']}
    return JsonResponse(data_from_database)
