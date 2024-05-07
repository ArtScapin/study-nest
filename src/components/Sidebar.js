import React from 'react';
import './Sidebar.css'; // Importa os estilos CSS
import 'boxicons'

export default function Sidebar () {
  const handleLoggout = () => {
    localStorage.setItem('authToken', undefined);
    window.location.reload();
  }

  const handleRedirect = (route) => {
    window.location.href = `${route}`;
  };

  return (
    <div id='sidebar'>
      <img id='logo' src="./assets/logo.png" alt="logo" />
      <div className='separator'></div>
      <div className='item' onClick={() => handleRedirect('/home')}>
        <box-icon name='home-circle' color='#636864' size='28px'></box-icon>
      </div>
      <div className='item' onClick={() => handleRedirect('/my-area')}>
        <box-icon name='bookmarks' color='#636864' size='28px'></box-icon>
      </div>
      <div className='item' onClick={() => handleRedirect('/courses')}>
        <box-icon type='solid' name='videos' color='#636864' size='28px'></box-icon>
      </div>
      <div className='item' onClick={() => handleRedirect('/settings')}>
        <box-icon name='cog' color='#636864' size='28px'></box-icon>
      </div>
      <div className='item' onClick={handleLoggout}>
        <box-icon name='log-out' color='#636864' size='28px'></box-icon>
      </div>
    </div>
  );
}
