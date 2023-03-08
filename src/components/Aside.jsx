import { fileIcon, logo } from '../assets';
import { ThemeButton } from '../components';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { markdownActions } from '../store/markdownSlice';
import { signOut } from 'firebase/auth';

import '../styles/Aside.css';

function Aside() {
  const dispatch = useDispatch();
  const showAside = useSelector((state) => state.ui.showAside);
  const files = useSelector((state) => state.markdown.files);
  const isLoggedIn = useSelector((state) => state.markdown.isLoggedIn);
  const theme = useSelector((state) => state.ui.preferrersLightMode);
  const filesCollectionRef = collection(db, 'files');

  const addNewFile = async () => {
    const date = new Date();
    const formattedDate = moment(date).format('D MMMM YYYY');

    await addDoc(filesCollectionRef, {
      name: 'untitled.md',
      createdAt: formattedDate,
      contents: '',
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
  };

  const handleFileClick = (e, id) => {
    // const allFiles = document.querySelectorAll('.aside__file');
    // allFiles.forEach((file) => {
    //   file.setAttribute('aria-selected', 'false');
    // });
    // e.target.setAttribute('aria-selected', 'true');

    const currentFile = files.find((file) => file.id === id);
    const currentFileIndex = files.indexOf(currentFile);

    dispatch(markdownActions.setIndex(currentFileIndex));
  };

  const notifyLogout = () => {
    toast.success('Logged out successfully', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? 'light' : 'dark',
    });
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      dispatch(markdownActions.logUserOut());
      notifyLogout();
      window.location.reload(false);
    });
  };

  return (
    <>
      <aside className={`${showAside ? 'show-aside' : 'hide-aside'}`}>
        <div
          className={`aside___container ${
            showAside ? 'show-contents' : 'hide-contents'
          }`}
        >
          <div className="">
            <div className="aside__logo-container">
              <img src={logo} alt="logo" aria-label="logo" />
            </div>
            <h2>My Documents</h2>

            {isLoggedIn && (
              <button className="orange-btn" onClick={addNewFile}>
                + New Document
              </button>
            )}

            <ul
              className="aside__file-info-container"
              aria-label="your current files"
            >
              {files.map((file) => {
                const { id, name, createdAt } = file;

                return (
                  <li
                    key={id}
                    className="aside__file"
                    aria-label={`${name} `}
                    onClick={(e, id_) => handleFileClick(e, id)}
                  >
                    <div className="file_icon-container">
                      <img src={fileIcon} alt="" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="created-at">{createdAt}</p>
                      <p className="aside__current-file">{name}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="aside-bottom-container">
            <div className="theme-toggle-container">
              <ThemeButton />
            </div>
            <br />

            {isLoggedIn && (
              <button className="orange-btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </aside>
      <ToastContainer />
    </>
  );
}

export default Aside;
