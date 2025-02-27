import { useEffect, useState } from 'react'
import { MovieImage } from './Components'
import { fetchMovies } from '../../utils/services'
import { SimpleMovieType } from '../../utils/Type'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

type prop = {
    header: string,
    caption: string
}

function MoviesBelt({ header, caption }: prop) {
    const [ movies, setMovies ] = useState<SimpleMovieType[]>()

    useEffect(() => {
        if (!header) return

        fetchMovies(header)
            .then(res => setMovies(res))
    }, [])

    useGSAP(() => {
        if (movies && movies.length > 0) { 
          gsap.fromTo(
            '.animate-card',
            {
              y: -50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1.5,
              stagger: 0.1,
              ease: 'power1.out',
            }
          );
        }
    }, [movies])
    
    return (
        <div className='my-8'>
            <h1 className='text-3xl font-bold'>{ header }</h1>
            <p className='opacity-55 text-xl mb-6'>{ caption }</p>

            <div className='flex gap-4'>
                {
                    movies && 
                    movies.map(movie => (
                        <MovieImage {...movie} key={movie.IMDB_ID}/>
                    ))
                }
            </div>
        </div>
    )
}

export default MoviesBelt
