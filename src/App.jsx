import { useEffect } from 'react';
import Aside from './components/Aside';
import { Main, Navbar, DeleteModal } from './components';

import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const showAside = useSelector((state) => state.ui.showAside);
  const showModal = useSelector((state) => state.ui.showModal);
  const theme = useSelector((state) => state.ui.preferrersLightMode);

  // set theme
  useEffect(() => {
    document.documentElement.className = theme ? 'light-mode' : 'dark-mode';
  }, [theme]);

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

export default App;
