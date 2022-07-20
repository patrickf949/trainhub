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

export type editCourseData={
    name: string;
    professionalQualification:string;
    durationYears:number; 
    createdAt:string;
    cadre:string;
    trainingschools:string[]
}

export type editCourseProps={
    handleSubmit:(values:editCourseData)=>Promise<void>;
    isProcessing:boolean;
    course:editCourseData;
}

export type allCoursesData={
    name: string;
    id:string;
    professionalQualification:string;
    durationYears:number; 
    createdAt:string;
    cadre:string;
}[]
