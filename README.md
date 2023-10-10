# pothos-query-generator

A plugin for Pothos that generates GraphQL queries using graphql-auto-query

## usage

Set the output path to `output`.
The depth of the query is set by `depth`.

```ts
import PothosQueryGeneratorPlugin from "pothos-query-generator";

export const builder = new SchemaBuilder({
  plugins: [PothosQueryGeneratorPlugin],
  pothosSchemaExporter: {
    output: "query.graphql",
    depth: 2,
  },
});
```

If `undefined`,`null`,`false` is set, no file will be output

```ts
import PothosQueryGeneratorPlugin from "pothos-query-generator";

export const builder = new SchemaBuilder({
  plugins: [PothosQueryGeneratorPlugin],
  pothosQueryGenerator: {
    output:
      process.env.NODE_ENV === "development" &&
      path.join(process.cwd(), "graphql", "query.graphql"),
  },
});
```
