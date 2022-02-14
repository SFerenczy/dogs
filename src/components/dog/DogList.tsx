import { useEffect, useState } from 'react';
import { dogApi } from '../../apis/dogApi';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Pagination,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

/** Size of dog images */
const IMAGE_SIZE = '400';
/** Amount of pages for pagination-component */
const AMOUNT_OF_PAGES = 10;

/**
 * This component diplays a dog list. It has 10 pages.
 * For each page it fetches the list of dogs for that page from thedogapi.com
 * @returns A JSX.Element
 */
function DogList(): JSX.Element {
  const [ dogs, setDogs ] = useState<any[] | 'pending'>( 'pending' );
  const [ page, setPage ] = useState( 0 );

  // When switching pages, fetch list of dogs for that page.
  useEffect( () => {
    setDogs( 'pending' );
    dogApi.getDogs( page.toString() ).then( ( dogs ) => {
      setDogs( dogs );
    } );
  }, [ page ] );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage( value - 1 );
  };

  return (
    <Box
      sx={{
        p: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {dogs === 'pending' ? (
        <CircularProgress color="primary" />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
          }}
        >
          {dogs.map( ( dog ) => (
            <DogListEntry dog={dog} key={dog.id} />
          ) )}
        </Box>
      )}
      <Pagination
        count={AMOUNT_OF_PAGES}
        color="primary"
        onChange={handlePageChange}
      />
    </Box>
  );
}

interface DogListEntryProps {
  /** The dog to display. */
  dog: any;
}

/**
 * This component renders a single Dog in the DogList component.
 * If there is a breed attached to the dog, it handles storing the breed and the dog images,
 * after on navigating to said breed.
 * @param props DogListEntryProps
 * @returns A JSX.Element
 */
function DogListEntry( props: DogListEntryProps ): JSX.Element {
  const { dog } = props;
  const navigate = useNavigate();

  const breed = dog.breeds[ 0 ];

  const handleClick = ( dog: any ) => {
    const breed = dog.breeds[ 0 ];
    // Store breed-data and dog image to reduce fetch calls
    localStorage.setItem( breed.name, JSON.stringify( breed ) );
    localStorage.setItem( `${ breed.name }-image`, dog.url );
    navigate( `/dog/${ breed.name }` );
  };

  return (
    <Card sx={{ width: parseInt( IMAGE_SIZE ) }}>
      {breed ? (
        <CardActionArea onClick={() => handleClick( dog )}>
          <CardMedia
            component="img"
            height={IMAGE_SIZE}
            image={dog.url}
            alt={breed.name}
          />
          <CardContent sx={{ backgroundColor: 'primary.main' }}>
            <Typography variant="h5" component="div">
              {breed.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      ) : (
        <CardMedia
          component="img"
          height={IMAGE_SIZE}
          image={dog.url}
          alt={'An image of a dog'}
        />
      )}
    </Card>
  );
}

export default DogList;
