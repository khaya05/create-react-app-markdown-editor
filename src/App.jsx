import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase-config';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markdownActions } from './store/markdownSlice';

import { uiActions } from './store/uiSlice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

const filesCollectionRef = collection(db, 'files');
function App() {
  const dispatch = useDispatch();
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
