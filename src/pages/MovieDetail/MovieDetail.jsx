import React, { useEffect, useState } from 'react';
import './MovieDetail.css';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import play_icon from '../../assets/play_icon.png';
import { useWatchlist } from '../../context/WatchlistContext';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const { addToWatchlist } = useWatchlist();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWE0ZGM1MDQ5MDc0NWI1OTYwN2Q1ZTE3ZWVkMTliOSIsIm5iZiI6MTc3MTIyMDY3NC42NDksInN1YiI6IjY5OTJhZWMyYTI0NTJlMTJlZjEyNDc5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oGklfAHkSrszZ4SKez16g7WYjphgYnYGpaSao8NPWhI'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then(res => res.json())
            .then(res => setMovie(res))
            .catch(err => console.error(err));
    }, [id]);

    if (!movie) return <div className='movie-detail'>Loading...</div>;

    return (
        <div className='movie-detail'>
            <Navbar />
            <div className="movie-detail-container">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" className='detail-poster' />
                <div className="detail-info">
                    <h1>{movie.title || movie.original_title}</h1>
                    <div className="detail-stats">
                        <span className="stat-item">{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
                        <span className="stat-item">{movie.vote_average ? movie.vote_average.toFixed(1) : '0.0'} Rating</span>
                        <span className="stat-item">{movie.runtime || 0} min</span>
                    </div>
                    <p>{movie.overview}</p>
                    <div className="detail-btns">
                        <Link to={`/player/${movie.id}`} className='btn play-btn'>
                            <img src={play_icon} alt="" /> Play
                        </Link>
                        <button className='btn watchlist-btn' onClick={() => addToWatchlist(movie)}>
                            + Watchlist
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MovieDetail;
