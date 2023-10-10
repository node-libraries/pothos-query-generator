import SchemaBuilder, { BasePlugin, SchemaTypes } from "@pothos/core";
import "./global-types.js";
import { GraphQLSchema } from "graphql";
import { promises as fs } from "fs";
import path from "path";
import { generate } from "graphql-auto-query";

/**
 * A plugin for Pothos that generates GraphQL queries using graphql-auto-query.
 * @template Types - The schema types.
 */
export class PothosQueryGeneratorPlugin<
  Types extends SchemaTypes
> extends BasePlugin<Types> {
  afterBuild(schema: GraphQLSchema): GraphQLSchema {
    const builder = this.builder;
    const output = builder.options.pothosQueryGenerator?.output;
    const depth = builder.options.pothosQueryGenerator?.depth;
    if (output) {
      const targetDir = path.dirname(output);
      fs.mkdir(targetDir, { recursive: true })
        .catch(() => undefined)
        .then(() => {
          fs.writeFile(output, generate(schema, depth));
        });
    }
    return schema;
  }
}

const pluginName = "pothosQueryGenerator" as const;
const allowPluginReRegistration = SchemaBuilder.allowPluginReRegistration;
SchemaBuilder.allowPluginReRegistration = true;
SchemaBuilder.registerPlugin(pluginName, PothosQueryGeneratorPlugin);
SchemaBuilder.allowPluginReRegistration = allowPluginReRegistration;
export default pluginName;
