import Layout from '../../../components/layout'
import Link from 'next/link'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { useReducer } from 'react'
import { toast } from 'react-toastify';
import { reducer } from '../../../modules/contacts/store/reducer'
import { initialState } from '../../../modules/contacts/store/initialState'
import Edit from '../../../modules/contacts/components/add'
import { editContactObj } from '../../../modules/contacts/store/types'
import { editContact, getContact } from '../../../modules/contacts/lib/contacts'
import { useRouter } from 'next/router'
import { flattenArray, nonNullValues } from '../../../modules/trainingSchools/utils'
import Loader from '../../../components/loader'


export default function UpdateContact({ contactId }) {
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);

    useQuery("editSingleContactData", async () => {
        dispatch({ type: "ContactLoadingChange", payload: true });
        await getContact(contactId)
            .then((res) => {
                toast.success('Contact Loaded');
                dispatch({ type: "ContactLoadingChange", payload: false });
                let editcontact = {trainingschools:[],...res.data.data};
                editcontact.trainingschools = flattenArray(editcontact.trainingschools);
                delete editcontact['id'];
                dispatch({ type: "ContactUpdate", payload: editcontact });
                return res.data;
            })
            .catch((error) => {
                dispatch({ type: "ContactLoadingChange", payload: false });
                toast.error("Failed to load Contact");
                toast.error(error.message);
                toast.error(error.response.data.message);

            })
    });

    const handleSubmit = async (values: editContactObj) => {
        dispatch({
            type: "stateUpdate", payload:
                { isLoading: true, contact: values }
        });
        await editContact(nonNullValues(values), contactId).then(() => {
            toast.success("Successfully updated");
            dispatch({ type: "ContactLoadingChange", payload: false });
            router.push('/contacts');
        }).catch(error => {
            dispatch({ type: "ContactLoadingChange", payload: false });
            toast.error("Failed to update");
            toast.error(error.message);
            toast.error(error.response.data.message);
        });
    }
    const { isLoading, contact } = state;

    return (
        <Layout>
            <Head>
                <title>Edit Contact</title>
            </Head>
            <article>
                <p> <Link href="/">Menu</Link>&nbsp;&gt;&nbsp;
                    <Link href="/contacts">Contacts</Link>
                    &nbsp;&gt;&nbsp;
                    <b>Edit Contact</b>
                </p>
                <section>
                    {!isLoading && contact && contact.phoneNumber.length>1 && <Edit
                        handleSubmit={handleSubmit}
                        contact={contact}
                        isProcessing={isLoading}

                    ></Edit>}
                    {isLoading && <Loader isProcessing={isLoading}/>}
                </section>
            </article>
        </Layout>
    )
}
export async function getServerSideProps({ params }) {
    return {
        props: {
            contactId: params.id
        }
    }
}
