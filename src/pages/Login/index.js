import './style.css';
import { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'

function App() {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3333/login',
        JSON.stringify({email, password}),
        {
          headers: { 'Content-Type': 'application/json' }
        }            
      );
      await localStorage.setItem('user', data);
      console.log(data);
      // setUser(localStorage.getItem('user'))

    } catch (error) {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <>
      {
        !user ? 
        <div className="login-form-wrap">
          <h2>Login</h2>
          <form className='login-form'>
          <input type="email" 
            name="email" 
            placeholder="Email" 
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="password" 
            name="password" 
            placeholder="Password" 
            required
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" 
            className='btn-login'
            onClick={(e) => handleLogin(e)}>Login</button>
          </form>
          <p>{error}</p>
        </div>
        :
        <Navigate to='/home'/>
      }
    </>
  );
}

export default App;