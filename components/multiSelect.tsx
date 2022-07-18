import { Field } from "formik";
import { toast } from 'react-toastify';
import { useQuery } from 'react-query'
import Loader from './loader'

export default function MultiSelector(props) {
    const { getRequest, name, label, field, items, required } = props;
    
    const { isLoading, data, } = useQuery(`get${name}`, async () =>
        await getRequest()
            .then((res) => {
                toast.success(`${name} Loaded`);
                return res.data;
            })
            .catch((error) => {
                toast.error(`Failed to load ${name} `);
                toast.error(error.message);
            }))

    return (
        <>
            <label htmlFor={name}>
                {label}
                {required && <span className='text-danger'>*</span>}
            </label>
            <Field
                component="select"
                id={name}
                className="form-control"
                name={name}
                multiple={true}
            >

                {data && data.data.map(item =>
                    <option key={item.id} value={item.id}>{item[field]}</option>)}

            </Field>
            <Loader isProcessing={isLoading}></Loader>
            <br/>
        </>
    );
};