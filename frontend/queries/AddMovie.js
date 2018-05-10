import {
  commitMutation,
  graphql,
} from 'react-relay';
import {ConnectionHandler, RecordProxy} from 'relay-runtime';
import environment from '../Environment';
const mutation = graphql`
  mutation AddMovieMutation($input: AddMovieInput!) {
    addMovie(input: $input){
      movie{
        id
        title
        description
      }
    }
  }
`
export default (title, description, callback) => {
  const variables = {
    input: {
      title,
      description
    },
  }
  commitMutation(
    environment,
    {
      mutation,
      variables,
      optimisticUpdater: (proxyStore) => {
          // 1 create new movie
          const id = new Date().getTime();
          const newMovie = proxyStore.create(id, 'Movie');
          newMovie.setValue(id, 'id');
          newMovie.setValue(title, 'title');
          newMovie.setValue(description, 'description');
          // 2 - add new movie to the store
          const mainProxy = proxyStore.getRoot().getLinkedRecord('main');
          const connection = ConnectionHandler.getConnection(mainProxy, 'MovieList_movies');
          if(connection) {
            const edge = ConnectionHandler.createEdge(proxyStore, connection, newMovie);
            ConnectionHandler.insertEdgeAfter(connection, edge);
          }
        },
        updater: (proxyStore) => {
          // 1 - retrieve the `newMovie` from the server response
          const addMovieField = proxyStore.getRootField('addMovie');
          const newMovie = addMovieField.getLinkedRecord('movie');
          
          // 2 - add new movie to the store
          const mainProxy = proxyStore.getRoot().getLinkedRecord('main');
          const connection = ConnectionHandler.getConnection(mainProxy, 'MovieList_movies');
          if(connection) {
            const edge = ConnectionHandler.createEdge(proxyStore, connection, newMovie);
            ConnectionHandler.insertEdgeAfter(connection, edge);
          }
        },
      // 7
      onCompleted: () => {
        callback()
      },
      onError: err => console.error(err),
    },
  )
}