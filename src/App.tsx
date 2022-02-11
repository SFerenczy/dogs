import './css/App.css';
import { Route, Routes } from 'react-router-dom';
import Start from './components/Start';
import HeaderBar from './components/shared/HeaderBar';
import DogBreedDetail from './components/dog/DogBreedDetail';
import DogList from './components/dog/DogList';
import { createTheme, ThemeProvider } from '@mui/material';

function App() {
  const theme = createTheme( {
    palette: {
      primary: {
        main: '#ff69b4',
      },
    },
  } );

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <HeaderBar />
        <div className="App-content">
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="doglist" element={<DogList />} />
            <Route path="dog/:name" element={<DogBreedDetail />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
