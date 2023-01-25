import { collection, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { createContext, useContext } from 'react';
import { db } from '../firebase-config';

const AppContext = createContext();
const filesCollectionRef = collection(db, 'files');

const AppProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState({});
  const [filename, setFilename] = useState('');
  const [fileContents, setFileContents] = useState('');
  const [screenWidth, setScreenWidth] = useState(null);

  // https://www.pluralsight.com/guides/re-render-react-component-on-window-resize

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
    const delayCallHandler = delayCall(function handleResize() {
      setScreenWidth(window.innerWidth);
    }, 500);

    window.addEventListener('resize', delayCallHandler);
    return (_) => {
      window.removeEventListener('resize', delayCallHandler);
    };
  }, []);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  // always show preview on larger devices
  useEffect(() => {
    if (screenWidth && screenWidth >= 768) {
      // setShowPreview(true);
    }
  }, [screenWidth]);


  // firebase

  useEffect(() => {
    const getFiles = () => {
      onSnapshot(filesCollectionRef, (data) => {
        setFiles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    getFiles();
  }, []);

  useEffect(() => {
    if (files) {
      setCurrentFile(files[index]);
    }
  }, [files, index]);

  useEffect(() => {
    setFilename(currentFile?.name);
    setFileContents(currentFile?.contents);
  }, [currentFile]);

  return (
    <AppContext.Provider
      value={{
        screenWidth,
        filename,
        fileContents,
        index,
        currentFile,
        files,
        setIndex,
        setFilename,
        setFileContents,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
