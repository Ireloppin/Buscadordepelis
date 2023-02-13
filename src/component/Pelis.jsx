import React from 'react';
import Film from './Film';




const Pelis = ({movies}) => {
    const hayPelis = movies?.length > 0;

  return (
    
    <div>
        {hayPelis 
        ?
        <>
        <h2>Resultados</h2>
        <ul className='lista-pelis'>
          {movies.map(peli =>
          <Film 
          key={peli.id}
          peli={peli}
          />
          )}

        </ul>
        </>
        : 
        <h3>No hay resultados</h3>
        }      
        </div>
  )
}

export default Pelis