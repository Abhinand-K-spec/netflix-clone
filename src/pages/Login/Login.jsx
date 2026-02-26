import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';
import netflix_spinner from '../../assets/netflix_spinner.gif';

const Login = () => {
  const [signState, setSignState] = useState('Sign In');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, signup } = useAuth();

  const validate = () => {
    const newErrors = {};

    if (signState === 'Sign Up') {
      if (name.trim() && name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters.';
      }
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (password && password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    return newErrors;
  };

  const userAuth = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    if (signState === 'Sign In') {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  };

  const switchState = (state) => {
    setSignState(state);
    setErrors({});
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    loading ? (
      <div className="login-spinner">
        <img src={netflix_spinner} alt="Loading..." />
      </div>
    ) : (
      <div className='login'>
        <img src={logo} alt="Netflix" className='login-logo' />
        <div className="login-form">
          <h1>{signState}</h1>
          <form onSubmit={userAuth} noValidate>

            {signState === 'Sign Up' && (
              <div className="input-group">
                <input
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: '' })); }}
                  type="text"
                  placeholder='Your name'
                  className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>
            )}

            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })); }}
                placeholder='Email'
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <div className="input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: '' })); }}
                placeholder='Password'
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && <span className="error-msg">{errors.password}</span>}
            </div>

            <button type='submit'>{signState}</button>

            <div className="form-help">
              <div className="remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>

          <div className="form-switch">
            {signState === 'Sign In' ? (
              <p>New To Netflix? <span onClick={() => switchState('Sign Up')}>Sign Up Now</span></p>
            ) : (
              <p>Already Have Account? <span onClick={() => switchState('Sign In')}>Sign In Now</span></p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Login;
