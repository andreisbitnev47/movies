import gql from 'graphql-tag';

export default gql`
mutation AddActor($name: String!, $age: String) {
    addActor(name: $name, age: $age) {
      id,
      name,
      age
    }
}
`