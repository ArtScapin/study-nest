import React from 'react';
import './Table.css'; // Importa os estilos CSS
import { BiTrash } from "react-icons/bi";
import studyNestApi from '../services/apiStudyNest';

export default function Table ({title, content, deleteURL = null, baseURL = null}) {
  const handleRedirect = (e, route) => {
    if(e.target.tagName === 'DIV' && baseURL)
      window.location.href = `${baseURL}/${route}`;
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('authToken');
    if(token && deleteURL){

      studyNestApi.delete(`${deleteURL}/${id}`,
        {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
          }
        }            
      )
      .then(() => {
        window.location.reload()
      })
      .catch((error)=> console.log(error))
    }
  };

  return (
    <div className='table'>
      <div>{title}</div>
      {
        content.map(({id, name}) => {
          return <div 
            key={id} 
            onClick={(e) => handleRedirect(e, id)}
            className={!baseURL ? 'cursor-default' : ''}>
              {name}
              {deleteURL && <BiTrash className='icon' onClick={() => handleDelete(id)} />}
            </div>
        })
      }
    </div>
  )
}