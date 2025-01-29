from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
# from django.conf import settings
from django.db import models


class Admin(models.Model):
    ID_user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        primary_key=True
    )
    admin_type = models.IntegerField(null=False)


class Article(models.Model):
    ID_Article = models.IntegerField(primary_key=True)
    # ID_Parent = models.ForeignKey(  # may be wrong
    #     'Article',
    #     on_delete=models.CASCADE,
    #     null=True,
    #     blank=False
    # )
    ID_Prev_Article = models.ForeignKey(  # may be wrong
        'Article',
        on_delete=models.CASCADE,
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
    has_content = models.BooleanField(null=True)
    img_cover = models.TextField(null=True)
    parent_type = models.IntegerField(null=True)
    score = models.IntegerField(null=True)


class Article_Content(models.Model):
    ID_Content = models.AutoField(primary_key=True)
    ID_Article = models.ForeignKey(
        'Article',
        on_delete=models.CASCADE,
        null=False
    )
    content = models.TextField(null=False)


class Article_Feedback(models.Model):
    ID_Article = models.ForeignKey(
        'Article',
        on_delete=models.CASCADE,
        null=False,
        primary_key=True
    )
    punctuation = models.IntegerField(null=False)
    comments = models.TextField(null=True)


class List(models.Model):
    ID_List = models.AutoField(primary_key=True)
    ID_User = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        null=False
    )
    list_name = models.TextField(null=False)
    is_private = models.SmallIntegerField(null=False)


class List_Item(models.Model):
    ID_List = models.AutoField(primary_key=True)
    ID_Article = models.ForeignKey(
        'Article',
        on_delete=models.CASCADE,
        null=False,
        blank=False
    )


class Progress(models.Model):
    ID_User = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        blank=False,
        primary_key=True
    )
    ID_Article = models.ForeignKey(
        'Article',
        on_delete=models.CASCADE,
        null=False,
        blank=False
    )
    subject = models.CharField(max_length=150, null=True)
    topic = models.CharField(max_length=150, null=True)
    subtopic = models.CharField(max_length=150, null=True)
