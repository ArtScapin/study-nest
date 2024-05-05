import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import './style.css';
import 'boxicons';

function Home() {

  return (
    <>
      <Sidebar></Sidebar>
      <div id='content'>
        <Header></Header>
        <div id='main'>Main</div>
      </div>
    </>
  );
}

export default Home;
