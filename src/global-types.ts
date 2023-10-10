import { SchemaTypes } from "@pothos/core";
import { PothosQueryGeneratorPlugin } from "./index.js";

declare global {
  export namespace PothosSchemaTypes {
    export interface Plugins<Types extends SchemaTypes> {
      pothosQueryGenerator: PothosQueryGeneratorPlugin<Types>;
    }

    export interface SchemaBuilderOptions<Types extends SchemaTypes> {
      pothosQueryGenerator?: {
        depth?: number;
        output?: string | null | false;
      };
    }
  }
}
