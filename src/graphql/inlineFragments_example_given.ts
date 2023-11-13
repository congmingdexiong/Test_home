import {
  graphql,
  buildSchema,
  GraphQLFieldResolver,
  GraphQLResolveInfo,
} from "graphql";

// union Hero = Human | Droid
const schema = buildSchema(`
  type Query {
    pets: Pet
  }

  union Pet = Dog | Cat

  type Cat {
    name: String
    meows: Boolean
  }
  
  type Dog {
    name: String
    woofs: Boolean
  }

  
`);

// query
const source = `
  query HeroForEpisode {
    pets {
      
      ... on Dog {
        name
        woofs
      }
      
      ... on Cat {
        name
        meows
      }
    }
  }
`;

const rootValue = {
  pets: {
    __typename: "Dog",
    name: "Odie",
    woofs: true,
  },
};

const fieldResolver: GraphQLFieldResolver<any, any> = (
  source: any,
  args: any,
  context: any,
  info: GraphQLResolveInfo
) => {
  console.log(source);
  console.log(args);
  console.log(context);
  console.log(info);
  return {
    Query: {
      pets: (obj: any, args: any, context: any, info: any) => {
        console.log(obj);

        return {
          __typename: "Dog",
          isTypeOf: "Dog",
          name: "Odie",
          woofs: true,
        };
      },
    },
    Pet: {
      __resolveType: (obj: any, context: any, info: any) => {
        console.log(obj);

        return "Dog";
        // if (obj instanceof Dog) return 'Dog'
      },
    },
  };
};

class Cat {
  get __typename() {
    return "Cat";
  }
}
class Dog {
  get __typename() {
    return "Dog";
  }
}

const variableValues = {
  ep: "JEDI",
};

graphql({ schema, source, fieldResolver, variableValues }).then(
  (response: any) => {
    console.log(JSON.stringify(response));
  }
);
