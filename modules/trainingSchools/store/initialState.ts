export const initialState = {
  isLoading: false,
  school: {
    name: "",
    id: null,
    principal: "",
    healthFacility: "",
    address: "",
    email: "",
    district: {},
    registrationStatus:"",
    createdAt:"",
    districtId:'',
    contacts: [],
    courses: [],
    level: 0,
    passRate: 0,
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
    level: 0,
    passRate: 0,
  },
};
