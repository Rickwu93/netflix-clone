import React, { useState, useEffect } from 'react'
import axios from './axios';
import './Row.css';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl }) {
    const [movies, setMovies] = useState([]);

    //a snippet of code which runs based on a specific condition/variable
    useEffect(() => {
        //if [], run once when the row loads, and don't run again (only on page load)
        async function fetchData() {
            //await the promise until promise returns result from fetchUrl
            const request = await axios.get(fetchUrl);
            // console.log(request.data.results);
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    }, [fetchUrl]); //included here cause it's a dependant on a variable that is called outside on useEffect, everytime fetchUrl changes we need to update our useEffect

    console.log(movies);

  return (
    <div className="row">
        <h2>{title}</h2>

        <div className="row__posters">
               
            {movies.map(movie => (
                <img 
                key={movie.id}
                className="row__poster"
                src={`${base_url}${movie.poster_path}`} 
                alt={movie.name}
                />
            ))}
        </div>
    </div>
  );
}

export default Row