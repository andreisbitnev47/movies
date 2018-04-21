import gql from 'graphql-tag';

export default gql`
fragment myMovie on Movie {
  id
  title
  description
}
`;