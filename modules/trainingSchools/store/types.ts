type schoolData = {
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
        [index: number]: {
          id: string;
          name: string;
          createdAt: string;
        };
      };
      region: {
        id: string;
        name: string;
        createdAt: string;
      };
    };
    contacts: {
      [index: number]: contact;
    };
    courses: {
      [index: number]: {
        id: string;
        name: string;
        cadre: string;
        professionalQualification: string;
        durationYears: number;
        createdAt: string;
      }
    };
    level: number;
    passRate: number;
    id: string;
    createdAt: string;
    districtId: string;
  };
export default schoolData;
