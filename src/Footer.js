import React from 'react'

const Footer = () => {
  const today = new Date();
  return (
    <main className='Footer'>
      <h1>Copyright &copy; {today.getFullYear()}</h1>
    </main>
  )
}

export default Footer