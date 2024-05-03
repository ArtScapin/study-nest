import Sidebar from '../../components/Sidebar';
import './style.css';
import 'boxicons';

function Home() {

  return (
    <>
      <Sidebar></Sidebar>
      <div id='content'>
        <div id='header'>Header</div>
        <div id='main'>Main</div>
      </div>
    </>
  );
}

export default Home;
