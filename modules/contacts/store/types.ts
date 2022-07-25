import { ReactNode } from "react";
import { schoolData } from "../../trainingSchools/store/types";

export type contact = {
  contact: contactObj;
};

export type contactObj = {
  id: string;
  phoneNumber: string;
  createdAt: string;
  trainingschools:schoolData[];
};
export type editContactObj = {
  phoneNumber: string;
  trainingschools:string[];
};

export type contactProp = {
  children:ReactNode,
  contact: contactObj;
  onChange: (event) => void;
  handleSubmit: (event) => void;
  isProcessing: boolean;
};
export type contactProps = {
  props: contactProp;
};
