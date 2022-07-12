import Layout from '../../components/layout'
import Link from 'next/link'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'


export default function Post() {
    return (
        <Layout>
            <Head>
                <title>Contacts</title>
            </Head>
            <article>
                <h4>Contacts</h4>
                <Link href={`/contacts/create`}>
                    <button className='btn btn-outline-primary'>New Contact</button></Link>
            </article>
        </Layout>
    )
}
