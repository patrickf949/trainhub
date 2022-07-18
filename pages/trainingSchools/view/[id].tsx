import Layout from '../../../components/layout'
import Head from 'next/head'
import Date from '../../../components/date'
import utilStyles from '../../../styles/utils.module.css'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify';
import { getTrainingSchool } from '../../../modules/trainingSchools/lib/schools'
import { reducer } from "../../../modules/trainingSchools/store/reducer"
import { initialState } from '../../../modules/trainingSchools/store/initialState'
import { useReducer } from 'react'
import School from '../../../modules/trainingSchools/components/single'
import Loader from '../../../components/loader'
import Link from 'next/link'

export default function TrainingSchool() {
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { isLoading, school } = state

    const load = useQuery("singleSchoolData", async () => {
        dispatch({ type: "SchoolLoadingUpdate", payload: true });
        console.log(router.query.id);
        await getTrainingSchool(router.query.id)
            .then((res) => {
                toast.success('School Loaded');
                dispatch({ type: "SchoolLoadingUpdate", payload: false });
                dispatch({ type: "SchoolUpdate", payload: res.data.data });
                return res.data;
            })
            .catch((error) => {
                toast.error("Failed to load school");
                toast.error(error.message);
                dispatch({ type: "SchoolLoadingUpdate", payload: false });
            })
    });

    return (
        <Layout>
            <Head>
                <title>{school.name}</title>
            </Head>
            <article>
            <p> <Link href="/">Menu</Link>&nbsp;>&nbsp;<Link href="/trainingSchools">Schools</Link></p>
                <School schoolData={school}></School>
                <Loader isProcessing={isLoading}></Loader>
            </article>
        </Layout>
    )
}
