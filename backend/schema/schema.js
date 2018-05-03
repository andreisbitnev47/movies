const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString, GraphQLNonNull } = graphql;
const Movie = require('../models/movie');
const Actor = require('../models/actor');

const ActorType = new GraphQLObjectType({
    name: 'Actor',
    fields: () => ({
        name: { type: GraphQLID },
        age: { type: GraphQLString }
    })
})

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
            resolve(parentValue, { title, description, actorNames }) {
                Actor.find({"name": {$in: actorNames} }, (err, actors) => {
                    if(!actors) {
                        return (new Movie({ title, description })).save();
                    }
                    return (new Movie({ title, description, actors })).save();
                });
            }
        },
        addActor: {
            type: ActorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLString},
                movieNames: { type: new GraphQLList(GraphQLString) }
            },
            resolve(parentValue, { name, age }) {
                Movie.find({"name": {$in: movieNames} }, (err, movies) => {
                    if(!movies) {
                        return (new Actor({ name, age })).save();
                    }
                    const newActor = new Actor({ name, age, movies }).save();
                    Movie.updateMany({"name": {$in: movieNames} }, { $push: { actors: newActor } }, (err, updated) => {
                        return newActor;
                    })
                });
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