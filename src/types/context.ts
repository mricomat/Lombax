import { Dispatch, SetStateAction } from "react";

import { IUser } from "./api";

export interface IGlobalContextType {
  langState: [langType, Dispatch<SetStateAction<langType>>];
  user: [IUser, Dispatch<SetStateAction<IUser>>];
}

export type langType = "es";
