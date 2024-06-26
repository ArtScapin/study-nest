import './style.css';
import { useState } from 'react';
import studyNestApi from '../../services/apiStudyNest';

export default function Login() {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {      
      const { data } = await studyNestApi.post('login',
        JSON.stringify({email, password}),
        {     
          headers: { 
            'Content-Type': 'application/json'
          }
        }
      );

      localStorage.setItem('authToken', data.token);
      window.location.reload();
    } catch (error) {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="login-container">
      <img id='logo' src="./assets/logo.png" alt="logo" />
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
  );
}
