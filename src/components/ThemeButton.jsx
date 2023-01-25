import { useDispatch, useSelector } from 'react-redux';
import { dark, light } from '../assets';
import { uiActions } from '../store/uiSlice';
import '../styles/ThemeButton.css';

const ThemeButton = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.preferrersLightMode);

  const toggleDarkMode = () => {
    dispatch(uiActions.toggleTheme());
  };

  return (
    <div className="theme-toggle-container">
      <div>
        <img src={dark} className="theme-icon" alt="dark" />
      </div>
      <div>
        <label className="switch">
          <input type="checkbox" checked={theme} onChange={toggleDarkMode} />
          <span className="slider round"></span>
        </label>
      </div>
      <div>
        <img src={light} className="theme-icon" alt="light" />
      </div>
    </div>
  );
};

export default ThemeButton;
