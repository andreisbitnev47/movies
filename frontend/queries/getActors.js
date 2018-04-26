import gql from 'graphql-tag';

export default gql`
{
    actors{
      name,
      age,
      movies
    }
}
`;