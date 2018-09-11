const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const { createWriteStream } = require('fs');

const storeUpload = ({ filename, stream }) => {
	return new Promise((resolve, reject) => {
		stream
			.pipe(createWriteStream(filename))
			.on('finish', () => resolve())
			.on('error', reject);
	});
};
const resolvers = {
	Query: {
		demo: () => 'Welecom to file upload'
	},
	Mutation: {
		uploadFile: async (parent, { file }, ctx, info) => {
			const { filename, stream } = await file;
			await storeUpload({ filename, stream });
			return true;
		}
	}
};

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: req => ({
		...req,
		db: new Prisma({
			typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
			endpoint: 'http://localhost:4466', // the endpoint of the Prisma API
			debug: true // log all GraphQL queries & mutations sent to the Prisma API
			// secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
		})
	})
});

server.start(() => console.log('Server is running on http://localhost:4000'));
