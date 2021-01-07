import { languages } from "src/assets/index";
import { langType } from "./types";

export const getLangFile = (lang: langType = "es") => languages[lang];

export const getUpperFirstSentence = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;
