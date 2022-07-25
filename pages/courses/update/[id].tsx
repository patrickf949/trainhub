import Layout from '../../../components/layout'
import Link from 'next/link'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { useReducer } from 'react'
import { toast } from 'react-toastify';
import { editReducer } from '../../../modules/courses/store/reducer'
import { editInitialState } from '../../../modules/courses/store/initialState'
import Edit from '../../../modules/courses/components/edit'
import { editCourseData } from '../../../modules/courses/store/types'
import { editCourse, getCourse } from '../../../modules/courses/lib/courses'
import { useRouter } from 'next/router'
import { flattenArray, nonNullValues } from '../../../modules/trainingSchools/utils'
import Loader from '../../../components/loader'


export default function UpdateCourse({ courseId }) {
    const router = useRouter();
    const [state, dispatch] = useReducer(editReducer, editInitialState);
    const { isLoading, course } = state;

    useQuery("editSingleCourseData", async () => {
        dispatch({ type: "editCourseLoading", payload: true });
        await getCourse(courseId)
            .then((res) => {
                toast.success('Course Loaded');
                dispatch({ type: "editCourseLoading", payload: false });
                let editcourse = res.data.data;
                editcourse.trainingschools = flattenArray(editcourse.trainingschools);
                delete editcourse['id'];
                dispatch({ type: "editCourse", payload: editcourse });
                return res.data;
            })
            .catch((error) => {
                dispatch({ type: "editCourseLoading", payload: false });
                toast.error("Failed to load Course");
                toast.error(error.message);
                toast.error(error.response.data.message);

            })
    });

    const handleSubmit = async (values: editCourseData) => {
        dispatch({
            type: "stateUpdate", payload:
                { isLoading: true, course: values }
        });
        await editCourse(nonNullValues(values), courseId).then(() => {
            toast.success("Successfully updated");
            dispatch({ type: "editCourseLoading", payload: false });
            router.push('/courses');
        }).catch(error => {
            dispatch({ type: "editCourseLoading", payload: false });
            toast.error("Failed to update");
            toast.error(error.message);
            toast.error(error.response.data.message);
        });
    }

    return (
        <Layout>
            <Head>
                <title>Edit Course</title>
            </Head>
            <article>
                <p> <Link href="/">Menu</Link>&nbsp;&gt;&nbsp;
                    <Link href="/courses">Courses</Link>
                    &nbsp;&gt;&nbsp;
                    <b>Edit Course</b>
                </p>
                <section>
                    {course.name.length > 1 && !isLoading && <Edit
                        handleSubmit={handleSubmit}
                        course={course}
                        isProcessing={isLoading}

                    ></Edit>}
                    <Loader isProcessing={isLoading}></Loader>
                </section>
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