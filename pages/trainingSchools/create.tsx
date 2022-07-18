import Layout from '../../components/layout'
import Link from 'next/link'
import Head from 'next/head'
import { useReducer } from 'react'
import { toast } from 'react-toastify';
import { editReducer } from '../../modules/trainingSchools/store/reducer'
import { editInitialState } from '../../modules/trainingSchools/store/initialState'
import Edit from '../../modules/trainingSchools/components/edit'
import { schoolEditObj } from '../../modules/trainingSchools/store/types'
import { createTrainingSchool } from '../../modules/trainingSchools/lib/schools'
import { useRouter } from 'next/router'


export default function CreateSchool() {
    const router = useRouter();
    const [state, dispatch] = useReducer(editReducer,editInitialState);
    const handleSubmit = async (values:schoolEditObj) => {
        dispatch({ type: "editSchoolLoadingUpdate", payload: true });
        await createTrainingSchool(values).then(() => {
            toast.success("Successfully created");
            dispatch({ type: "editSchoolLoadingUpdate", payload: false });
            router.push('/trainingSchools');
        }).catch(error => {
            toast.error("Failed to create Contact");
            toast.error(error.message);
            dispatch({ type: "editSchoolLoadingUpdate", payload: false });
        });
    }
    const {school,isLoading}=state

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
                <Edit 
                 handleSubmit={handleSubmit}
                 school={school}
                 isProcessing={isLoading}
                 
                 ></Edit>
            </section>
            </article>
        </Layout>
    )
}