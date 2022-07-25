import { Field } from "formik";

export default function InputField(props) {
    const { name, placeholder, isLoading, label, required } = props;
    return (
        <>
            <label htmlFor={name}>
                {label}
                {required &&<span className='text-danger'>*</span>}
            </label>
            <Field
                required={true}
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