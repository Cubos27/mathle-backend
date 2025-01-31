from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
# from django.conf import settings
from django.db import models


class Article(models.Model):
    ID_article = models.IntegerField(primary_key=True)
    ID_parent = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        related_name='Article',
        null=True,
        blank=False
    )
    ID_prev_article = models.OneToOneField(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=False

    )
    title = models.CharField(
        max_length=50,
        null=False,
        blank=False
    )
    description = models.TextField(
        max_length=300,
        null=False
    )
    type = models.IntegerField(null=False)
    has_content = models.BooleanField(null=False)
    img_cover = models.TextField(null=True)
    parent_type = models.IntegerField(null=True)
    score = models.IntegerField(null=True)


class Article_Content(models.Model):
    ID_content = models.AutoField(primary_key=True)
    ID_article = models.ForeignKey(
        'Article',
        on_delete=models.CASCADE,
        null=False
    )
    content = models.TextField(null=True)


class Article_Feedback(models.Model):
    ID_feedback = models.IntegerField(primary_key=True)
    ID_article = models.ForeignKey(
        'Article',
        on_delete=models.CASCADE,
        null=False
    )
    punctuation = models.IntegerField(null=False)
    comments = models.TextField(null=True)


class List(models.Model):
    ID_list = models.AutoField(primary_key=True)
    ID_user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        null=False
    )
    list_name = models.TextField(null=False)
    is_private = models.BooleanField(null=False, default=True)


class List_Item(models.Model):
    ID_list_item = models.IntegerField(primary_key=True)
    ID_list = models.ForeignKey(
        'List',
        on_delete=models.CASCADE,
        null=False,
        blank=False,
    )
    ID_article = models.ForeignKey(
        'Article',
        on_delete=models.CASCADE,
        null=False,
        blank=False
    )


class Progress(models.Model):
    ID_user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        blank=False,
        primary_key=True
    )
    ID_article = models.ForeignKey(
        'Article',
        on_delete=models.CASCADE,
        null=False,
        blank=False
    )
    subject = models.CharField(max_length=150, null=True)
    topic = models.CharField(max_length=150, null=True)
    subtopic = models.CharField(max_length=150, null=True)
