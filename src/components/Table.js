import React from 'react';
import './Table.css'; // Importa os estilos CSS
import 'boxicons'

export default function Table ({title, content, baseURL = null}) {
  const handleRedirect = (route) => {
    window.location.href = `${baseURL}/${route}`;
  };

  return (
    <div className='table'>
      <div>{title}</div>
      {
        content.map(({id, name}) => {
          return <div key={id} onClick={baseURL ? () => handleRedirect(id) : () => {}}>{name}</div>
        })
      }
    </div>
  )
}