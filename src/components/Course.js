import React from 'react';
import './Course.css';

export default function Course({title, rating, lesson, progress, creator }) {
    return (
      <div className='course'>
      <div className='image'></div>
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