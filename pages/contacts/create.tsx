import Layout from '../../components/layout'
import Link from 'next/link'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import Contact from '../../modules/contacts/components/add'
import { contactObj } from '../../types/contacts'
import { useState } from 'react'



export default function CreateContact() {
    const contact: contactObj = { phoneNumber: "0413",id:null,createdAt:null };
    let isProcessing=false;
    const handleSubmit=(values, {setSubmitting,  setFieldError, setStatus})=>{
        console.log(values);
        isProcessing=this.useState(true);
    }
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
                    isProcessing={isProcessing}
                >
                </Contact>
            </article>
        </Layout>
    )
}
