import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLUnionType,
  graphql,
} from 'graphql';
import { Context } from 'mocha';

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

const PetType = new GraphQLUnionType({
  name: 'Pet',
  types: [DogType, CatType],
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      pets: {
        type: new GraphQLList(PetType),
        resolve() {
          return [new Dog('Odie', true), new Cat('Garfield', false)];
        },
      },
    },
  }),
});

const source = `{
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
}`;
graphql({
  schema,
  source,
  // fieldResolver(_source: any, _args: any, _context: any, info: any) {
  //   // For the purposes of test, just return the name of the field!
  //   console.log(info);
  //   console.log('---------------------------info end');

  //   return info.fieldName;
  // },
}).then((response: any) => {
  console.log(JSON.stringify(response));
});
