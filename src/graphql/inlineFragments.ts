import { graphql, buildSchema } from "graphql";

const schema = buildSchema(`
  type Query {
    getHero(episode: String, withFriends: Boolean): Hero
  }

  type Hero { 
    name: String
    friends: Friends
  }

  type Friends{
    name: String
  }
  
`);

const rootValue = {
  getHero: (episode: string) => {
    return {
      name: "R2-D2",
      friends: (withFriends: boolean) => {
        console.log(episode);
        console.log(withFriends);
        return { name: "1" };
      },
    };
  },
};

// query
const source = `
    query HeroForEpisode($ep: Episode!) {
        hero(episode: $ep) {
        name
        ... on Droid {
            primaryFunction
        }
        ... on Human {
            height
        }
        }
    }
`;

const variableValues1 = {
  ep: "JEDI",
};

graphql({ schema, source, rootValue, variableValues: variableValues1 }).then(
  (response: any) => {
    console.log(JSON.stringify(response));
  }
);
