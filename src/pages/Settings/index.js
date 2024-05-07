import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import './style.css';

export default function Settings() {
  return (
    <>
      <Sidebar></Sidebar>
      <div id='content'>
        <Header message='Settings' search={false}></Header>
        <div id='main'>
          <div className='table'>
            <div>My Courses</div>
            <div>lorem ipsum sit amet</div>
            <div>lorem ipsum sit amet</div>
            <div>lorem ipsum sit amet</div>
            <div>lorem ipsum sit amet</div>
            <div>lorem ipsum sit amet</div>
          </div>
        </div>
      </div>
    </>
  );
}
