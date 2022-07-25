
import { Formik, Field, Form, useFormik } from 'formik';
import Loader from '../../../components/loader';
import { editCourseData, editCourseProps } from '../store/types';
import * as Yup from 'yup';
import InputField from '../../../components/inputField';
import MultiSelector from '../../../components/multiSelect';
import { getAllTrainingSchools } from '../../trainingSchools/lib/schools';

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
        trainingschools: Yup.array(),
    });

    return (
        <div>
            <Formik
                initialValues={course}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >

                <Form className="form-control">
                    <div className="row">
                        <InputField
                            name="name"
                            placeholder="Enter Course name"
                            label="Course name"
                            isLoading={isProcessing}
                            required={true}
                        ></InputField>
                        <InputField
                            name={"cadre"}
                            placeholder={"Enter Cadre"}
                            label={"Cadre"}
                            isLoading={isProcessing}
                            required={false}
                        ></InputField>
                        <InputField
                            name={"professionalQualification"}
                            placeholder={"Enter Professional Qualification"}
                            label="Professional Qualification"
                            required={false}
                        ></InputField>
                        <InputField
                            name={"durationYears"}
                            placeholder={"Enter Course Duration"}
                            label="Course Duration"
                            isLoading={isProcessing}
                            required={false}
                        ></InputField>
                        <MultiSelector
                            name={"trainingschools"}
                            placeholder={"Select a School"}
                            label={"Training Schools"}
                            required={false}
                            field={"name"}
                            getRequest={getAllTrainingSchools}
                            multi={true}
                        ></MultiSelector>
                    </div>
                    <hr />
                    <Loader isProcessing={isProcessing}></Loader>
                    <button hidden={isProcessing} className='btn btn-sm btn-outline-primary' type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
};