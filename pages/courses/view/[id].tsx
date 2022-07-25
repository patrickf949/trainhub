import Layout from '../../../components/layout'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify';
import { reducer } from "../../../modules/courses/store/reducer"
import { initialState } from '../../../modules/courses/store/initialState'
import { useReducer } from 'react'
import Loader from '../../../components/loader'
import Link from 'next/link'
import Course from '../../../modules/courses/components/single';
import { getCourse } from '../../../modules/courses/lib/courses';

export default function SingleCourse({courseId}:{courseId:string}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { course,isLoading } = state

    useQuery("singleCourseData", async () => {

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

    return (
        <Layout>
            <Head>
                <title>Course</title>
            </Head>
            <article>
                <p> <Link href="/">Menu</Link>&nbsp;&gt;&nbsp;<Link href="/courses">Courses</Link></p>
                {course.name && !isLoading && <><div className='row'>
                    <div className="col">
                        <Link href={`/courses/update/${courseId}`}>
                            <a className='btn btn-sm btn-outline-primary'>Update</a></Link>
                    </div>
                    <div className="col">
                        <Link href={`/courses/delete/${courseId}`}>
                            <a className='btn btn-sm btn-outline-danger float-end'>Delete</a></Link>
                    </div>
                </div><Course course={course}></Course></>}
                <Loader isProcessing={isLoading}></Loader>
            </article>
        </Layout>
    )
}
export async function getServerSideProps({ params }) {
    return {
      props: {
        courseId:params.id
      }
    }
  }