import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import './style.css';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../../../components/Table';
import VideoPlayer from '../../../components/VideoPlayer';
import studyNestApi from '../../../services/apiStudyNest';

export default function SettingsCourse() {
  const [course, setCourse] = useState(null);
  const [isLoading, setLoading] = useState(true); 
  const {courseId} = useParams()
  const fileInputRef = useRef();
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [lessonName, setLessonName] = useState(null);
  const [lessonDescription, setLessonDescription] = useState(null);
  const [lessonVideo, setLessonVideo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState(null);
  
  const loadMyCourse = () => {
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
        setLoading(false);
        setName(data.name);
        setDescription(data.description);
        setPreview(null);
        const course = data
        course.categories = course.categories.map(({id, label}) => {
          return {
            id,
            name:label
          }
        })
        setCourse(course);
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });
  };

  const loadCategories = () => {
    const token = localStorage.getItem('authToken');
    if(token && !categories && course)
      studyNestApi.get(`category`,
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }            
      )
      .then(({data}) => {
        setCategories(data.filter((category) => !course.categories.some((cc) => cc.id === category.id)));
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });
  };

  const handleImage = (e) => {
    const file = e.target.files[0]; 

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      setThumbnail(file);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateCourse = () => {
    const token = localStorage.getItem('authToken');
    if(token && name && description){
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      if(thumbnail)
        formData.append('thumbnail', thumbnail);

      studyNestApi.put(`course/${courseId}`,
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
        loadMyCourse();
      })
      .catch((error)=> console.log(error))
    };
  };

  const handlePopup = (e) => {
    const popups = document.getElementsByClassName('popup')
    for (const popup of popups) {
      if (!e) {
        popup.style.display = 'none'
      } else if(e.target.className === 'popup' || popup.style.display !== 'block'){
        popup.style.display = popup.style.display === 'block' ? 'none' : 'block'
      }
    }
  };

  const handleLessonVideo = (e) => {
    const value = e.target.value?.split('v=')[1]?.split('&')[0]
    setLessonVideo(value)
  };

  const handleCreateLesson = () => {
    const token = localStorage.getItem('authToken');
    
    if(token && lessonName && lessonDescription && lessonVideo){
      const formData = new FormData();
      formData.append('name', lessonName);
      formData.append('description', lessonDescription);
      formData.append('video', lessonVideo);

      studyNestApi.post(`lesson/${courseId}`,
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
        loadMyCourse();
        handlePopup(null);
        for (const input of document.getElementsByClassName('input-form-lesson')) {
          input.value = '';
        }
        setLessonName(null);
        setLessonDescription(null);
        setLessonVideo(null);
      })
      .catch((error)=> console.log(error))
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAddCategory = (categoryId) => {
    const token = localStorage.getItem('authToken');
    if(token)
      studyNestApi.post(`category/link/${courseId}/${categoryId}`,
        {},
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }            
      )
      .then(() => {
        setLoading(true);
        loadMyCourse();
        setIsOpen(false);
        setCategories(categories.filter(({id}) => id !== categoryId));
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
      });
  }

  useEffect(() => {
    loadMyCourse();
    loadCategories();
  });

  return (
    <>
      <Sidebar></Sidebar>
      <div id='content'>
        <Header message='Settings > Course' search={false} link='/settings'></Header>
        <div id='course-settings'>
          {
            isLoading ? 
              <div>Loading</div> :
              !course ?
                <div>Fail</div> :
                <>
                  <div className='update-course'>
                    <div className='image'>
                      <img 
                        src={preview || `https://congenial-space-invention-5jqpx47pgjj24vvp-3333.app.github.dev/thumbnail/${course.thumbnail}`} 
                        alt="Imagem Selecionada" 
                        style={{ maxWidth: '100%' }} 
                      /> 
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
                      <label className="botao-upload" htmlFor="fileInput">
                        <div>New Thumbnail</div>
                      </label>
                      <input 
                        type="file" 
                        id="fileInput" 
                        accept="image/*" 
                        ref={fileInputRef}
                        style={{ display: 'none' }} onChange={handleImage} />
                      <div className='botao-save' onClick={handleUpdateCourse}>Save</div>
                    </div>
                  </div>
                  <Table
                    title='Categories' 
                    content={course.categories} 
                    deleteURL={`/category/link/${courseId}`}
                  />
                  {
                    (categories?.length > 0) &&
                    <div className="dropdown">
                      <div className="dropdown-toggle" onClick={toggleMenu}>
                        Add Category
                      </div>
                      {isOpen && (
                        <div className="dropdown-menu">
                          {
                            categories.map((category) => 
                              <div className="dropdown-item" key={category.id} onClick={() => handleAddCategory(category.id)}>{category.label}</div>)
                          }
                        </div>
                      )}
                    </div>
                  }
                  <br />
                  <Table
                    title='Lessons' 
                    content={course.lessons} 
                    baseURL={`/settings/lesson/${courseId}`}
                    deleteURL={`/lesson/${courseId}`}
                  />
                  <div id='new-lesson' onClick={(e) => handlePopup(e)}>Add New Lesson</div>
                  <br />

                  <div className='popup' onClick={(e) => handlePopup(e)}>
                    <div className='popup-form'>
                      <div className='title'>New Lesson</div>
                      <input type="text" 
                        className='input-form-lesson'
                        name="name" 
                        placeholder="Name" 
                        required
                        onChange={(e) => setLessonName(e.target.value)}
                      />
                      <input type="text" 
                        className='input-form-lesson'
                        name="description" 
                        placeholder="Description" 
                        required
                        onChange={(e) => setLessonDescription(e.target.value)}
                      />
                      <input type="text" 
                        className='input-form-lesson'
                        name="video" 
                        placeholder="Video URL" 
                        required
                        onChange={handleLessonVideo}
                      />
                      {lessonVideo && (
                        <VideoPlayer url={lessonVideo}/>
                      )}
                      <br />
                      <button type="submit" 
                        onClick={handleCreateLesson}>Create</button>
                    </div>
                  </div>
                </>
          }
        </div>
      </div>
    </>
  );
}
