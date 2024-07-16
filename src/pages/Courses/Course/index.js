import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../../../components/Table';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import './style.css';
import 'boxicons';
import studyNestApi from '../../../services/apiStudyNest';

export default function ShowCourse() {
  const [course, setCourse] = useState(null);
  const [isLoading, setLoading] = useState(true); 
  const {courseId} = useParams()

  const loadCourse = () => {
    const token = localStorage.getItem('authToken');
    if(token && isLoading)
      studyNestApi.get(`course/${courseId}`,
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }            
      )
      .then(({data}) => {
        setLoading(false)
        setCourse(data)
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
        window.location.href = `/home`;
      });
  }

  const handleRedirect = (route) => {
    if(route)
      window.location.href = `${course.id}/lesson/${route}`;
  };

  useEffect(() => {
      loadCourse()
  });

  return (
    <>
      <Sidebar></Sidebar>
      <div id='content'>
        <Header message='Course' search={false} link='/courses'></Header>
        <div id='course-show'>
          {
            isLoading ? 
              <div className='loading'></div> :
              !course ?
                <div>Fail</div> :
                <>
                  <div className='info-course'>
                    <div className='image'>
                      <img 
                        src={`https://congenial-space-invention-5jqpx47pgjj24vvp-3333.app.github.dev/thumbnail/${course.thumbnail}`} 
                        alt="Imagem Selecionada" 
                        style={{ maxWidth: '100%' }} 
                      /> 
                    </div>
                    <div className='infos'>
                      <label className='name'>{course.name}</label>
                      <br></br>
                      <label className='description'>{course.description}</label>
                      <br></br>
                      <br></br>
                      <box-icon type='solid' name='bookmark' color='#04f781' size='14px'></box-icon>
                      <label>{course.lessons.length} Lessons</label>
                      <br></br>
                      <box-icon type='solid' color='#04f781' size='14px' name='star'></box-icon>
                      <label>??</label>
                      <br></br>
                      <br></br>
                      <label>Created by @{course.user.username}</label>
                      <div id='letsgobutton' onClick={() => handleRedirect(course.lessons[0]?.id)}>Let's Go</div>
                    </div>
                  </div>
                  <Table
                    title='Lessons' 
                    content={course.lessons}
                  />
                </>
          }
        </div>
      </div>
    </>
  );
}
