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
            {({
                    field,
                    meta,
                }) => (
                    <>
                        <select className='form-control' {...field}>
                            <option value={null}>Select one</option>

                            {items && items.map(item =>

                                <option key={item} value={item}>{item}</option>)}
                        </select>
                        {meta.touched && meta.error && (
                            <div className="text-danger">{meta.error}</div>
                        )}
                    </>)}
            </Field>
            <br />
        </>
    );
}
