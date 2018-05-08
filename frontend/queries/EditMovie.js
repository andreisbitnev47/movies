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
          const createMovieField = proxyStore.getRootField('editMovie')
          const newMovie = createMovieField.getLinkedRecord('movie')
          
          // 2 - edit movie in the store
          const movieProxy = proxyStore.get(globalId);
          const newTitle = newMovie.getValue('title');
          const newDescription = newMovie.getValue('description');
          movieProxy.setValue(newTitle, "title");
          movieProxy.setValue(newDescription, "description");
        },
      // 7
      onCompleted: () => {
        callback()
      },
      onError: err => console.error(err),
    },
  )
}