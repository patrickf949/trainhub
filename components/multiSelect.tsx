import { Field } from "formik";
import { toast } from 'react-toastify';
import { useQuery } from 'react-query'
import Select from "react-select";

export default function MultiSelector(props) {
    const {
        getRequest,
        name,
        label,
        field,
        required
    } = props;

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

    const options = data && data.data.map((item) => { return { label: item[field], value: item.id } })
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
                {({ form, field, meta }) =>
                    <>
                        <Select
                            value={options ? options.filter(each => field.value.includes(each.value)) : []}
                            isMulti={true}
                            options={options}
                            isLoading={isLoading}
                            onChange={option =>
                                form.setFieldValue(field.name, option.map(each => each.value))
                            }
                        />
                        {meta.touched && meta.error && <div className="text-danger">
                            {meta.error}
                        </div>}
                    </>
                }
            </Field>
            <br />
        </>
    );
};