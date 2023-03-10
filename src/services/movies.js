const API_KEY = 'd8638a23'

export const searchMovies = async ({search})=>{
    if (search === '') return null

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()

        const movies = json.Search;

    return movies?.map(peli =>({
        id: peli.imdbID,
        title: peli.Title,
        year: peli.Year,
        poster: peli.Poster
      }))

        
    } catch (error) {
        throw new Error('Error searching movies')
    }


    
}