import { contactObj } from "../../contacts/store/types";

export type schoolData = {
  name: string;
  registrationStatus: string;
  principal: string;
  healthFacility: string;
  address: string;
  email: string;
  district: {
    id: string;
    name: string;
    createdAt: string;
    countys: {
      id: string;
      name: string;
      createdAt: string;
    }[];
    region: {
      id: string;
      name: string;
      createdAt: string;
    };
  };
  contacts: contactObj[];
  courses: {
    id: string;
    name: string;
    cadre: string;
    professionalQualification: string;
    durationYears: number;
    createdAt: string;
  }[];
  level: number;
  passRate: number;
  id: string;
  createdAt: string;
  districtId: string;
};

export type schoolDataProps = {
  // children:React.ReactNode,
  schoolData: schoolData;
};

export type schoolEditObj = {
  name: string;
  registrationStatus: string;
  principal: string;
  healthFacility: string;
  address: string;
  email: string;
  district: string;
  contacts: string[];
  courses: string[];
  level: string;
  passRate: string;
}

export type schoolDataEditProps = {
    school: schoolEditObj;
    handleSubmit: (values:schoolEditObj) => Promise<void>;
    isProcessing: boolean;
};

export type genericItem={
  id:string,
}