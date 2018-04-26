import gql from 'graphql-tag';

export default gql`
mutation AddMovie($title: String!, $description: String, $actorNames: [String]) {
    addMovie(title: $title, description: $description, actorNames: actorNames) {
      id,
      title,
      description,
      actors
    }
}
`