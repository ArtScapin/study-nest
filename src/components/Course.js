import React from 'react';
import './Course.css';

export default function Course({course}) {
    const title = course.name
    const rating = '?'
    const lesson = '??'
    const progress = null
    const creator = course.user.username
    const image = `http://localhost:3333/thumbnail/${course.thumbnail}`

    return (
      <div className='course'>
        <div className='image'>
          <img src={image} alt="Imagem Selecionada" style={{ maxWidth: '100%' }} />
          </div>
        <div className='title'>{title}</div>
        <div className='course-information'>
        <span className='infos'>
          <span className='rating'>
            <box-icon type='solid' color='#04f781' size='12px' name='star'></box-icon>
            {rating}
          </span>
          <span className='lessons-number'>
            <box-icon type='solid' name='bookmark' color='#04f781' size='12px'></box-icon>
            {lesson}
          </span>
          {progress && 
            <span className='progress'>
              <box-icon type='solid' name='rocket' color='#04f781' size='12px'></box-icon>
              {progress}
            </span>
          }
        </span>
        <div className='creator'>@{creator}</div>
        </div>
      </div>
    );
  }