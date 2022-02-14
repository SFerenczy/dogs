import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dogApi } from '../../apis/dogApi';

/**
 * This component displays the details of a dog breed.
 * It will look in localStorage for the breed data and otherwise fetch it from thedogapi.com
 * @returns JSX.Element
 */
function DogBreedDetail(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();

  const [ breed, setBreed ] = useState<any | 'pending'>( 'pending' );
  const breedImage = dogApi.getBreedImage( params.name ? params.name : '' );

  useEffect( () => {
    dogApi.getBreed( params.name ? params.name : '' ).then( setBreed );
  }, [ params.name ] );

  // If breed is not found, navigate to dog list.
  useEffect( () => {
    if ( breed !== 'pending' && !breed.id ) {
      navigate( '/doglist' );
    }
  }, [ breed, navigate ] );

  // Display a progress indicator if breed is still being fetched
  return breed === 'pending' || !breed.id ? (
    <CircularProgress />
  ) : (
    <Box sx={{ p: 3 }}>
      <Card sx={{ width: 1, height: 'auto' }}>
        {breedImage && (
          <CardMedia component="img" image={breedImage} alt={breed.id} />
        )}
        <CardContent sx={{ backgroundColor: 'secondary.light' }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              textAlign: 'left',
              justifyContent: 'space-evenly',
            }}
          >
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography
                variant="body2"
                color="text"
              >{`Name: ${ breed.name }`}</Typography>
              <Typography
                variant="body2"
                color="text"
              >{`Temperament: ${ breed.temperament }`}</Typography>
              <Typography
                variant="body2"
                color="text"
              >{`Bred for: ${ breed.bred_for }`}</Typography>
            </Paper>
            <Paper sx={{ p: 3 }}>
              <Typography
                variant="body2"
                color="text"
              >{`Lifespan: ${ breed.life_span }`}</Typography>
              <Typography
                variant="body2"
                color="text"
              >{`Height: ${ breed.height.metric } cm`}</Typography>
              <Typography
                variant="body2"
                color="text"
              >{`Weight: ${ breed.weight.metric } kg`}</Typography>
            </Paper>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DogBreedDetail;
