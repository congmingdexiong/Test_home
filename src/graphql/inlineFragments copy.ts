import {
  graphql,
  buildSchema,
  GraphQLFieldResolver,
  GraphQLResolveInfo,
} from "graphql";

// union Hero = Human | Droid
const schema = buildSchema(`

  type Query {
    getHero(episode: String): Hero
  }
  union Hero = Human | Droid

  type Human{ 
    name: String!
    height: String
  }

  type Droid{
    name: String!
    primaryFunction: String
  }


  
`);
// query
const source = `
    query HeroForEpisode($ep: String!) {
      __typename
      getHero(episode: $ep) {
        __typename
        ... on Droid {
          primaryFunction
        }
        ... on Human {
          height
        }
      
      }
    }
`;
const rootValue = {
  getHero: {
    __typename: "Human",
    name: "Odie",
    height: "true",
  },
};

const fieldResolver: GraphQLFieldResolver<any, any> = (
  source: any,
  args: any,
  context: any,
  info: GraphQLResolveInfo
) => {
  console.log(args);

  return {
    Hero: {
      resolveType: (obj: any) => {
        console.log(obj);

        return 'Human';
      },
    },
    Query: {
      getHero: (obj: any, context: any, info: any) => {
        return { __typename: "Human", name: "R2-D2", height: "height" };
      },
    },
  };
};

const variableValues1 = {
  ep: "JEDI",
};

graphql({
  schema,
  source,
  // rootValue,
  fieldResolver,
  variableValues: variableValues1,
}).then((response: any) => {
  console.log(JSON.stringify(response));
});
