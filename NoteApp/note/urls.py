from django.urls import path
from . import views


urlpatterns=[
    
    path('create/',views.createNote,name='CreateNote'),
    #path('search_by_tag/',views.searchByTag.as_view(),name='SearchByTag'),
    path('<str:pk>/update/',views.updateNote,name='UpdateNote'),
    path('<str:pk>/delete/',views.deleteNote,name='DeleteNote'),
    path('<str:pk>/',views.getNote,name='Note'),
    path('<str:pk>/add_Tag/<str:tag_name>/',views.addTagToNote,name='AddTag'),
    path('<str:pk>/remove_Tag/<str:tag_name>/',views.removeTagFromNote,name='RemoveTag'),
    path('<str:pk>/update_Title/',views.updateTitle,name="UpdateTitle"),
    path('',views.getNotes,name='NotesList')
    
]
