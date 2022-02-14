import { ChevronLeft } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useMatch, useNavigate } from 'react-router-dom';

/**
 * The Header of the page. Contains the title of the app and a back-icon if on the breed-page.
 * @returns A JSX.Element
 */
function HeaderBar(): JSX.Element {
  const match = useMatch( '/dog/:name' );
  const navigate = useNavigate();

  return (
    <header className="App-header">
      {
        /* Render a back-icon on the dog breed detail page */
        match && (
          <IconButton
            sx={{ ml: 2, color: 'primary.main' }}
            onClick={() => navigate( -1 )}
          >
            <ChevronLeft className="material-icons" />{' '}
          </IconButton>
        )
      }
      <p>The Dog App - powered by React</p>
    </header>
  );
}

export default HeaderBar;
