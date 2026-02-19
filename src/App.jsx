import Home from './pages/Home/Home.jsx';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import Player from './pages/Player/Player.jsx';
import MovieDetail from './pages/MovieDetail/MovieDetail.jsx';
import Watchlist from './pages/Watchlist/Watchlist.jsx';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';

function App() {

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      navigate('/')
    }
  }, [user])

  return (
    <>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
        <Route path='/movie/:id' element={<MovieDetail />} />
        <Route path='/watchlist' element={<Watchlist />} />
      </Routes>
    </>
  )
}

export default App
