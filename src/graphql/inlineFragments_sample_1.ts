import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  graphql,
  parse,
} from 'graphql';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      foo: { type: GraphQLString },
    },
  }),
});
const source = `{ foo }`;

graphql({
  schema,
  source,
  fieldResolver(_source: any, _args: any, _context: any, info: any) {
    // For the purposes of test, just return the name of the field!
    console.log(info.fieldName);

    return info.fieldName;
  },
}).then((response: any) => {
  console.log(JSON.stringify(response));
});
