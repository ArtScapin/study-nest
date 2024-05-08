import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import './style.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../components/Table';

export default function Settings() {
  const [courses, setCourses] = useState(null);
  const [isLoading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if(token && !courses)
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
          {
            isLoading ? 
              <div>Loading</div> :
              !courses ?
                <div>Fail</div> :
                <Table 
                  title='My Courses' 
                  content={courses} 
                  baseURL='/settings/course'>
                </Table>
          }
        </div>
      </div>
    </>
  );
}
