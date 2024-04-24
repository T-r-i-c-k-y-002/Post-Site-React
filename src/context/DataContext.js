import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";
import api from "../api/posts"
import { format } from "date-fns";

// initially storing the empty context data to a variable.
const DataContext = createContext({});

export const DataProvider = ({children}) => {

  const [EditMsg, setEditMsg] = useState(false);
  const [DelMsg, setDelMsg] = useState(false);

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState(true);

  const {width} = useWindowSize()

  useEffect(() => {
    const fetchPosts = async () => {
      try{
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch(err){
        if(err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }else {
          console.log(`Error: ${err.message}`);
        }
      }
    }
    setTimeout(()=>{
      fetchPosts();
      setIsLoad(false);
    }, 3000)
  }, [])


  // used for filtering the data.
  useEffect(() => {
    const filteredResults = posts.filter((post) => 
      ((post.body.toLowerCase()).includes(search.toLowerCase())) || 
      ((post.title.toLowerCase()).includes(search.toLowerCase()))
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody }; // it manages the structure of the new post.
    try{
      const response = await api.post('/posts', newPost) // posting the new created post in the db server.
      const allPosts = [...posts, response.data]; // then sending the response data and we are telling them to append this new post along with the existing posts.
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/') // once the user posted their post then they navigate back to home.
    } catch(err) {
      console.log(`ERROR: ${err.message}`);
    }
  };

  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  // const handleEdit = async (id) => {
  //   const datetime = format(new Date(), 'MMMM dd, yyyy pp');
  //   const updatedPost = { id, title: editTitle, datetime, body: editBody };
  //   try{
  //     const response = await api.put(`/posts/${id}`, updatedPost);
  //     setPosts(posts.map(post => post.id ? response.data : post)) // here it finds the id and changes the data of that id by mapping all posts and gets the specific id to be updated.
  //     setEditTitle('');
  //     setEditBody('');
  //     setEditMessage(true);
  //     navigate('/');
  //   } catch(err) {
  //     console.log(`ERROR: ${err.message}`);
  //   }

  //   setTimeout(() => {
  //     setEditMessage(false);
  //   }, 2000)
  // }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      const updatedPosts = posts.map(post => {
        if (post.id === id) {
          return response.data;
        } else {
          return post;
        }
      });
      setPosts(updatedPosts);
      setEditTitle('');
      setEditMsg(true)
      setEditBody('');
      navigate('/');
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }

    setTimeout(() => {
        setEditMsg(false);
    },2000);

  }
  

  const handleDelete = async (id) => {
    try{
      await api.delete(`posts/${id}`)  // deleting the data from database.
      const postList = posts.filter(post => post.id !== id);
      setPosts(postList)
      setDelMsg(true);
      navigate('/')
    }catch (err){
      console.log(`ERROR: ${err.message}`);
    }

    setTimeout(() => {
        setDelMsg(false);
    }, 2000)

  }

    return (
        <DataContext.Provider value={{
            width, search, setSearch,
            isLoad,setIsLoad,EditMsg,DelMsg,
            postTitle, setPostTitle, postBody, setPostBody, handleSubmit,
            searchResults,posts, handleDelete,
             handleEdit, editBody, editTitle, setEditBody, setEditTitle
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;