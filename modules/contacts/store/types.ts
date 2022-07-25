import { ReactNode } from "react";

export type contact = {
  contact: contactObj;
};

export type contactObj = {
  id: string;
  phoneNumber: string;
  createdAt: string;
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
