export const templatesList = [
  "azurill",
  "bronzor",
  "chikorita",
  "elegant",
  "classic",
  "ditto",
  "gengar",
  "glalie",
  "kakuna",
  "leafish",
  "nosepass",
  "onyx",
  "pikachu",
  "rhyhorn",
] as const;

export type Template = (typeof templatesList)[number];
