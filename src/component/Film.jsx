import React from 'react'

const Film = ({peli}) => {
  
  return (
    <li className='peli'>
      <h3>{peli.title}</h3>
      <p>{peli.year}</p>
      <img src={peli.poster} alt={peli.title}></img>
    </li>
  )
}

export default Film