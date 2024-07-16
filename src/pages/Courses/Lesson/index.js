import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../../../components/Table';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import './style.css';
import 'boxicons';
import studyNestApi from '../../../services/apiStudyNest';
import VideoPlayer from '../../../components/VideoPlayer';

export default function ShowLesson() {
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [isLoading, setLoading] = useState(true); 
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const {courseId, lessonId} = useParams()

  const loadLesson = () => {
    const token = localStorage.getItem('authToken');
    if(token && isLoading)
      studyNestApi.get(`lesson/${courseId}/${lessonId}`,
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }            
      )
      .then(({data}) => {
        setLoading(false)
        setLesson(data)
        setComments(data.comments)
      })
      .catch(error => {
        console.error('Erro ao buscar dados da API:', error);
        window.location.href = `/home`;
      });
  }
  
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
  
  const postComment = () => {
    const token = localStorage.getItem('authToken');
    if(token && newComment) {
      studyNestApi.post(`comment/${lessonId}`,
        {
          text: newComment
        },
        {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }            
      )
      .then(({data}) => {
        setComments([data, ...comments])
        setNewComment("")
      })
      .catch(error => {
        console.error('Erro ao enviar comentário para a API:', error);
      });
    }
  }

  useEffect(() => {
      loadLesson()
      loadCourse()
  });

  return (
    <>
      <Sidebar></Sidebar>
      <div id='content'>
        <Header message='Course > Lesson' search={false} link={`/courses`}></Header>
        <div id='show-lesson'>
          {
            isLoading ? 
              <div>Loading</div> :
              !lesson ?
                <div>Fail</div> :
                <>
                  <div className='show-lesson'>
                    <div className='video'>
                      <VideoPlayer url={lesson.video} />
                    </div>
                    <div className='infos'>
                      <label>{lesson.name}</label>
                      <br></br>
                      <label>{lesson.description}</label>
                      <br></br>
                    </div>
                  </div>
                  <Table
                    title='Lessons' 
                    content={course.lessons}
                    baseURL={'.'}
                  />
                  <div className='comments-section'>
                    <h3>Comments</h3>
                    <div className='comment-input'>
                      <input 
                        type='text' 
                        value={newComment} 
                        onChange={(e) => setNewComment(e.target.value)} 
                        placeholder='Add a comment...'
                      />
                      <button onClick={postComment}>Send</button>
                    </div>
                  </div>
                  <div className='comments-list'>
                    {comments.map((comment, index) => (
                      <div key={index} className='comment'>
                        <div className='avatar-comment'>{comment.user.username[0].toUpperCase()}</div>
                        <div className='body-comment'>
                          <div>@{comment.user.username}</div>
                          <div>{comment.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
          }
        </div>
      </div>
    </>
  );
}
