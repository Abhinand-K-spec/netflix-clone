import React from 'react';
import './Login.css';
import logo from '../../assets/logo.png'
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import netflix_spinner from '../../assets/netflix_spinner.gif';


const Login = () => {

  const [signState, setSignState] = useState('Sign In');
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();

  const userAuth = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (signState === 'Sign In') {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  }

  return (
    loading ? <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div> :
      <div className='login'>
        <img src={logo} alt="" className='login-logo' />
        <div className="login-form">
          <h1>{signState}</h1>
          <form onSubmit={userAuth} >
            {signState === 'Sign Up' ? <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder='Your name' /> : <></>}
            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Email ' />
            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' />
            <button type='submit'>{signState}</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" name="" id="" />
                <label htmlFor="">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
          <div className="form-switch">
            {signState === 'Sign In' ?
              <p>New To Netflix? <span onClick={() => { setSignState('Sign Up') }}>Sign Up Now</span></p> :
              <p>Already Have Account? <span onClick={() => { setSignState('Sign In') }}>Sign in Now</span></p>
            }
          </div>
        </div>
      </div>
  )
}

export default Login
