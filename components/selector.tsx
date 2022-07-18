import { Field } from "formik";
import { toast } from 'react-toastify';
import { useQuery } from 'react-query'
import Loader from './loader'

export default function Selector(props) {
    const { getRequest, name, label, value, items, required } = props;
    const { isLoading, data, } = useQuery(`get${name}`, async () =>
        await getRequest()
            .then((res) => {
                toast.success(`${name} Loaded`);
                return res.data;
            })
            .catch((error) => {
                toast.error(`Failed to load ${name}`);
                toast.error(error.message);
            }
            ))

    return (
        <>
            <label htmlFor={name}>
                {label}
                {required && <span className='text-danger'>*</span>}
            </label>
            <Field className='form-control' name={name}>
                {({
                    field,
                    values,
                    meta,
                }) => (
                    <>
                        <select className='form-control' {...field} {...values}>
                            <option value={null}>Select one</option>

                            {data && data.data.map(item =>

                                <option key={item.id} value={item.id}>{item.name}</option>)}
                        </select>
                        {meta.touched && meta.error && (
                            <div className="text-danger">{meta.error}</div>
                        )}
                    </>)}
            </Field>
            <Loader isProcessing={isLoading}></Loader>
            <br />
        </>
    );
};