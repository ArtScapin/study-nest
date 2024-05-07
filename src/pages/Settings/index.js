import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import './style.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Settings() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setLoading] = useState(true); 

  const handleRedirect = (route) => {
    window.location.href = `settings/${route}`;
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    axios.get('http://localhost:3333/course/my',
      {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }            
    )
    .then(({data}) => {
      setLoading(false)
      setCourses(data)
    })
    .catch(error => {
      console.error('Erro ao buscar dados da API:', error);
    });
  });

  return (
    <>
      <Sidebar></Sidebar>
      <div id='content'>
        <Header message='Settings' search={false}></Header>
        <div id='main'>
          <div className='table'>
            <div>My Courses</div>
            {
              isLoading ?
              <div>Loading...</div>:
              courses.map(({id, name}) => {
                return <div key={id} onClick={() => handleRedirect(`course?id=${id}`)}>{name}</div>
            })
            }
          </div>
        </div>
      </div>
    </>
  );
}
