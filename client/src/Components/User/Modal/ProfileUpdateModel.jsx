import React, { useState } from 'react'

const ProfileUpdateModel = () => {
    const[modal,setModel]=useState()
    const toggleModal=()=>{
        setModel(!modal)
    }
  return (
   <>
   <button onClick={toggleModal}>
    edit
   </button>
   <div className="overlay">
   </div>
   <div className="modalContent">

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, vitae!</p>
   <button onClick={toggleModal}>
    submit
   </button>
   </div>
   </>
  )
}

export default ProfileUpdateModel
