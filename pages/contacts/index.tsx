import Layout from '../../components/layout'
import Link from 'next/link'
import Head from 'next/head'
import Date from '../../components/date'
import { useQuery } from 'react-query'
import { getAllContacts } from '../../modules/contacts/lib/contacts'
import Loader from '../../components/loader'
import Contacts from '../../modules/contacts/components/all'
import { toast } from 'react-toastify';


export default function Contact() {
    const { isLoading, data,  } = useQuery("contactData", async () =>
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
                <h4>Contacts</h4>
                <Link href={`/contacts/create`}>
                    <button className='btn btn-sm btn-outline-primary'>New Contact</button></Link>

            </article>
            <section>
                {data && <Contacts allContacts={data.data}></Contacts>}
                {isLoading && <Loader isLoading={isLoading}></Loader>}
            </section>
        </Layout>
    )
}
