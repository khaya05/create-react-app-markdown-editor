import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase-config';
import { useEffect } from 'react';
import Aside from './components/Aside';
import { Main, Navbar, DeleteModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { markdownActions } from './store/markdownSlice';

import './App.css';
import { uiActions } from './store/uiSlice';

const filesCollectionRef = collection(db, 'files');
function App() {
  const dispatch = useDispatch();
  const showAside = useSelector((state) => state.ui.showAside);
  const showModal = useSelector((state) => state.ui.showModal);
  const theme = useSelector((state) => state.ui.preferrersLightMode);
  const files = useSelector((state) => state.markdown.files);
  const index = useSelector((state) => state.markdown.index);
  const currentFile = useSelector((state) => state.markdown.currentFile);
  const screenWidth = useSelector((state) => state.ui.screenWidth);

  // get files
  useEffect(() => {
    const getFiles = () => {
      onSnapshot(filesCollectionRef, (data) => {
        dispatch(
          markdownActions.setFiles(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        );
      });
    };
    getFiles();
  }, [dispatch]);

  // set theme
  useEffect(() => {
    document.documentElement.className = theme ? 'light-mode' : 'dark-mode';
  }, [theme]);

  // set current file
  useEffect(() => {
    if (files) {
      dispatch(markdownActions.setCurrentFile(index));
    }
  }, [index, dispatch, files]);

  // set filename and file contents
  useEffect(() => {
    dispatch(markdownActions.setFileName(currentFile?.name));
    dispatch(markdownActions.setFileContents(currentFile?.contents));
  }, [currentFile, dispatch]);

  // re-render main component when screen size changes
  function delayCall(fn, ms) {
    let timer;
    return (_) => {
      clearTimeout(timer);
      timer = setTimeout((_) => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }

  useEffect(() => {
    dispatch(uiActions.setScreenWidth(window.innerWidth));

    const delayCallHandler = delayCall(function handleResize() {
      dispatch(uiActions.setScreenWidth(window.innerWidth));
    }, 500);

    window.addEventListener('resize', delayCallHandler);
    return (_) => {
      window.removeEventListener('resize', delayCallHandler);
    };
  }, [dispatch]);

  // always show preview on larger devices
  useEffect(() => {
    if (screenWidth && screenWidth >= 768) {
      dispatch(uiActions.setPreview(true));
    }
  }, [screenWidth, dispatch]);

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
