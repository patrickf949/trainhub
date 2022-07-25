import { Field } from "formik";
import { toast } from 'react-toastify';
import { useQuery } from 'react-query'
import Select from "react-select";

export default function Selector(props) {
    const { getRequest, name, label,placeholder, required } = props;
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

    const options = data && data.data.map((item) => { return { label: item.name, value: item.id } })

    return (
        <>
            <label htmlFor={name}>
                {label}
                {required && <span className='text-danger'>*</span>}
            </label>
            <Field className='form-control' name={name}>
                {({
                    form,
                    field,
                    meta,
                }) => (
                    <>
                        <Select
                            value={options ? options.filter(each => field.value.includes(each.value))[0] : null}
                            options={options}
                            isLoading={isLoading}
                            placeholder={placeholder}
                            onChange={option =>
                                form.setFieldValue(field.name, option.value)
                            }
                        />
                        {meta.error && (
                            <div className="text-danger">{meta.error}</div>
                        )}
                    </>)}
            </Field>
            <br />
        </>
    );
};