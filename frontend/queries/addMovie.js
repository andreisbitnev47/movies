import gql from 'graphql-tag';

export default gql`
mutation AddMovie($title: String!, $description: String) {
    addMovie(title: $title, description: $description) {
      id,
      title,
      description
    }
}
`