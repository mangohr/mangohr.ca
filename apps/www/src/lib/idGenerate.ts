import { customAlphabet } from "nanoid";

type IType = {
  prefix?: string;
  length?: number;
  alphabet_type?: "0-9" | "0-9/A-Z/a-z" | "0-9/A-Z";
};
export const idGenerate = (props?: IType) => {
  let alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  if (props?.alphabet_type === "0-9/A-Z") {
    alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  if (props?.alphabet_type === "0-9") {
    alphabet = "0123456789";
  }

  const nanoid = customAlphabet(alphabet, props?.length || 16);
  return props?.prefix ? props.prefix + "-" + nanoid() : nanoid();
};
