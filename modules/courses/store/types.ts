import { schoolData } from "../../trainingSchools/store/types";
export type courseData={
    name: string;
    id:string;
    professionalQualification:string;
    durationYears:number; 
    createdAt:string;
    cadre:string;
    trainingschools:schoolData[]
}