import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import './style.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Table from '../../components/Table';

export default function Settings() {
  const [courses, setCourses] = useState(null);
  const [isLoading, setLoading] = useState(true); 
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();

  const handlePopup = (e) => {
    const popups = document.getElementsByClassName('popup')
    for (const popup of popups) {
      if (!e) {
        popup.style.display = 'none'
      } else if(e.target.className === 'popup' || popup.style.display !== 'block'){
        popup.style.display = popup.style.display === 'block' ? 'none' : 'block'
      }
    }
  }

  const loadMyCourses = () => {
    const token = localStorage.getItem('authToken');
    if(token)
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

  }

  const handleImage = (e) => {
    const file = e.target.files[0]; 

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      setThumbnail(file);
      reader.readAsDataURL(file);
    }
  };

  const handleCreateCourse = (e) => {
    const token = localStorage.getItem('authToken');
    if(token && name && description && thumbnail){
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('thumbnail', thumbnail);
      formData.append('visibility', true);

      axios.post('http://localhost:3333/course',
        formData,
        {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}` 
          }
        }            
      )
      .then(() => {
        loadMyCourses();
        handlePopup(null)
        for (const input of document.getElementsByTagName('input')) {
          input.value = ''
        }
        setName(null)
        setDescription(null)
        setImagePreview(null)
        setThumbnail(null)
      })
      .catch((error)=> console.log(error))
    }
  };

  useEffect(() => {
      loadMyCourses()
  });

  return (
    <>
      <Sidebar></Sidebar>
      <div id='content'>
        <Header message='Settings' search={false}></Header>
        <div id='settings'>
          {
            isLoading ? 
              <div>Loading</div> :
              !courses ?
                <div>Fail</div> :
                <>
                  <Table 
                    title='My Courses' 
                    content={courses} 
                    baseURL='/settings/course'>
                  </Table>
                  <div id='new-course' onClick={(e) => handlePopup(e)}>Add New Course</div>
                </>
          }
          <div className='popup' onClick={(e) => handlePopup(e)}>
            <div className='popup-form'>
              <div className='title'>New Course</div>
              <input type="text" 
                name="name" 
                placeholder="Name" 
                required
                onChange={(e) => setName(e.target.value)}
              />
              <input type="text" 
                name="description" 
                placeholder="Description" 
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <label className="botao-upload" htmlFor="fileInput">
                <div>Upload Thumbnail</div>
              </label>
              <input 
                type="file" 
                id="fileInput" 
                accept="image/*" 
                ref={fileInputRef}
                style={{ display: 'none' }} onChange={handleImage} />
              {imagePreview && (
                <div className='image'>
                  <img src={imagePreview} alt="Imagem Selecionada" style={{ maxWidth: '100%' }} />
                </div>
              )}
              <button type="submit" 
                onClick={handleCreateCourse}>Create</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
