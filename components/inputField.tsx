import { Field } from "formik";
import { toast } from 'react-toastify';
import { useQuery } from 'react-query'
import Loader from './loader'

export default function InputField(props) {
    const { name, placeholder, isLoading, label,required,type } = props;
    return (
        <>
            <label htmlFor={name}>
                {label}
                {required &&<span className='text-danger'>*</span>}
            </label>
            <Field
                required={true} id={name}
                name={name}
            >
                {({
                    field,
                    meta,
                }) => (
                    <div>
                        <input disabled={isLoading} className='form-control' type="text" placeholder={placeholder} {...field} />
                        {meta.touched && meta.error && (
                            <div className="text-danger">{meta.error}</div>
                        )}
                    </div>
                )}
            </Field>
            <br/>
        </>
    );
};