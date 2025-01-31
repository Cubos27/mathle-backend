from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Article


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
        write_only = (
            'password',
        )


# class ArticleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Article
#         fields = ['id', 'title', 'ID_parent', 'img_cover', 'type', 'score']
