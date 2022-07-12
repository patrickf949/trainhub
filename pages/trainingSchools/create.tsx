import Layout from '../../components/layout'
import Link from 'next/link'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'


export default function Post() {
    return (
        <Layout>
            <Head>
                <title>Add Training School</title>
            </Head>
            <article>
                <h4>Add Training School</h4>
                <Link href={`/trainingSchools`}>
                    <button className='btn btn-outline-primary'>Submit School</button></Link>
            </article>
        </Layout>
    )
}