import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString,
  buildSchema,
  graphql,
} from 'graphql';
import { Context } from 'mocha';

const schema = buildSchema(`
      type Query {
        pets: [Pet]
      }

      union Pet = Cat | Dog

      type Cat {
        name: String
        meows: Boolean
      }

      type Dog {
        name: String
        woofs: Boolean
      }
    `);

const source = `
      {
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

class Dog {
  name: string;
  woofs: boolean;

  constructor(name: string, woofs: boolean) {
    this.name = name;
    this.woofs = woofs;
  }
}

class Cat {
  name: string;
  meows: boolean;

  constructor(name: string, meows: boolean) {
    this.name = name;
    this.meows = meows;
  }
}

const rootValue = {
  pets: [
    {
      __typename: 'Dog',
      name: 'Odie',
      woofs: true,
    },
    {
      __typename: 'Cat',
      name: 'Garfield',
      meows: false,
    },
  ],
};
const DogType = new GraphQLObjectType<Dog, Context>({
  name: 'Dog',
  isTypeOf(obj, context) {
    const isDog = obj instanceof Dog;
    return isDog;
  },
  fields: {
    name: { type: GraphQLString },
    woofs: { type: GraphQLBoolean },
  },
});

const CatType = new GraphQLObjectType<Cat, Context>({
  name: 'Cat',
  isTypeOf(obj, context) {
    const isCat = obj instanceof Cat;
    return isCat;
  },
  fields: {
    name: { type: GraphQLString },
    meows: { type: GraphQLBoolean },
  },
});

const fieldResolver = (_source: any, _args: any, _context: any, info: any) => {
  console.log(info.fieldName);

  return [DogType, CatType];
};

graphql({ schema, source, rootValue, fieldResolver }).then((response: any) => {
  console.log(JSON.stringify(response));
});
