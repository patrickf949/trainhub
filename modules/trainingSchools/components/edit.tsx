
import { Formik, Field, Form, useFormik } from 'formik';
import Loader from '../../../components/loader';
import { schoolDataEditProps, schoolDataProps } from '../store/types';
import * as Yup from 'yup';
import InputField from '../../../components/inputField';
import Selector from '../../../components/selector';
import { getDistricts } from '../../../lib/districts';
import MultiSelector from '../../../components/multiSelect';
import { getAllContacts } from '../../contacts/lib/contacts';
import { getAllCourses } from '../../courses/lib/courses';
import SimpleSelector from '../../../components/simpleselect';

export default function School(props: schoolDataEditProps) {

    const { school, handleSubmit, isProcessing } = props;
    const statuses = ['Provisional License', 'Full Registration'];
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        principal: Yup.string()
            .required("Principal is required")
            .min(4, "Principal name must be at least 4 characters")
            .max(60, "Principal namme must not exceed 60 characters"),
        registrationStatus: Yup.string().oneOf([null,...statuses], 'Will default to full registration').nullable(),
        email: Yup.string().email("Email is invalid")
        .nullable(),
        district: Yup.string().required("District is required")
        .min(1,'Please select a district'),
        healthFacility: Yup.string()
            .min(4,"Health facility must be atleast 4 characters")
            .nullable(),
        passRate: Yup.string()
            .trim()
            .matches(/^[0-9]+$/, 'Must be digits')
            .nullable(),
        level: Yup.string()
            .trim()
            .matches(/^[0-9]+$/, 'Must be digits')
            .nullable(),
        contacts: Yup.array(),
        courses:Yup.array(),
    });

    return (
        <div>
            <Formik
                initialValues={school}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {(props) => {
              return <Form className="form-control">
                    <div className="row">
                        <div className="col">
                            <InputField
                                name="name"
                                placeholder="Enter School name"
                                label="School name"
                                isLoading={isProcessing}
                                value={props.values.name}
                                required={true}
                            ></InputField>
                            <InputField
                                name={"principal"}
                                placeholder={"Enter Principal's"}
                                label={"Principal"}
                                isLoading={isProcessing}
                                value={props.values.principal}
                                required={true}
                            ></InputField>
                            <SimpleSelector
                                name={"registrationStatus"}
                                placeholder={"Enter Registration Status"}
                                label="Registration Status"
                                required={true}
                                value={props.values.registrationStatus}
                                items={statuses}
                            ></SimpleSelector>
                            <InputField
                                name={"email"}
                                placeholder={"Enter School Email"}
                                label="School Email"
                                isLoading={isProcessing}
                                value={props.values.email}

                            ></InputField>
                            <InputField
                                name={"healthFacility"}
                                placeholder={"Enter Health Facility"}
                                label="Health Facility"
                                isLoading={isProcessing}
                                value={props.values.healthFacility}

                            ></InputField>
                            <InputField
                                name={"address"}
                                placeholder={"Enter Address"}
                                label="Address"
                                isLoading={isProcessing}
                                value={props.values.address}
                            ></InputField>
                        </div>
                        <div className="col">
                            <InputField
                                name={"level"}
                                placeholder={"Enter School level"}
                                label="Level"
                                isLoading={isProcessing}
                                required={false}
                                value={props.values.level}
                                type={'number'}
                            ></InputField>
                            <InputField
                                name={"passRate"}
                                placeholder={"Enter Pass Rate"}
                                label="Pass Rate"
                                isLoading={isProcessing}
                                value={props.values.passRate}
                                required={false}
                                type={'number'}
                            ></InputField>
                            <Selector
                                name={"district"}
                                placeholder={"Select a district"}
                                label="Select a district"
                                required={true}
                                value={props.values.district}
                                getRequest={getDistricts}
                            ></Selector>
                            <MultiSelector
                                name={"contacts"}
                                placeholder={"Select a contact"}
                                label="School Contacts"
                                required={true}
                                field="phoneNumber"
                                value={props.values.contacts}
                                getRequest={getAllContacts}

                            >

                            </MultiSelector>
                            <MultiSelector
                                name={"courses"}
                                placeholder={"Select a course"}
                                label="Courses offered"
                                required={true}
                                field="name"
                                value={props.values.courses}
                                getRequest={getAllCourses}

                            >

                            </MultiSelector>
                        </div>
                    </div>




                    <hr />
                    <Loader isProcessing={isProcessing}></Loader>
                    <button hidden={isProcessing} className='btn btn-sm btn-outline-primary' type="submit">Submit</button>
                </Form>
                }}
            </Formik>
        </div>
    );
};