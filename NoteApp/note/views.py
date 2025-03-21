from django.shortcuts import render
from rest_framework.response import Response
from .models import Note,Tag
from rest_framework.decorators import api_view
from .serializer import NoteSerializer
from rest_framework import filters
from rest_framework.generics import ListAPIView

# Create your views here.


@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all().order_by("-updated")
    serializer=NoteSerializer(notes,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getNote(request,pk):
    note = Note.objects.get(id=pk)
    serializer=NoteSerializer(note,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createNote(request):
    data = request.data
    note = Note.objects.create(
        title=data['title'],
        body=data['body']
    )
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
def updateNote(request,pk):
    data=request.data.get('new_body')
    note=Note.objects.get(id=pk)

    note.body=data
    note.save()
    #serializer=NoteSerializer(instance=note,data=data)

    #if serializer.is_valid():
        #serializer.save()
    return Response("Note updated")


@api_view(["DELETE"])
def deleteNote(request,pk):
    note=Note.objects.get(id=pk)
    note.delete()

    return Response("The note was deleted")


@api_view(["PUT"])
def addTagToNote(request,pk,tag_name):
    note=Note.objects.get(id=pk)
    tag,created=Tag.objects.get_or_create(name=tag_name)
    note.tags.add(tag)
    return Response("Tag added successfully")


@api_view(['DELETE'])
def removeTagFromNote(request,pk,tag_name):
    note=Note.objects.get(id=pk)
    tag=Tag.objects.get(name=tag_name)
    note.tags.remove(tag)

    return Response("Tag was deleted")


@api_view(["PUT"])
def updateTitle(request,pk):
    data=request.data.get("new_title")
    note= Note.objects.get(id=pk)
    note.title=data
    note.save()
    return Response("Title updated successfully")




class searchByTag(ListAPIView):
    queryset=Note.objects.all()
    serializer_class=NoteSerializer
    filter_backends=[filters.SearchFilter]
    search_fields=["tags__name"]


