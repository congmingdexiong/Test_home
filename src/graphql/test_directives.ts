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

// const rootValue = {
//   getHero: (episode: string) => {
//     return {
//       name: "R2-D2",
//       friends: (withFriends: boolean) => {
//         console.log(episode);
//         console.log(withFriends);
//         return { name: "1" };
//       },
//     };
//   },
// };
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
  query Hero($episode: String, $withFriends: Boolean!) {
    getHero(episode: $episode) {
      name
      friends @include(if: $withFriends) {
        name
      }
    }
  }
`;

const variableValues1 = {
  episode: "JEDI",
  withFriends: true,
};

graphql({ schema, source, rootValue, variableValues: variableValues1 }).then(
  (response: any) => {
    console.log(JSON.stringify(response));
  }
);
