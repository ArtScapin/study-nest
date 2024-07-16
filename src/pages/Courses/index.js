import { useState, useEffect } from 'react';
import Course from '../../components/Course';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import './style.css';
import 'boxicons';
import studyNestApi from '../../services/apiStudyNest';

export default function Courses() {
  const [courses, setCourses] = useState(null);
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(true); 

  const loadCourses = () => {
    const token = localStorage.getItem('authToken');
    if(token && isLoading)
      studyNestApi.get('course',
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
        <Header message='Courses' search={{set:setSearch, value:search}}></Header>
        <div id='main'>
          {
            isLoading ? 
              <div className='loading'></div> :
              courses.filter((course) => course.name.toLowerCase().includes(search.toLowerCase())).map((course) => <Course key={course.id} course={course}></Course>)
          }
        </div>
      </div>
    </>
  );
}
