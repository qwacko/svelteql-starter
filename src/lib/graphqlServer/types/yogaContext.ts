import type { YogaInitialContext } from '@graphql-yoga/common';
export interface GraphqlContext extends YogaInitialContext {
	locals: App.Locals;
}
