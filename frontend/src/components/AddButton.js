import React from 'react'
import { ReactComponent as AddIcon } from '../assets/add.svg'


const AddButton = ({onClick}) => {
    return (
        <div className="floating-button">
            <AddIcon />
        </div>
    )
}

export default AddButton