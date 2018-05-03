const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLList
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

class User {}
const viewer = new User();
viewer.id = '1';
viewer.name = 'me';

function getMovieActors(movie) {
    return new Promise((resolve, reject) => {
        const actorIds = movie.actors.map((actor) => {
            return actor.id.toString('hex')
        })
        let res = [];
        return Actor.find({"_id": {$in: actorIds}}, (err, actors) => {
            if (err) {
                reject(err)
            }
            resolve(actors);
        });
    })
}

function getActorMovies(actor) {
    return new Promise((resolve, reject) => {
        const movieIds = actor.movies.map((movie) => {
            return movie.id.toString('hex')
        })
        let res = [];
        return Movie.find({"_id": {$in: movieIds}}, (err, movies) => {
            if (err) {
                reject(err)
            }
            resolve(movies);
        });
    })
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

// const { connectionType: movieConnection } = 
//     connectionDefinitions({ name: 'Movie', nodeType: MovieType });

const ActorType = new GraphQLObjectType({
    name: 'Actor',
    fields: () => ({
        id: globalIdField(),
        name: { type:GraphQLString },
        age: { type:GraphQLString },
        movies: {
            type: connectionDefinitions({ name: 'Movie', nodeType: MovieType }).connectionType,
            args: connectionArgs,
            resolve: async (parentValue, args) => {
                let movies = await getActorMovies(parentValue);
                return connectionFromArray(movies, args)
            }
        }
    }),
    interfaces: [nodeInterface],
});

const { connectionType: actorsConnection } = 
    connectionDefinitions({ name: 'Actor', nodeType: ActorType });

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: globalIdField(),
        title: { type:GraphQLString },
        description: { type:GraphQLString },
        actors: {
            type: actorsConnection,
            args: connectionArgs,
            resolve: async (parentValue, args) => {
                let actors = await getMovieActors(parentValue);
                return connectionFromArray(actors, args)
            }
        }
    }),
    interfaces: [nodeInterface],
});

const { connectionType: moviesConnection } = 
    connectionDefinitions({ name: 'Movies', nodeType: MovieType });

const MainType = new GraphQLObjectType({
    name: 'Main',
    fields: () => ({
        id: globalIdField(),
        movies: {
            type: moviesConnection,
            args: connectionArgs,
            resolve: async (parentValue, args) => {
                let movies = await Movie.find({});
                return connectionFromArray(movies, args)
            }
        }
    }),
    interfaces: [nodeInterface],
});
    

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeField,
        main: {
            type: MainType,
            resolve: () => viewer,
        },
    })
});


module.exports = new GraphQLSchema({
    query: Query,
});