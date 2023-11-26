import { buildSchema, graphql } from 'graphql';

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

graphql({ schema, source, rootValue }).then((response: any) => {
  console.log(JSON.stringify(response));
});
