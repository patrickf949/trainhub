
import { Formik, Field, Form, useFormik } from 'formik';
import Loader from '../../../components/loader';


export default function Contact(props) {
    const { contact, handleSubmit, isProcessing } = props;
    return (
        <div>
            <Formik
                initialValues={contact}
                onSubmit={handleSubmit}
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