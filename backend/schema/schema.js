const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} = require('graphql');

const {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    fromGlobalId,
    globalIdField,
    nodeDefinitions,
    toGlobalId,
} = require('graphql-relay');

const Movie = require('../models/movie');
const Actor = require('../models/actor');

function getMovieActors(movies) {
    return movies.map((movie) => {
        const actorIds = movie.actors.map((actor) => {
            return actor.id.toString('hex')
        })
        return Actor.find({"_id": {$in: actorIds}});
    });
}

const {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
        const {type, id} = fromGlobalId(globalId);
        if (type === 'Actor') {
            return getActor(id);
        } else if (type === 'Movie') {
            return getMovie(id);
        }
        return null
    },
    (obj) => {
        return obj.actors ? MovieType : ActorType
    }
);

const ActorType = new GraphQLObjectType({
    name: 'Actor',
    fields: () => ({
        id: globalIdField('Actor'),
        name: { type:GraphQLString },
        age: { type:GraphQLString }
    }),
    interface: [nodeInterface],
});

const { connectionType: actorsConnection } = 
    connectionDefinitions({ name: 'Actor', nodeType: ActorType });

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: globalIdField('Movie'),
        title: { type:GraphQLString },
        description: { type:GraphQLString },
        actors: {
            type: actorsConnection,
            args: connectionArgs,
            resolve: (movies, args) => connectionFromArray(getMovieActors(movies), args),
        },
    }),
    interface: [nodeInterface],
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeField,
        movies: {
            type: MovieType,
            resolve: () => Movie.find({}),
        },
    }),
});


module.exports = new GraphQLSchema({
    query: Query,
});