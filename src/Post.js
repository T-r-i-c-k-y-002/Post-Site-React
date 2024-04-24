import { Link } from "react-router-dom";
import './index.css'


const Post = ({ post }) => {
  return (
    <article className="post">
      <Link to={`post/${post.id}`}> {/* here we are getting the id of the particular clicked post. */}
        <h2 className="mainTitle">{post.title}</h2>
        <p id="mainDate" className="postDate">{post.datetime}</p>
      </Link>
      <p id="mainBody" className="postBody">{
        (post.body).length <=25 ? post.body : `${(post.body).slice(0,25)}...`
      }</p>
      
    </article>
  )
}

export default Post;



















// import React from 'react'
// import { useParams } from 'react-router-dom'

// const Post = () => {
//     const { id } = useParams(); // this hook is used to display the clicked id by the user.
//   return (
//     <div><br /> Post { id } </div>
//   )
// }

// export default Post