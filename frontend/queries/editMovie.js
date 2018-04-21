import gql from 'graphql-tag';

export default gql`
mutation EditMovie($id: ID!, $title: String, $description: String) {
    editMovie(id: $id, title: $title, description: $description) {
      id,
      title,
      description
    }
}
`;