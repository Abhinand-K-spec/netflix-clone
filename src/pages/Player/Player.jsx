import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {


  const navigate = useNavigate();
  const { id } = useParams();
  const [apiData, setApiData] = useState({ name: '', key: '', published_at: '', type: '' });


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWE0ZGM1MDQ5MDc0NWI1OTYwN2Q1ZTE3ZWVkMTliOSIsIm5iZiI6MTc3MTIyMDY3NC42NDksInN1YiI6IjY5OTJhZWMyYTI0NTJlMTJlZjEyNDc5ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oGklfAHkSrszZ4SKez16g7WYjphgYnYGpaSao8NPWhI'
    }
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results[0]))
      .catch(err => console.error(err));


  }, [])

  return (
    <div className='player'>
      <img src={back_arrow_icon} onClick={() => { navigate(-1) }} alt="" />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title={apiData.title} frameborder="0" allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
