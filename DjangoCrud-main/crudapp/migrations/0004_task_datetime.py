# Generated by Django 3.2.9 on 2023-01-03 14:02

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crudapp', '0003_task_completed'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='dateTime',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
    ]