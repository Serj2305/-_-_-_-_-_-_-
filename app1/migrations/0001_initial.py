# Generated by Django 4.1.4 on 2023-05-24 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sign',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=500, verbose_name='Название знака')),
                ('description', models.CharField(max_length=500, verbose_name='Описание знака')),
                ('category', models.CharField(max_length=500, verbose_name='Категория знака')),
                ('photo', models.ImageField(upload_to='images/', verbose_name='Изображение знака')),
                ('realObjectPhoto', models.ImageField(upload_to='images/', verbose_name='Изображение реального объекта')),
            ],
            options={
                'verbose_name': 'знак',
                'verbose_name_plural': 'Добавить знак',
            },
        ),
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=500, verbose_name='Вопросы (вводить через запятую)')),
                ('answer', models.CharField(max_length=500, verbose_name='Ответы (вводить через запятую)')),
                ('photo', models.ImageField(upload_to='images/', verbose_name='Изображение')),
                ('name', models.CharField(blank=True, max_length=500, verbose_name='Название знака')),
                ('description', models.CharField(blank=True, max_length=500, verbose_name='Описание знака')),
                ('realObjectPhoto', models.ImageField(blank=True, upload_to='images/', verbose_name='Изображение реального объекта')),
            ],
            options={
                'verbose_name': 'новые вопросы и ответы для теста',
                'verbose_name_plural': 'Настройка теста',
            },
        ),
    ]
