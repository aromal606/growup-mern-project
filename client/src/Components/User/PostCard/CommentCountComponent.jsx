import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CommentCountComponent = ({ postId, onCommentAdded }) => {
  const [count, setCount] = useState(0)

  const getCommentCount = async () => {
    try {
      const { data } = await axios.post("http://localhost:4000/comment/commentCount", { postId: postId });
      setCount(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCommentCount()
  }, [postId])

  useEffect(() => {
    if (onCommentAdded) {
      // If the onCommentAdded prop is provided, call it to update the comment count
      onCommentAdded(count);
    }
  }, [count, onCommentAdded]);

  return (
    <div>
      <p>
      {count}

      </p>
    </div>
  )
}

export default CommentCountComponent
