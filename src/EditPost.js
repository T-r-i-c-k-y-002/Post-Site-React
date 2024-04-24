import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import DataContext from "./context/DataContext";

const EditPost = () => {
    const { posts, handleEdit, editBody, editTitle, setEditBody, setEditTitle } = useContext(DataContext)
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id) // when the post number matches with any post in the posts then it assigns it as a edit post.
    

    // here we are using the 'UseEffect' for displaying the data when the edit component is called.
    useEffect(() => {
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditBody, setEditTitle])

    return (
        <main className="NewPost">
            {editTitle && 
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title: </label>
                        <input 
                            type="text"
                            id="postTitle"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post: </label>
                        <textarea 
                            type="text"
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle && 
            <>
                <h2>No posts for Edit</h2>
                <p id="navi">
                <Link to= '/'>Visit Our Home Page</Link>
                </p>
            </>
            }
        </main>
    )
}

export default EditPost

