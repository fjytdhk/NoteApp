import React,{useEffect,useState} from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'
import { useNavigate } from 'react-router-dom';

const NotesListPage = () => {
  const navigate=useNavigate()
  const [notes,setNotes] =useState([])


  useEffect(() => {
    getNotes()
  },[])

  const getNotes = async () =>{
    const response = await fetch('/api/notes')
    const data= await response.json()
    
    setNotes(data)
  }

  const createNotes = async () =>{
    
    const response = await fetch('/api/notes/create/',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({title: 'Untitled',body: ''}
      )
    })

    const data = await response.json()
    const newNoteId=data.id
    console.log(newNoteId)
      
    navigate(`/note/${newNoteId}`)
  }

  return (
    <div className='notes'>
        <div className='notes-list'>
            {notes.map((note,index) =>{
               return <ListItem key={index} note={note}/>
            }
            )}
        </div>
        <div onClick={createNotes}>
          <AddButton />
        </div>
        
    </div>
  )
}

export default NotesListPage