const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull } = graphql;
const Movie = require('../models/movie');

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString }
    })
})

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    movies: {
        type: new GraphQLList(MovieType),
        resolve() {
            return Movie.find({});
        }
    },
    movie: {
        type: MovieType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve( parentValue, { id }) {
            return Movie.findById(id);
        }
    }
  })
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMovie: {
            type: MovieType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString}
            },
            resolve(parentValue, { title, description }) {
                return (new Movie({ title, description })).save();
            }
        },
        editMovie: {
            type: MovieType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                description: { type: GraphQLString }
            },
            resolve(parentValue, { id, title, description }) {
                return ( Movie.findByIdAndUpdate(id, { title, description }, {new: true}, obj => obj))
            }
        },
        deleteMovie: {
            type: MovieType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parentValue, { id }) {
                return (Movie.findByIdAndRemove(id, {new: false}, (obj) => {
                    return obj;
                }))
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation
});