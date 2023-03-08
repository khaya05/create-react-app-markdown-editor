import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/uiSlice';
import '../styles/Navbar.css';
import {
  barsIcon,
  closeIcon,
  deleteIcon,
  fileIcon,
  logo,
  saveIcon,
} from '../assets';
import { markdownActions } from '../store/markdownSlice';
import { Link } from 'react-router-dom';

function Navbar() {
  const dispatch = useDispatch();
  const showAside = useSelector((state) => state.ui.showAside);
  const isEditing = useSelector((state) => state.ui.isEditing);
  const theme = useSelector((state) => state.ui.preferrersLightMode);
  const filename = useSelector((state) => state.markdown.filename);
  const fileContents = useSelector((state) => state.markdown.fileContents);
  const currentFile = useSelector((state) => state.markdown.currentFile);
  const isLoggedIn = useSelector((state) => state.markdown.isLoggedIn);

  const handleChange = (e) => {
    dispatch(markdownActions.setFileName(e.target.value));
  };

  const handleDelete = () => {
    dispatch(uiActions.toggleModal());
  };

  const notify = () => {
    toast.success('File saved successfully', {
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

  const notifyLogin = () => {
    toast.success('Logged in successfully', {
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

  const saveFile = async () => {
    const file = doc(db, 'files', currentFile.id);
    updateDoc(file, { name: filename, contents: fileContents });
    notify();
  };

  const handleLogin = () => {
    dispatch(markdownActions.logUserIn());
    notifyLogin();
  };

  return (
    <>
      <nav>
        <div
          className="nav__menu-btn-container"
          onClick={() => dispatch(uiActions.toggleAside())}
        >
          <img
            src={showAside ? closeIcon : barsIcon}
            alt="menu button"
            aria-label="show aside button"
            // aria-selected="false"
          />
        </div>

        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" aria-label="logo" />
        </div>

        <div className="nav__file-info">
          <div className="nav__file-info-left">
            <div className="nav__file-container">
              <img src={fileIcon} alt="" aria-hidden="true" />
            </div>

            <form className="nav__document-info-container">
              <fieldset disabled={isLoggedIn ? '' : 'disabled'}>
                <label
                  htmlFor="nav__file-name"
                  className={`${isEditing ? 'show-label' : ''}`}
                >
                  Document name
                </label>
                <input
                  type="text"
                  id="nav__file-name"
                  onFocus={() => dispatch(uiActions.setIsEditing(true))}
                  onBlur={() => dispatch(uiActions.setIsEditing(false))}
                  value={filename}
                  onChange={(e) => handleChange(e)}
                />
              </fieldset>
            </form>
          </div>

          <div className="nav__file-info-right">
            {isLoggedIn && currentFile.author.id === auth.currentUser.uid && (
              <>
                <div className="nav__delete-file-container">
                  <img
                    src={deleteIcon}
                    alt="delete-file"
                    aria-label="delete file"
                    onClick={handleDelete}
                  />
                </div>

                <div className="nav__save-file-container">
                  <button
                    aria-label="save file"
                    className="orange-btn"
                    onClick={saveFile}
                  >
                    <img src={saveIcon} alt="" aria-hidden="true" />
                    <span>save document</span>
                  </button>
                </div>
              </>
            )}
            {!isLoggedIn && (
              <Link to="login" className="login-btn" onClick={handleLogin}>
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <ToastContainer />
    </>
  );
}

export default Navbar;
