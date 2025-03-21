from rest_framework.serializers import ModelSerializer
from .models import Note,Tag

class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"

class NoteSerializer(ModelSerializer):
    tags=TagSerializer(many=True,read_only=True)
    class Meta:
        model = Note
        fields = "__all__"


