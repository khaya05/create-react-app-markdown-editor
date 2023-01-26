import ReactMarkdown from 'react-markdown';
import { hidePreviewIcon, showPreviewIcon } from '../assets';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/uiSlice';

import { markdownActions } from '../store/markdownSlice';
import '../styles/Main.css';

function Main() {
  const dispatch = useDispatch();
  const showPreview = useSelector((state) => state.ui.showPreview);
  const showInput = useSelector((state) => state.ui.showInput);
  const fileContents = useSelector((state) => state.markdown.fileContents);
  const screenWidth = useSelector((state) => state.ui.screenWidth);

  const handleMarkdownClick = () => {
    dispatch(uiActions.setInput(false));
    dispatch(uiActions.setPreview(true));
  };

  const handlePreviewClick = () => {
    dispatch(uiActions.toggleInput());
    if (screenWidth < 768) {
      dispatch(uiActions.setPreview(false));
    }
  };

  const changeFileContents = (e) => {
    dispatch(markdownActions.setFileContents(e.target.value));
  };

  return (
    <main>
      <CSSTransition
        in={showInput}
        timeout={400}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: '',
          enterActive: 'show-input',
          exit: '',
          exitActive: 'hide-input',
        }}
      >
        <div className={'main__left'}>
          <div className="section-label">
            <p>markdown</p>
            <button type="button" onClick={handleMarkdownClick}>
              <img src={showPreviewIcon} alt="hide preview" />
              <span>hide preview</span>
            </button>
          </div>
          <form>
            <textarea
              value={fileContents}
              onChange={(e) => changeFileContents(e)}
            />
          </form>
        </div>
      </CSSTransition>

      <CSSTransition
        in={showPreview}
        timeout={400}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: '',
          enterActive: 'show-preview',
          exit: '',
          exitActive: 'hide-preview',
        }}
      >
        <div className="main__right">
          <div className="section-label">
            <p>preview</p>
            <button type="button" onClick={handlePreviewClick}>
              <img
                src={!showInput ? hidePreviewIcon : showPreviewIcon}
                alt="hide preview"
              />
              <span>hide preview</span>
            </button>
          </div>
          <div className={'react-markdown-container'}>
            <ReactMarkdown>{fileContents}</ReactMarkdown>
          </div>
        </div>
      </CSSTransition>
    </main>
  );
}

export default Main;
