import Layout from '../../../components/layout'
import Head from 'next/head'
import utilStyles from '../../../styles/utils.module.css'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify';
import { deleteContact, getContact } from '../../../modules/contacts/lib/contacts'
import { viewReducer } from "../../../modules/contacts/store/reducer"
import { editInitialState } from '../../../modules/contacts/store/initialState'
import { useReducer } from 'react'
import Contact from '../../../modules/contacts/components/single'
import Loader from '../../../components/loader'
import Link from 'next/link'
import DeleteContact from '../../../modules/contacts/components/delete'

export default function DeleteSingleContact({ contactId }) {
    const router = useRouter();
    const [state, dispatch] = useReducer(viewReducer, editInitialState);


    useQuery("singleContactData", async () => {
        dispatch({ type: "ContactLoadingChange", payload: true });

        await getContact(contactId)
            .then((res) => {
                toast.success('Course loaded');
                dispatch({ type: "ContactLoadingChange", payload: false });
                dispatch({ type: "ContactView", payload: res.data.data });
            })
            .catch((error) => {
                toast.error("Failed to load Course");
                toast.error(error.message);
                toast.error(error.response.data.message);
                dispatch({ type: "ContactLoadingChange", payload: false });
            })
    });
    const handleDelete = async () => {
        dispatch({ type: "ContactLoadingChange", payload: true });
        await deleteContact(contactId)
            .then(() => {
                toast.success('Course Deleted!');
                dispatch({ type: "ContactLoadingChange", payload: false });
                router.push('/courses');
            })
            .catch((error) => {
                toast.error("Failed to Delete Course!");
                toast.error(error.message);
                toast.error(error.response.data.message);
                dispatch({ type: "ContactLoadingChange", payload: false });
            })
    }
    const { isLoading, contact } = state

    return (
        <Layout>
            <Head>
                <title>{contact ? contact.phoneNumber : ''}&nbsp;| Training Hub </title>
            </Head>
            <article>
                <p> <Link href="/">Menu</Link>&nbsp;&gt;&nbsp;<Link href="/contacts">Contacts</Link></p>
                {!isLoading && contact && contact.phoneNumber.length > 1 && <>
                    <DeleteContact contactData={contact} handleDelete={handleDelete} />
                    <div className={utilStyles.halfPage}>


                        <Contact contact={contact} /></div></>}


            </article>
            <article>
                {isLoading && <Loader isProcessing={isLoading}></Loader>}
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