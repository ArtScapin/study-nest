import axios from 'axios';
import { useState, useEffect } from 'react';
import Course from '../../components/Course';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import './style.css';
import 'boxicons';

export default function Courses() {
  const [courses, setCourses] = useState(null);
  const [isLoading, setLoading] = useState(true); 

  const loadCourses = () => {
    const token = localStorage.getItem('authToken');
    if(token && isLoading)
      axios.get('http://localhost:3333/course',
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
  }

  useEffect(() => {
      loadCourses()
  });

  return (
    <>
      <Sidebar></Sidebar>
      <div id='content'>
        <Header message='Courses'></Header>
        <div id='main'>
          {
            isLoading ? 
              <div>Loading</div> :
              courses.map((course) => <Course course={course}></Course>)
              
          }
        </div>
      </div>
    </>
  );
}
