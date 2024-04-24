import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/DataContext'


const Home = () => {
  const { searchResults, isLoad, EditMsg, DelMsg } = useContext(DataContext)
  return (
    <main className="Home">
        {isLoad && <p className="loader" style={{textAlign: 'center'}}></p>}
        {EditMsg && <p className='handlepopupedit'>Successfully Updated the post.</p>}
        {DelMsg && <p className='handlepopupdelete'>Successfully Deleted the post.</p>}
        {!isLoad && (searchResults.length ? <Feed posts={searchResults} /> : <p className="statusMsg">No posts to display.</p>)}
    </main>
  )
}

export default Home