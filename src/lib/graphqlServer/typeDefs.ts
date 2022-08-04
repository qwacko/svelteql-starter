import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';

export const getTypeDefs = () => {
	const loadedFiles = loadFilesSync(`src/lib/graphqlServer/graphql/*.graphql`, {
		extensions: ['graphql']
	});
	const typeDefs = mergeTypeDefs([loadedFiles, ...scalarTypeDefs]);
	return typeDefs;
};
