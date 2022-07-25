import Layout from '../../../components/layout'
import Head from 'next/head'
import utilStyles from '../../../styles/utils.module.css'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify';
import { deleteCourse, getCourse } from '../../../modules/courses/lib/courses'
import { reducer } from "../../../modules/courses/store/reducer"
import { initialState } from '../../../modules/courses/store/initialState'
import { useReducer } from 'react'
import Course from '../../../modules/courses/components/single'
import Loader from '../../../components/loader'
import Link from 'next/link'
import DeleteCourse from '../../../modules/courses/components/delete'

export default function DeleteTrainingSchool({ courseId }) {
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);


    useQuery("singleSchoolData", async () => {
        dispatch({ type: "CourseLoading", payload: true });

        await getCourse(courseId)
            .then((res) => {
                toast.success('Course loaded');
                dispatch({ type: "CourseLoading", payload: false });
                dispatch({ type: "Course", payload: res.data.data });
            })
            .catch((error) => {
                toast.error("Failed to load Course");
                toast.error(error.message);
                toast.error(error.response.data.message);
                dispatch({ type: "CourseLoading", payload: false });
            })
    });
    const handleDelete = async () => {
        dispatch({ type: "CourseLoading", payload: true });
        await deleteCourse(courseId)
            .then((res) => {
                toast.success('Course Deleted!');
                dispatch({ type: "CourseLoading", payload: false });
                router.push('/courses');
            })
            .catch((error) => {
                toast.error("Failed to Delete Course!");
                toast.error(error.message);
                toast.error(error.response.data.message);
                dispatch({ type: "CourseLoading", payload: false });
            })
    }
    const { isLoading, course } = state

    return (
        <Layout>
            <Head>
                <title>{course.name}</title>
            </Head>
            <article>
                <p> <Link href="/">Menu</Link>&nbsp;&gt;&nbsp;<Link href="/courses">Courses</Link></p>
                {!isLoading && <><DeleteCourse courseData={course} handleDelete={handleDelete} ></DeleteCourse>
                    <div className={utilStyles.halfPage}>


                        <Course course={course} /></div></>}
                <Loader isProcessing={isLoading}></Loader>

            </article>
        </Layout>
    )
}

export async function getServerSideProps({ params }) {
    return {
        props: {
            courseId: params.id
        }
    }
}