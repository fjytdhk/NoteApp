import React ,{useState,useEffect}from 'react'
import { useParams ,Link } from 'react-router-dom'
import TagItem from '../components/TagItem'

const NotePage = () => {
  const {id}=useParams()

  const [note,setNote]=useState(null)
  const [tag,setTag]=useState("")
  const [click,setClick]=useState(false)
  
  useEffect(() => {
    getNote()
  },[id,click])

  const getNote = async ()=>{
    if(id==="new")return

    const response= await fetch(`/api/notes/${id}`)
    const data=await response.json()
    setNote(data)
  } 

  const deleteNote = async ()=>{
    fetch(`/api/notes/${id}/delete/`,{
      method: 'DELETE',
        'headers': {
        'Content-Type': 'application/json'
      }
    })
  }


  const handleChange = (value) => {
      setNote(note => ({ ...note, 'body': value }))
      fetch(`/api/notes/${id}/update/`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({new_body:`${value}`})
      }).then((response) => {
        response.json()
      }).then((data)=>{
        console.log(data)
      })  
    }

  const handleChangeTitle = (e) => {
    setNote((prevNote) => ({ ...prevNote, title: e.target.value }));
    fetch(`/api/notes/${id}/update_Title/`,{
      method:"PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({new_title:`${e.target.value}`})
    }).then(
      response=>response.json()
      ).then(data=>console.log(data))
  }

  const handleTagInput = (e) => {
    setTag(e.target.value)
  }
  const handleAddTag = () => {
    fetch(`/api/notes/${id}/add_Tag/${tag}/`,{
      method:"PUT",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response)=>{
      response.json()
    }).then((data)=>{
      console.log(data)
      setTag('')
      setClick(!click)
    })
  }

  const handleDeleteTag = async() => {
    fetch(`/api/notes/${id}/remove_Tag/${tag}/`,{
      method:"DELETE",
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((response)=>{
      response.json()
    }).then((data)=>{
      console.log(data)
      setTag('')
      setClick(!click)
    })
  }

  return (
    <div className='note'>

      <Link to={"/"}>
        <div className='delete-button' onClick={deleteNote}>
          <p>Delete</p>
        </div>
      </Link>

      <div className='input-container'>
        <input type="text" placeholder="title" value={note?.title || ""} onChange={handleChangeTitle}/>
        <input type="text" placeholder="add tag" value={tag} onChange={e=>handleTagInput(e)}/>
      </div>

      <div className='save-button' onClick={handleAddTag}> 
        <p>SaveTag</p>
      </div>

      <div className='save-button' onClick={handleDeleteTag}> 
        <p>DeleteTag</p>
      </div>
      
      <div className='note-tag-item'>
        {note?.tags.length!==0&& <p><span>{note?.tags?.map((tag,index)=>{return <TagItem key={index} tag={tag.name}/>})}</span></p>}      
      </div>
        
      <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
    </div>
  )
}
export default NotePage