import Layout from '../../components/layout'
import Link from 'next/link'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { useReducer } from 'react'
import { reducer } from '../../modules/trainingSchools/store/reducer'
import { initialState } from '../../modules/trainingSchools/store/initialState'
import Edit from '../../modules/trainingSchools/components/edit'


export default function CreateSchool() {
    const [state, dispatch] = useReducer(reducer,initialState);

    return (
        <Layout>
            <Head>
                <title>Add Training School</title>
            </Head>
            <article>
            <p> <Link href="/">Menu</Link>&nbsp;&gt;&nbsp;
            <Link href="/trainingSchools">Training Schools</Link>
            &nbsp;&gt;&nbsp;
            <b>Add Training School</b>
            </p>
            <section>
                <Edit></Edit>
            </section>
            </article>
        </Layout>
    )
}