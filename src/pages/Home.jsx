import Aside from '../components/Aside';
import { Main, Navbar, DeleteModal } from '../components';
import {  useSelector } from 'react-redux';

import '../App.css'

function Home() {
  const showAside = useSelector((state) => state.ui.showAside);
  const showModal = useSelector((state) => state.ui.showModal);

  return (
    <>
      <div className="main-container">
        <div className={`aside__container `}>
          <Aside />
        </div>
        <div
          className={`main__main-right ${
            showAside ? 'translate-main-in' : 'translate-main-out'
          }`}
        >
          <Navbar />
          <Main />
          {showModal && <DeleteModal />}
        </div>
      </div>
    </>
  );
}

export default Home;
