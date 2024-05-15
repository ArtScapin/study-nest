import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import './style.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Table from '../../../components/Table';
import VideoPlayer from '../../../components/VideoPlayer';

export default function SettingsLesson() {
  const [lesson, setLesson] = useState(null);
  const [isLoading, setLoading] = useState(true); 
  const {lessonId, courseId} = useParams()
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [video, setVideo] = useState(null);
  const fileInputRef = useRef();
  
  const loadMyLesson = () => {
    const token = localStorage.getItem('authToken');
    if(token && isLoading)
      axios.get(`http://localhost:3333/lesson/${courseId}/${lessonId}`,
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }            
      )
      .then(({data}) => {
        setLoading(false);
        setName(data.name);
        setDescription(data.description);
        setVideo(data.video);
        setLesson(data);
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });
  };

  const handleUpdateLesson = () => {
    const token = localStorage.getItem('authToken');
    if(token && name && description && video){
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('video', video);

      axios.put(`http://localhost:3333/lesson/${courseId}/${lessonId}`,
        formData,
        {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
          }
        }            
      )
      .then(() => {
        setLoading(true);
        loadMyLesson();
      })
      .catch((error)=> console.log(error))
    };
  };

  const handleVideo = (e) => {
    const value = e.target.value?.split('v=')[1]?.split('&')[0]
    setVideo(value)
  };

  const handleCreateContent = (e) => {
    const file = e.target.files[0]; 
    const token = localStorage.getItem('authToken');
    
    if(token && file){
      const formData = new FormData();
      formData.append('file', file);

      axios.post(`http://localhost:3333/content/${lessonId}`,
        formData,
        {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
          }
        }            
      )
      .then(() => {
        setLoading(true);
        loadMyLesson();
      })
      .catch((error)=> console.log(error))
    }
  };

  useEffect(() => {
    loadMyLesson();
  });

  return (
    <>
      <Sidebar></Sidebar>
      <div id='content'>
        <Header message='Settings > Lesson' search={false} link={`/settings/course/${courseId}`}></Header>
        <div id='lesson-settings'>
          {
            isLoading ? 
              <div>Loading</div> :
              !lesson ?
                <div>Fail</div> :
                <>
                  <div className='update-lesson'>
                    <div className='video'>
                      {video &&
                        [video].map((url)=> <VideoPlayer key={lesson.id} url={url} />)
                      }
                    </div>
                    <div className='infos'>
                      <label>Name:</label>
                      <br></br>
                      <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                      <br></br>
                      <label>Description:</label>
                      <br></br>
                      <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                      <br></br>
                      <label>Video:</label>
                      <br></br>
                      <input type='text' value={`https://www.youtube.com/watch?v=${video}`} onChange={handleVideo} />
                      <br></br>
                      <div className='botao-save' onClick={handleUpdateLesson}>Save</div>
                    </div>
                  </div>
                  <Table
                    title='Contents' 
                    content={lesson.contents}
                    deleteURL={`/content`}
                  />
                  <label className="botao-upload" htmlFor="fileInput">
                    <div>Add New Content</div>
                  </label>
                  <input 
                    type="file" 
                    id="fileInput" 
                    accept="file/*" 
                    ref={fileInputRef}
                    style={{ display: 'none' }} onChange={handleCreateContent} />
                  <br />
                </>
          }
        </div>
      </div>
    </>
  );
}
