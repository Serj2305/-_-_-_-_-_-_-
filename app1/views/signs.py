from django.http import JsonResponse

from app1.models import Sign, Category


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
