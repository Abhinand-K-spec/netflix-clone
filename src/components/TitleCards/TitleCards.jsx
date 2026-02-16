import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';
// import cards_data from '../../assets/cards/Cards_data'


const TitleCards = ({title, category}) => {


  const [apiData, setApidata] = useState([]);
  const cardRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWE0ZGM1MDQ5MDc0NWI1OTYwN2Q1ZTE3ZWVkMTliOSIsIm5iZiI6MTc3MTIyMDY3NC42NDksInN1YiI6IjY5OTJhZWMyYTI0NTJlMTJlZjEyNDc5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oGklfAHkSrszZ4SKez16g7WYjphgYnYGpaSao8NPWhI'
    }
  };
  


  const handleWheel = (e)=>{
    e.preventDefault();
    cardRef.current.scrollLeft += e.deltaY;
  }

  useEffect(()=>{
    
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApidata(res.results))
    .catch(err => console.error(err));

    cardRef.current.addEventListener('wheel', handleWheel);


  }, []);


  return (
    <div className='title-cards'>
      <h2>{title?title:'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path } alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards