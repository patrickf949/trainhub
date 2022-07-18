import { Field } from "formik";

export default function SimpleSelector(props) {
    const { name, label, items, required } = props;
    return (
        <>
            <label htmlFor={name}>
                {label}
                {required && <span className='text-danger'>*</span>}
            </label>
            <Field className='form-control' as="select" name={name}>
                <option value=''>Select one</option>

                {items && items.map(item =>
                    <option key={item} value={item}>{item}</option>)}
            </Field>
            <br />
        </>
    );
};
