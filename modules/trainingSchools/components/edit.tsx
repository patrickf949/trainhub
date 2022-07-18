
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
            .min(6, "Principal name must be at least 6 characters")
            .max(60, "Principal namme must not exceed 60 characters"),
        registrationStatus: Yup.string().oneOf(statuses, 'Will default to full registration'),
        email: Yup.string().email("Email is invalid"),
        district: Yup.string().required("District is required"),
        healthFacility: Yup.string(),
        address: Yup.string(),
    });

    return (
        <div>
            <Formik
                initialValues={school}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <Form className="form-control">
                    <div className="row">
                        <div className="col">
                            <InputField
                                name={"name"}
                                placeholder={"Enter School name"}
                                label={"School name"}
                                isLoading={isProcessing}
                                required={true}
                            ></InputField>
                            <InputField
                                name={"principal"}
                                placeholder={"Enter Principal's"}
                                label={"Principal"}
                                isLoading={isProcessing}
                                required={true}
                            ></InputField>
                            <SimpleSelector
                                name={"registrationStatus"}
                                placeholder={"Enter Registration Status"}
                                label="Registration Status"
                                required={true}
                                items={statuses}
                            ></SimpleSelector>
                            <InputField
                                name={"email"}
                                placeholder={"Enter School Email"}
                                label="School Email"
                                isLoading={isProcessing}

                            ></InputField>
                            <InputField
                                name={"healthFacility"}
                                placeholder={"Enter Health Facility"}
                                label="Health Facility"
                                isLoading={isProcessing}

                            ></InputField>
                            <InputField
                                name={"address"}
                                placeholder={"Enter Address"}
                                label="Address"
                                isLoading={isProcessing}
                            ></InputField>
                        </div>
                        <div className="col">
                            <InputField
                                name={"level"}
                                placeholder={"Enter School level"}
                                label="Level"
                                isLoading={isProcessing}
                                required={false}
                                type={'number'}
                            ></InputField>
                            <InputField
                                name={"passRate"}
                                placeholder={"Enter Pass Rate"}
                                label="Pass Rate"
                                isLoading={isProcessing}
                                required={false}
                                type={'number'}
                            ></InputField>
                            <Selector
                                name={"district"}
                                placeholder={"Select a district"}
                                label="Select a district"
                                required={true}
                                getRequest={getDistricts}
                            ></Selector>
                            <MultiSelector
                                name={"contacts"}
                                placeholder={"Select a contact"}
                                label="School Contacts"
                                required={true}
                                field="phoneNumber"
                                getRequest={getAllContacts}

                            >

                            </MultiSelector>
                            <MultiSelector
                                name={"courses"}
                                placeholder={"Select a course"}
                                label="Courses offered"
                                required={true}
                                field="name"
                                getRequest={getAllCourses}

                            >

                            </MultiSelector>
                        </div>
                    </div>




                    <hr />
                    <Loader isProcessing={isProcessing}></Loader>
                    <button hidden={isProcessing} className='btn btn-sm btn-outline-primary' type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
};