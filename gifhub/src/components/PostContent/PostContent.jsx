import React from 'react'

const PostContent = (props) => {
  const { post } = props

  return (
    <div>
      <h2>{post.title}</h2>
      <button>add some more gifs</button>
    </div>
  )
}

export default PostContent
