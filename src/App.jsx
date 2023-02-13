

import { useEffect, useState, useRef, useCallback } from 'react';
import {useMovies} from './hooks/useMovies';
import './App.css'
import Pelis from './component/Pelis';
import debounce from 'just-debounce-it'

function useSearch(){
  const [search, setSearch]=useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if(isFirstInput.current){
      isFirstInput.current = search === ''
      return
    }

    if (search === ''){
      setError('Campo obligatorio para realizar la búsqueda')
      return
    }
    if (search.match(/^\d+$/)){
      setError('No se puede buscar una pelicula sólo con números')
      return
    }
    if (search.length < 3){
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }
    setError(null)
  }, [search])
  return {search, setSearch, error}
}


function App() {
  const [sort, setSort] = useState(false)

  const {search, setSearch, error} = useSearch()
  const {movies, getPelis, loading} = useMovies({search, sort})
  const hayPelis = movies?.length > 0;

  const debouncedGetMovies = useCallback(
    debounce(search => {
      
      getPelis({ search })
    }, 300)
    , [getPelis]
  )
  
  
  const handleSubmit = (e)=>{
      e.preventDefault();
      
      
    if(search === ''){
      setError('Por favor, escibe el titulo de la película que quieres buscar')
      setTimeout(() => {
        setError(null)
      }, 3000);
    }
      getPelis({search})     
      
  }
  
  const handleSort = () => {
    setSort(!sort)
  }
  const handleOnChange = (e)=>{
    const newSearch = e.target.value
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  
  }
  
 
  return (
    <div className='page'>
    <header>
      <div>
      <h1>Buscador de películas</h1>
      </div>
      <div>
      <form className='form' onSubmit={handleSubmit}>
      <input value={search} type="text" placeholder='Avengers, Forrest Gump. ...'
      onChange={handleOnChange}
      />
      
      
      <button type='submit'>Buscar</button>
      
      </form>
      {hayPelis? <div className='filtros'>
      <label>Ver por orden alfabético</label>
      <input type='checkbox' onChange={handleSort} checked={sort} />
      </div> 
      : '' }
      
      {error &&
      <p style={{color:'red'}}>{error}</p>
      }
      </div>
    </header>

    <main>
      {hayPelis? 
      <section >
        {loading ? <p>Cargando....</p> : <Pelis movies={movies} /> }
        
      </section>
      :
      ''
      }
      
      
    </main>
    </div>
  )                                                         
}

export default App
