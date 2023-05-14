const resolvers = {
    Query: {
        // returns an array of Tracks that will be used to populate
        // the homepage grid of our web client
        tracksForHome: (parent, args, contextValue, info) => {
            return contextValue.dataSources.trackAPI.getTracksForHome();
        },
        track: (parent, args, contextValue, info) => {
            return contextValue.dataSources.trackAPI.getTrack(args.id);
        }
    },
    Mutation: {
        incrementTrackViews: async (parent, args, contextValue, info) => {
            try {
                const track = await contextValue.dataSources.trackAPI.incrementTrackViews(args.id);
                return {
                    code: 200,
                    success: true,
                    message: `Successfully incremented number of views for track ${args.id}`,
                    track
                };
            } catch (error) {
                return {
                    code: error.extensions.response.status,
                    success: false,
                    message: error.extensions.response.body,
                    track: null
                };
            }
        }
    },
    Track: {
        // parent = Track
        author: (parent, args, contextValue, info) => {
            console.log("--- parent ---", parent);
            console.log("--- args ---", args);
            console.log("--- contextValue ---", contextValue);
            console.log("--- info ---", info);
            return contextValue.dataSources.trackAPI.getAuthor(parent.authorId);
        },
        modules: (parent, args, contextValue, info) => {
            return contextValue.dataSources.trackAPI.getTrackModules(parent.id);
        }
    }
};

module.exports = resolvers;
