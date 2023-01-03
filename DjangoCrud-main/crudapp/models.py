from django.db import models
import datetime

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length= 100)
    completed = models.BooleanField(default = False)
    dateTime =  models.DateTimeField(default= datetime.datetime.now)

    def __str__(self):
        return self.title