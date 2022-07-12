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
                <Link href={`/contacts`}><h4>Contacts</h4></Link>
                <Link href={`/contacts`}>
                    <button>Add Contact</button></Link>
            </article>
        </Layout>
    )
}
