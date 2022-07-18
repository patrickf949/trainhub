
import { Formik, Field, Form, useFormik } from 'formik';
import Loader from '../../../components/loader';
import * as Yup from 'yup';

export default function Contact(props) {
    const { contact, handleSubmit, isProcessing } = props;
    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .required("Phone Number is required")
            .min(6, "Phone Number must be 10 characters")
    });
    // const formik = useFormik({
    //     initialValues: contact,
    //     validationSchema
    // });

    return (
        <div>
            <Formik
                initialValues={contact}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <Form className="form-control">
                    <label htmlFor="phoneNumber">
                        Enter phone Number <span className='text-danger'>*</span>
                    </label>
                    <Field
                        className="form-control"
                        required={true} id="phoneNumber"
                        name="phoneNumber"
                        disabled={isProcessing}
                        placeholder="07xxxxxxxx"
                        pattern="^[0-9]{10}$"
                    />
                    <small>
                        Number should be 10 digits
                    </small>
                    <hr />
                    <Loader isProcessing={isProcessing}></Loader>
                    <button hidden={isProcessing} className='btn btn-sm btn-outline-primary' type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
};