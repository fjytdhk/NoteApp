from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=50)


class Note(models.Model):
    title=models.CharField(max_length=100)
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField(Tag,blank=True,default=[])



