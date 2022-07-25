
import { Formik, Form } from 'formik';
import Loader from '../../../components/loader';
import * as Yup from 'yup';
import MultiSelector from '../../../components/multiSelect';
import { getAllTrainingSchools } from '../../trainingSchools/lib/schools';
import InputField from '../../../components/inputField';

export default function Contact(props) {
    const { contact, handleSubmit, isProcessing } = props;
    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .required("Phone Number is required")
            .matches(/^[0-9]+$/, 'Must be digits')
            .min(10, "Phone Number must be 10 characters"),
        trainingschools: Yup.array()
    });

    return (
        <div>
            <Formik
                initialValues={contact}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <Form className="form-control">
                    <InputField
                        name="phoneNumber"
                        placeholder="Enter Phone Number"
                        label="Phone Number"
                        isLoading={isProcessing}
                        required={true}
                    ></InputField>
                    <hr />
                    <MultiSelector
                        name={"trainingschools"}
                        placeholder={"Select a School"}
                        label={"Training Schools"}
                        required={false}
                        field={"name"}
                        getRequest={getAllTrainingSchools}
                    ></MultiSelector>
                    {isProcessing&&<Loader isProcessing={isProcessing}></Loader>}
                    <button hidden={isProcessing} className='btn btn-sm btn-outline-primary' type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
};