import { graphql, buildSchema } from "graphql";

const schema = buildSchema(`
  type Query {
    people: People
  }
  type People { 
    id: String
    name: String
    hobby: String
  }
`);

const rootValue = {
  people: () => ({ id: "1", name: "aleng", hobby: "hobby" }),
};

const source = `
    { 
        people { 
            name1:name
            id 
        } 
    }`;

graphql({ schema, source, rootValue }).then((response: any) => {
  console.log(JSON.stringify(response));
});
