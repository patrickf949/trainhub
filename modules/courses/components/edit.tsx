
import { Formik, Field, Form, useFormik } from 'formik';
import Loader from '../../../components/loader';
import { editCourseData, editCourseProps } from '../store/types';
import * as Yup from 'yup';
import InputField from '../../../components/inputField';

export default function Course(props: editCourseProps) {

    const { course, handleSubmit, isProcessing } = props;
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required")
        .min(4, "Principal name must be at least 4 characters")
            .max(60, "Principal namme must not exceed 60 characters"),
        cadre: Yup.string()
            .min(4, "Principal name must be at least 4 characters")
            .max(60, "Principal namme must not exceed 60 characters"),
        professionalQualification: Yup.string()
        .min(4, "Principal name must be at least 4 characters")
        .max(60, "Principal namme must not exceed 60 characters"),
        durationYears: Yup.string()
            .trim()
            .matches(/^[0-9]+$/, 'Must be digits')
            .matches(/^[1-9]$|^10$/, 'Must be between 1 than 12')
            .nullable(),
    });

    return (
        <div>
            <Formik
                initialValues={course}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {(props) => {
              return <Form className="form-control">
                    <div className="row">
                            <InputField
                                name="name"
                                placeholder="Enter Course name"
                                label="Course name"
                                isLoading={isProcessing}
                                value={props.values.name}
                                required={true}
                            ></InputField>
                            <InputField
                                name={"cadre"}
                                placeholder={"Enter Cadre"}
                                label={"Cadre"}
                                isLoading={isProcessing}
                                value={props.values.cadre}
                                required={false}
                            ></InputField>
                            <InputField
                                name={"professionalQualification"}
                                placeholder={"Enter Professional Qualification"}
                                label="Professional Qualification"
                                value={props.values.professionalQualification}
                                required={false}
                            ></InputField>
                            <InputField
                                name={"durationYears"}
                                placeholder={"Enter Course Duration"}
                                label="Course Duration"
                                isLoading={isProcessing}
                                value={props.values.durationYears}
                                required={false}
                            ></InputField>
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