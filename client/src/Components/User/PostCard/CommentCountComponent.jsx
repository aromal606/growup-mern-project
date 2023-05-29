import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CommentCountComponent = ({ postId, onCommentAdded }) => {
  const [count, setCount] = useState(0)

  const getCommentCount = async () => {
    try {
       await axios.post("http://localhost:4000/comment/commentCount", { postId: postId }).then(({data})=>{
        setCount(data)
    

       })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCommentCount()
  }, [postId])
 

 

  return (
    <div>
      {count}
    </div>
  )
}

export default CommentCountComponent


