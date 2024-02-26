import { Template } from "@reactive-resume/utils";

import { Azurill } from "./azurill";
import { Bronzor } from "./bronzor";
import { Chikorita } from "./chikorita";
import { Elegant } from "./elegant";
import { Minimalist } from "./minimalist";
import { Ditto } from "./ditto";
import { Gengar } from "./gengar";
import { Glalie } from "./glalie";
import { Kakuna } from "./kakuna";
import { Leafish } from "./leafish";
import { Nosepass } from "./nosepass";
import { Onyx } from "./onyx";
import { Pikachu } from "./pikachu";
import { Rhyhorn } from "./rhyhorn";

export const getTemplate = (template: Template) => {
  switch (template) {
    case "azurill":
      return Azurill;
    case "bronzor":
      return Bronzor;
    case "chikorita":
      return Chikorita;
    case "elegant":
      return Elegant;
      case "minimalist":
        return Minimalist;
    case "ditto":
      return Ditto;
    case "gengar":
      return Gengar;
    case "glalie":
      return Glalie;
    case "kakuna":
      return Kakuna;
    case "leafish":
      return Leafish;
    case "nosepass":
      return Nosepass;
    case "onyx":
      return Onyx;
    case "pikachu":
      return Pikachu;
    case "rhyhorn":
      return Rhyhorn;
    default:
      return Onyx;
  }
};
