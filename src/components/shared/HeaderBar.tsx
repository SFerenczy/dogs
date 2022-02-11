import { ChevronLeft } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useMatch, useNavigate } from 'react-router-dom';

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
