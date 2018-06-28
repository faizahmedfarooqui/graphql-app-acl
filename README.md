<h1 align="center"><strong>Boilerplate for an Advanced GraphQL Server with basic Auth APIs </strong></h1>

<div align="center"><strong>🚀 Bootstrap your GraphQL server within seconds</strong></div>
<div align="center">A starter kit for a flexible Prisma GraphQL server for Typescript.js - Access control for group</div>

## Requirements

You need to have the [Prisma CLI](https://github.com/graphcool/prisma) installed to bootstrap your GraphQL server using `primsa init`:

```sh
npm install -g prisma
```

You can now [deploy](https://www.prismagraphql.com/docs/reference/cli-command-reference/database-service/prisma-deploy-kee1iedaov) the Prisma service (note that this requires you to have [Docker](https://www.docker.com) installed on your machine - if that's not the case, follow the collapsed instructions below the code block):

```sh
prisma deploy
```

<details>
 <summary><strong>I don't have <a href="https://www.docker.com">Docker</a> installed on my machine</strong></summary>

Please follow the steps provided in the give [here](https://docs.docker.com/docker-for-mac/install/) to install docker for mac.
Once the Docker is installed, start the docker engine into your system.
</details>


## Getting started

```sh
# 1. Navigate to the cloned GraphQL server in directory `prisma-group-acl`, based on `typescript-advanced` boilerplate
cd prisma-group-acl;

# 2. Install require NPM packages
npm install;

#3. Deploy the prisma...
prisma deploy;

# 4. Start server (runs on http://localhost:4000) and open GraphQL Playground
npm run dev;
```

## Documentation

### API

* APIs for client is available in [documentations/apis.app.graphql](https://git.geekyants.com/boilerplate/prisma-group-acl/blob/master/documentations/apis.app.graphql)
* APIs for dev is availabe in [documentations/apis.dev.graphql](https://git.geekyants.com/boilerplate/prisma-group-acl/blob/master/documentations/apis.dev.graphql)

### Commands

* `npm run start` starts GraphQL server on `http://localhost:4000`
* `npm run dev` starts GraphQL server on `http://localhost:4000` _and_ opens GraphQL Playground
* `npm run playground` opens the GraphQL Playground for the `projects` from [`.graphqlconfig.yml`](./.graphqlconfig.yml)
* `prisma <subcommand>` gives access to local version of Prisma CLI (e.g. `prisma deploy`)

> **Note**: We recommend that you're using `npm run dev` during development as it will give you access to the GraphQL API or your server (defined by the [application schema](./src/schema.graphql)) as well as to the Prisma API directly (defined by the [Prisma database schema](./generated/prisma.graphql)). If you're starting the server with `npm run start`, you'll only be able to access the API of the application schema.

### To Access MySQL image in Docker 

```sh
#1. This command will give the list of container with their respective container-id
docker ps;

#2. This command will take you inside the docker mysql container
docker exec -it <container-mysql-id> sh;

#3. This command will access the mysql cli
mysql -u root -p

#4. Enter mysql root user password
graphcool

#5. Access the database
use `database-name`;
```

> **Note**: The database name is the name of your project repo name defined with the environment name.
For ex. I am running app by name `prisma-group-acl` & environment is `dev` then database name is `prisma-group-acl@dev`


### Project structure

| File name 　　　　　　　　　　　　　　| Description 　　　　　　　　<br><br>|
| :--  | :--         |
| `├── .env` | Defines environment variables |
| `├── .graphqlconfig.yml` | Configuration file based on [`graphql-config`](https://github.com/prisma/graphql-config) (e.g. used by GraphQL Playground).|
| `└── database ` (_directory_) | _Contains all files that are related to the Prisma database service_ |\
| `　　├── prisma.yml` | The root configuration file for your Prisma database service ([docs](https://www.prismagraphql.com/docs/reference/prisma.yml/overview-and-example-foatho8aip)) |
| `　　└── datamodel.graphql` | Defines your data model (written in [GraphQL SDL](https://blog.graph.cool/graphql-sdl-schema-definition-language-6755bcb9ce51)) |
| `└── documentations ` (_directory_) | _Contains detailed documentation for app & dev api files_ |\
| `　　├── apis.app.graphql` | Contains api samples for app(ie. client) |
| `　　└── apis.dev.graphql` | Contains api samples for devs |
| `└── src ` (_directory_) | _Contains the source files for your GraphQL server_ |
| `　　├── index.js` | The entry point for your GraphQL server |
| `　　├── schema.graphql` | The **application schema** defining the API exposed to client applications  |
| `　　├── resolvers` (_directory_) | _Contains the implementation of the resolvers for the application schema_ |
| `　　└── generated` (_directory_) | _Contains generated files_ |
| `　　　　└── prisma.grapghql` | The **Prisma database schema** defining the Prisma GraphQL API  |

## Contributing

Your feedback is **very helpful**, please share your opinion and thoughts! If you have any questions or want to contribute yourself, join the [`#graphql-experiments`](https://geekyants-sahusoft.slack.com/messages/graphql-experiments) channel on our [Slack](https://geekyants-sahusoft.slack.com).