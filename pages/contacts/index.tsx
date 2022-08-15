import Layout from '../../components/layout'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { getAllContacts } from '../../modules/contacts/lib/contacts'
import Loader from '../../components/loader'
import Contacts from '../../modules/contacts/components/all'
import { toast } from 'react-toastify';
import Heading from '../../components/header'


export default function Contact() {
    const { isLoading, data, } = useQuery("contactData", async () =>
        await getAllContacts()
            .then((res) => {
                toast.success('Contacts Loaded');
                return res.data;
            })
            .catch((error) => {
                toast.error("Failed");
                toast.error(error.message);
            })
    );

    return (
        <Layout>
            <Head>
                <title>Contacts</title>
            </Head>
            <article>
                <Heading
                    name="Contacts"
                    link='/contacts/create'
                    button="Add Contact"
                />
            </article>
            <section>
                {data && <Contacts allContacts={data.data}></Contacts>}
                {isLoading && <Loader isLoading={isLoading}></Loader>}
            </section>
        </Layout>
    )
}
