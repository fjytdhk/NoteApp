import React from 'react'
import { Link } from 'react-router-dom'
import TagItem from './TagItem'

const ListItem = ({note}) => {

  let getTime = (note) => {
    let dateObject = new Date(note.updated);

    let year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1; 
    let day = dateObject.getDate();
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let seconds = dateObject.getSeconds();

    let formattedDateTime = year + "/" + addZero(month) + "/" + addZero(day) + " " +
        addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
    
    
    function addZero(number) {
        return number < 10 ? "0" + number : number;
    }
    return formattedDateTime
  }


  return (

    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item">
          <h1>{note.title}</h1>
          {note.tags.length!==0&&  <p><span>{note.tags?.map((tag,index)=>{return <TagItem key={index} tag={tag.name}/>})}</span></p>}
          <p><span>Last updated : {getTime(note)}</span></p>
      </div>
    </Link>  
  )
}

export default ListItem