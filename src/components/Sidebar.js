import React from 'react';
import './Sidebar.css'; // Importa os estilos CSS
import 'boxicons'

class Sidebar extends React.Component {
    render() {
    return (
      <div id='sidebar'>
        <img id='logo' src="./assets/logo.png" alt="logo" />
        <div className='separator'></div>
        <div className='item'>
          <box-icon name='home-circle' color='#636864' size='28px'></box-icon>
        </div>
        <div className='item'>
          <box-icon name='bookmarks' color='#636864' size='28px'></box-icon>
        </div>
        <div className='item'>
          <box-icon type='solid' name='videos' color='#636864' size='28px'></box-icon>
        </div>
        <div className='item'>
          <box-icon name='cog' color='#636864' size='28px'></box-icon>
        </div>
        <div className='item'>
          <box-icon name='log-out' color='#636864' size='28px'></box-icon>
        </div>
      </div>
    );
  }
}

export default Sidebar;
