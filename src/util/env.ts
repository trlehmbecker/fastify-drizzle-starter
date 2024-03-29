import { StaticDecode, TObject } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

// Taken from https://github.com/sinclairzx81/typebox/issues/626
export function parseEnv<T extends TObject>(
  schema: T,
  value: unknown
): StaticDecode<T> {
  if (!Value.Check(schema, value)) {
    const errorMessage = Value.Errors(schema, value).First();
    console.log(errorMessage);
    if (errorMessage) {
      const envVar = errorMessage.path.slice(1);
      throw new Error(`Error parsing environment variable: ${envVar}`);
    } else {
      throw new Error("Error parsing environment variables");
    }
  }

  // cast value in to mapped schematic, removing additional properties is required here
  const casted = Value.Cast({ ...schema, additionalProperties: false }, value);

  // run the decode on the casted value
  return Value.Decode(schema, casted);
}
