import { useState, useRef, forwardRef, useImperativeHandle } from "react"
import Like from "./Like"
import RemoveBlog from "./Remove"

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {
    display: visible ? '' : 'none',
    padding: 10,
    border: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    margin: 4,

  }
  const showWhenVisible = {
    display: visible ? 'none' : '',
    padding: 10,
    border: 2,
    borderColor: 'black',
    borderStyle: 'solid',
    margin: 4,

  }

  function toggleVisible() {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={toggleVisible}>view</button>
        <div>
          <p>Link: {blog.url}</p>
        </div>
        <div>
          <p>Author: {blog.author}</p>
        </div>
        <div>
          <div>
            <p>Likes: {blog.likes}</p>
            <Like key={blog.id} handleLike={handleLike} blogID={blog.id} blogLikes={blog.likes} />
          </div>
          <RemoveBlog handleRemove={handleRemove} blogID={blog.id}/>
        </div>
      </div>
      <div style={showWhenVisible}>
        {blog.title}<button onClick={toggleVisible}>hide</button>
      </div>
    </div>
  )
}

export default Blog