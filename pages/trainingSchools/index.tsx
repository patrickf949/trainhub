import Layout from '../../components/layout'
import Link from 'next/link'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'


export default function trainingSchool() {
    return (
        <Layout>
            <Head>
                <title>Training Schools</title>
            </Head>
            <article>
                <h4>Training Schools</h4>
                <Link href={`/trainingSchools/create`}>
                    <button className='btn btn-outline-primary'>New Training School</button></Link>
            </article>
        </Layout>
    )
}