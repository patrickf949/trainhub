import Layout from '../../components/layout'
import Link from 'next/link'
import Head from 'next/head'
import { useReducer } from 'react'
import { toast } from 'react-toastify';
import { editReducer } from '../../modules/courses/store/reducer'
import { editInitialState } from '../../modules/courses/store/initialState'
import Edit from '../../modules/courses/components/edit'
import { editCourseData } from '../../modules/courses/store/types'
import { createCourse } from '../../modules/courses/lib/courses'
import { useRouter } from 'next/router'
import { nonNullValues } from '../../modules/trainingSchools/utils';


export default function CreateCourse() {
    const router = useRouter();
    const [state, dispatch] = useReducer(editReducer,editInitialState);
    const handleSubmit = async (values:editCourseData) => {
        dispatch({ type: "editCourseLoading", payload: true });
        await createCourse(nonNullValues(values)).then(() => {
            toast.success("Successfully created");
            dispatch({ type: "editCourseLoading", payload: false });
            router.push('/courses');
        }).catch(error => {
            dispatch({ type: "editCourseLoading", payload: false });
            toast.error("Failed to create Course");
            toast.error(error.message);
            toast.error(error.response.data.message);
        });
    }
    const {course,isLoading}=state

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
                 course={course}
                 isProcessing={isLoading}
                 
                 ></Edit>
            </section>
            </article>
        </Layout>
    )
}