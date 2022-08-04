# SvelteQL-Starter

A SvelteKit template / starter that I built for my own personal use and thought that others may find useful. It is designed to be a one stop full stack template that has DB / Auth / Graphql API all configured and ready to go.

I tried a bunch of templates / starters but found they just didn't have what I wanted, I tried to align with some widely available packages, and configured how they were designed to be, hopefully this will make updating this starter to the latest versions simple.

This starter attempts to reduce the behind the scenes magic to make it easier to modify / update / etc.. this means there is a little more configuration required by the developer, but it is all exposed at the start.

Includes the following integrations:

- Sveltekit (https://kit.svelte.dev/)
- Prisma (https://www.prisma.io/)
- Authentication (https://github.com/pilcrowOnPaper/lucia-sveltekit)
- Graphql Yoga Servce (https://www.graphql-yoga.com/)
- Apollo Graphql Client (https://github.com/timhall/svelte-apollo)
- Graphql Code Generator (https://www.graphql-code-generator.com/docs/guides/svelte)
- Tailwind CSS (https://tailwindcss.com/)
- Prettier / ESLint Configuration
- All written in typescript

## Getting Started

The following steps should get you up and running

```bash
# degit into new directory
degit tbd....

#Enter Directory
cd TBD.....

#Create .env file
cp .env.example .env

#Modify ENV to match your installation

#Initialise DB
npx prisma migrate dev

#Startup
npm run dev
```

One running, open in your browser and you should be greeted by a "First User" page, which lets you setup the first user (which will also be an admin user).

# ENV File

Duplicate the .env.example file. Properties used as follows.

| Property            | Use                                                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`      | Used by prisma to connect to the database in the `prisma.schema` file. Could be Postgres / MYSQL or SQLite                            |
| `VITE_AUTH_SECRET`  | Used by Lucia for encoding of the session secret. More details can be found in Lucia documentation. Just needs to be a random string. |
| `VITE_ALLOW_SIGNUP` | Enables the `users/signup` route to allow any user to signup to the service.                                                          |
| `VITA_GRAPHQL_URI`  | Address that Graphql server will appear on. Used by the graphql server (Possibly not required, still work in progress                 |

# Prisma

Prisma gets it's configuration from the `DATABASE_URL` in the `.env` file. It is initialised with the necessary configuration for user authentication.
Prisma configuration is stored in `prisma/schema.prisma`

Following changes to `schema.prisma` there is no automatic update (as the DB and Client should be updated at the same time)

```bash
#Rebuild the client
npx prisma generate

#Update the DB
npx prisma migrate dev
```

# Authentication (Lucia)

The authentication consists of the following components

## DB Schema

```prisma
model Users {
  id               String           @id @default(cuid())
  name             String           @default("")
  email            String           @unique @default("")
  admin            Boolean          @default(false)
  identifier_token String           @unique
  hashed_password  String?
  Refresh_Tokens   Refresh_Tokens[]
}

model Refresh_Tokens {
  id            Int    @id @unique @default(autoincrement())
  refresh_token String @unique @db.VarChar(300)
  user          Users  @relation(references: [id], fields: [user_id], onDelete: Cascade)
  user_id       String

  @@index([user_id])
}
```

## Auth Server Component

Stored in `src/lib/auth/lucia.ts` this takes `VITE_AUTH_SECRET` from the environment variables. For more info on the authenticaion library check out https://github.com/pilcrowOnPaper/lucia-sveltekit

You can add additional information other than the lucia information to the context by updating `/src/lib/auth/getCurrentUserDetails.ts` (Both type and function). This information will be made available on `context.locals.user` (with correct typing).

# Graphql Server

This template is running Yoga Graphql server.

## Graphql Config

Edit the `*.graphql` config files in `/src/lib/graphqlServer/graphql`. The server collects all the files (done in `/src/lib/graphqlServer/typeDefs.ts`) and uses them in the server.

All the scalars from the guild (https://www.graphql-scalars.dev/) are included in the server. To import the `*.graphql` file into the code generator / typescript, the file has been copied to `/src/lib/graphqlServer/graphqlScalars/scalars.graphql` (This file is not used for the actual server)

## Resolvers

The graphql resolvers are stored in `/src/lib/graphqlServer/resolvers`.
If any more resolver files are added, then the file must be added to the `index.ts` file in the relevant folder.

All resolvers are imported into the server in `src/lib/graphqlServer/server.ts`.

## Authentication Checks

Authentication checking to make sure only authenticated users can access the API is done in the resolvers (I know that there is a authentication envelop plugin, but it didn't work for me). There is a auth check funciton created that can be added as follows:

```typescript
import { authCheck } from '$lib/auth/authCheck';

//In the resolver. This will send an error message to the requestor
authCheck(context);
```

# GraphQL Client
