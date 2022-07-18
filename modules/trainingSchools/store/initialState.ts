export const initialState = {
  isLoading: false,
  school: {
    name: "",
    id: "",
    principal: "",
    healthFacility: "",
    address: "",
  },
};

export const editInitialState = {
  isLoading: false,
  school: {
    name: "",
    principal: "",
    healthFacility: "",
    address: "",
    email: "",
    district: '',
    registrationStatus:"",
    contacts: [],
    courses: [],
    level: '0',
    passRate: '0',
  },
};
