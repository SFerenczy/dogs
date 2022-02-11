/** The amount of dogs to fetch */
const LIMIT = '24';
/** The sorting for the dogs from thedogapi.com */
const ORDER = 'ASC';

/**
 * API responsible to fetch dogs.
 */
class DogApi {
  /**
   * Fetches a list of dogs from thedogapi.com based on parameters limit, order and page.
   * @param page The page to fetch
   * @returns A list of dogs
   */
  async getDogs( page?: string ) {
    const url = new URL( 'https://api.thedogapi.com/v1/images/search' );
    url.searchParams.append( 'limit', LIMIT );

    if ( ORDER ) {
      url.searchParams.append( 'order', ORDER );
    }

    if ( page ) {
      url.searchParams.append( 'page', page );
    }

    try {
      const responseJson = await (
        await fetch( url.toString(), {
          headers: {
            'x-api-key': ' 17460dc6-8492-40f2-abd5-62c692647c6c',
          },
        } )
      ).json();

      return responseJson;
    } catch ( err ) {
      console.error( err );
      alert( 'Dogs could not be fetched. Please refresh the page!' );
    }
  }

  /**
   * Checks in localStorage for breed data for given name.
   * Fetches breed data from thedogapi.com otherwise
   * @param name
   * @returns
   */
  async getBreed( name: string ) {
    try {
      const breed = localStorage.getItem( name );
      if ( breed ) {
        return JSON.parse( breed );
      }
      const responseJson = await (
        await fetch( `https://api.thedogapi.com/v1/images/${ name }`, {
          headers: {
            'x-api-key': ' 17460dc6-8492-40f2-abd5-62c692647c6c',
          },
        } )
      ).json();

      localStorage.setItem( responseJson.id, JSON.stringify( responseJson ) );
      return responseJson;
    } catch ( err ) {
      console.error( err );
    }
  }

  /**
   * Checks localStorage for an image of a dog for given name.
   * @param name Name of dog to get an image for.
   * @returns The url of an image for the dog.
   */
  getBreedImage( name: string ) {
    return localStorage.getItem( `${ name }-image` );
  }
}

// Export as singleton
export const dogApi = new DogApi();
