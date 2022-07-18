import React from "react";
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

export type schoolDataEditProps = {
  // children:React.ReactNode,
  props: {
    schoolData: {
      name: string;
      registrationStatus: string;
      principal: string;
      healthFacility: string;
      address: string;
      email: string;
      district: string;
      contacts: string[];
      courses: string[];
      level: number;
      passRate: number;
      id: string;
      createdAt: string;
    };
    handleSubmit: () => void;
    isProcessing: boolean;
  };
};
