import React from 'react';
import './Watchlist.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useWatchlist } from '../../context/WatchlistContext';
import { Link } from 'react-router-dom';

const Watchlist = () => {
    const { watchlist, removeFromWatchlist } = useWatchlist();

    return (
        <div className='watchlist-page'>
            <Navbar />
            <div className="watchlist-container">
                <h1>My Watchlist</h1>
                {watchlist.length === 0 ? (
                    <div className="empty-watchlist">
                        <p>Your watchlist is empty.</p>
                        <Link to="/" className="browse-btn">Browse Movies</Link>
                    </div>
                ) : (
                    <div className="watchlist-grid">
                        {watchlist.map((movie) => (
                            <div className="watchlist-item" key={movie.id}>
                                <Link to={`/movie/${movie.movieId}`}>
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                                    <div className="watchlist-info">
                                        <p>{movie.title}</p>
                                    </div>
                                </Link>
                                <button
                                    className="remove-btn"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeFromWatchlist(movie.id);
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Watchlist;
