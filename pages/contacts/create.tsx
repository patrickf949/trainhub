import Layout from '../../components/layout'
import Link from 'next/link'
import Head from 'next/head'
import Contact from '../../modules/contacts/components/add'
import { contactObj } from '../../types/contacts'
import { useEffect, useReducer, useState } from 'react'
import { useQuery } from 'react-query'
import { createContact } from '../../modules/contacts/lib/contacts'
import { toast } from 'react-toastify';
import { reducer } from "../../modules/contacts/store/reducer"
import { initialState } from '../../modules/contacts/store/initialState'
import { useRouter } from 'next/router'



export default function CreateContact() {

    const router = useRouter();
    const [state, dispatch] = useReducer(reducer,initialState);


    const handleSubmit = (values, { setSubmitting, setFieldError, setStatus, isProcessing }) => {
        dispatch({ type: "ContactLoadingChange", payload: true });
        createContact(values).then(() => {
            toast.success("Successfully created");
            dispatch({ type: "ContactLoadingChange", payload: false });
            router.push('/contacts');
        }).catch(error => {
            toast.error("Failed to create Contact");
            toast.error(error.message);
            dispatch({ type: "ContactLoadingChange", payload: false });
        });
    }
    const { contact, isLoading } = state;
    return (

        <Layout>
            <Head>
                <title>Contacts</title>
            </Head>
            <article>
                <Link href={`/contacts`}><h4>Contacts</h4></Link>
                <Contact
                    contact={contact}
                    handleSubmit={handleSubmit}

                    isProcessing={isLoading}
                >
                </Contact>
            </article>
        </Layout>
    )
}
