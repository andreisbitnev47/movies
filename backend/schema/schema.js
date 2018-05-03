const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull } = graphql;
const Movie = require('../models/movie');
const Actor = require('../models/actor');

const ActorType = new GraphQLObjectType({
    name: 'Actor',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLID },
        age: { type: GraphQLString },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parentValue) {
                if(!parentValue.movies) {
                    return [];
                }
                const movieIds = parentValue.movies.map((movie) => {
                    return movie.id.toString('hex')
                })
                return Movie.find({"_id": {$in: movieIds}});
            }
        }
    })
});

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        actors: { 
            type: new GraphQLList(ActorType),
            resolve(parentValue) {
                const actorIds = parentValue.actors.map((actor) => {
                    return actor.id.toString('hex')
                })
                return Actor.find({"_id": {$in: actorIds}});
            } 
        }
    })
});

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
    },
    actor: {
        type: ActorType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        },
        resolve( parentValue, { id }) {
            return Actor.findById(id);
        }
    },
    actors: {
        type: new GraphQLList(ActorType),
        resolve( parentValue, { id }) {
            return Actor.find({});
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
                description: { type: GraphQLString},
                actorNames: { type: new GraphQLList(GraphQLString)}
            },
            resolve: async(parentValue, { title, description, actorNames }) => {
                let actors = await Actor.find({"name": {$in: actorNames} });
                if(!actors || !actors.length) {
                    return await (new Movie({ title, description })).save();
                }
                return await (new Movie({ title, description, actors })).save();
            }
        },
        addActor: {
            type: ActorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLString},
                movieNames: { type: new GraphQLList(GraphQLString) }
            },
            resolve: async (parentValue, { name, age, movieNames }) => {
                let movies = await Movie.find({"title": {$in: movieNames} });
                if(!movies || !movies.length) {
                    return await (new Actor({ name, age })).save();
                }
                let newActor = await new Actor({ name, age, movies }).save();
                await Movie.updateMany({"title": {$in: movieNames} }, { $push: { actors: newActor } });
                return newActor;
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