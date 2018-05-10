import {
  commitMutation,
  graphql,
} from 'react-relay';
import {ConnectionHandler, RecordProxy} from 'relay-runtime';
import environment from '../Environment';
const mutation = graphql`
  mutation DeleteMovieMutation($input: DeleteMovieInput!){
  deleteMovie(input: $input){
    movie{
      id
      title
      description
    }
  }
}
`
export default (mainId, id) => {
  const variables = {
    input: {
      globalId: id
    },
  }
  commitMutation(
    environment,
    {
      mutation,
      variables,
      optimisticUpdater: (proxyStore) => {
          // 2 - add new movie to the store
          const mainProxy = proxyStore.get(mainId);
          const connection = ConnectionHandler.getConnection(mainProxy, 'MovieList_movies');
          if(connection) {
            ConnectionHandler.deleteNode(connection, id);
          }
        },
        updater: (proxyStore) => {
          // 1 - retrieve the `newMovie` from the server response
          const deleteMovieField = proxyStore.getRootField('deleteMovie');
          const deleteMovie = deleteMovieField.getLinkedRecord('movie');
          const deletedId  = deleteMovie.getValue('id');
          
          // 2 - add new movie to the store
          const mainProxy = proxyStore.get(mainId);
          const connection = ConnectionHandler.getConnection(mainProxy, 'MovieList_movies');
          if(connection) {
            ConnectionHandler.deleteNode(connection, deletedId);
          }
        },
      // 7
      onCompleted: () => {
        console.log('deleted');
      },
      onError: err => console.error(err),
    },
  )
}