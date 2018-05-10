import {
  commitMutation,
  graphql,
} from 'react-relay';
import {ConnectionHandler, RecordProxy} from 'relay-runtime';
import environment from '../Environment';
const mutation = graphql`
  mutation EditMovieMutation($input: EditMovieInput!) {
    editMovie(input: $input) {
      movie{
        id
        title
        description
      }
    }
  }
`
export default (globalId, title, description, callback) => {
  const variables = {
    input: {
      globalId,
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
          // 2 - edit movie in the store
          const movieProxy = proxyStore.get(globalId);
          movieProxy.setValue(title, "title");
          movieProxy.setValue(description, "description");
        },
        updater: (proxyStore) => {
          // 1 - retrieve the `newMovie` from the server response
          const editMovieField = proxyStore.getRootField('editMovie')
          const updatedMovie = editMovieField.getLinkedRecord('movie')
          
          // 2 - edit movie in the store
          const movieProxy = proxyStore.get(globalId);
          const updatedTitle = updatedMovie.getValue('title');
          const updatedDescription = updatedMovie.getValue('description');
          movieProxy.setValue(updatedTitle, "title");
          movieProxy.setValue(updatedDescription, "description");
        },
      // 7
      onCompleted: () => {
        callback()
      },
      onError: err => console.error(err),
    },
  )
}