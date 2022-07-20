import Layout from '../../../components/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify';
import { reducer } from "../../../modules/courses/store/reducer"
import { initialState } from '../../../modules/courses/store/initialState'
import { useEffect, useReducer } from 'react'
import Loader from '../../../components/loader'
import Link from 'next/link'
import Course from '../../../modules/courses/components/single';
import { getCourse } from '../../../modules/courses/lib/courses';

export default function SingleCourse() {
    const router = useRouter();
    
      
    const [state, dispatch] = useReducer(reducer, initialState);
    const { course,isLoading } = state
    const id = useEffect(()=>{
        
    },[router.query.id])

    useQuery("singleCourseData", async () => {

        dispatch({ type: "CourseLoading", payload: true });
        
            await getCourse(router.query.id)
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
                {course.id && <><div className='row'>
                    <div className="col">
                        <Link href={`/courses/update/${course.id}`}>
                            <a className='btn btn-sm btn-outline-primary'>Update</a></Link>
                    </div>
                    <div className="col">
                        <Link href={`/courses/delete/${course.id}`}>
                            <a className='btn btn-sm btn-outline-danger float-end'>Delete</a></Link>
                    </div>
                </div><Course course={course}></Course></>}
                <Loader isProcessing={isLoading}></Loader>
            </article>
        </Layout>
    )
}
