import { graphql, buildSchema } from "graphql";

// union Hero = Human | Droid
const schema = buildSchema(`
  union Hero = Human | Droid
  
  type Query {
    getHero(episode: String): Hero
  }
  
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
      getHero(episode: $ep) {
        ... on Droid {
          name
          primaryFunction
        }
        ... on Human {
          name
          height
        }
      
      }
    }
`;
const rootValue = {
  Hero: {
    name: "R2-D2",
    height: "height",
  },
  Query: {
    getHero: (obj: any, context: any, info: any) => {
      console.log(context);

      return { id: 1 };
    },
  },
};

const variableValues1 = {
  ep: "JEDI",
};

graphql({ schema, source, rootValue, variableValues: variableValues1 }).then(
  (response: any) => {
    console.log(JSON.stringify(response));
  }
);
