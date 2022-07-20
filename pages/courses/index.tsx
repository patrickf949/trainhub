import Layout from '../../components/layout'
import Link from 'next/link'
import Head from 'next/head'
import { useQuery } from 'react-query'
import Loader from '../../components/loader'
import { toast } from 'react-toastify';
import { getAllCourses } from '../../modules/courses/lib/courses'
import Courses from '../../modules/courses/components/all'

export default function AllCourses() {
    const { isLoading, data,  } = useQuery("courseData", async () =>
        await getAllCourses()
            .then((res) => {
                toast.success('Courses Loaded');
                return res.data;
            })
            .catch((error) => {
                toast.error("Failed to load courses");
                toast.error(error.message);
            })
    );

    return (
        <Layout>
            <Head>
                <title>Courses</title>
            </Head>
            <article>
                <p> <Link href="/">Menu</Link>&nbsp;&gt;&nbsp;Courses</p>
                <Link href={`/courses`}>
                    <button className='btn btn-sm btn-outline-primary'>Add School</button></Link>

            </article>
            <section>
                {data && <Courses allCourses={data.data} />}
                {isLoading && <Loader isLoading={isLoading}></Loader>}
            </section>
        </Layout>
    )
}