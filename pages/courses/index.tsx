import Layout from '../../components/layout'
import Head from 'next/head'
import { useQuery } from 'react-query'
import Loader from '../../components/loader'
import { toast } from 'react-toastify';
import { getAllCourses } from '../../modules/courses/lib/courses'
import Courses from '../../modules/courses/components/all'
import Heading from '../../components/header'

export default function AllCourses() {
    const { isLoading, data, } = useQuery("courseData", async () =>
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
            <Heading
                    name="Courses"
                    link='/courses/create'
                    button="Add Course"
                />
            </article>
            <section>
                {data && <Courses allCourses={data.data} />}
                {isLoading && <Loader isLoading={isLoading}></Loader>}
            </section>
        </Layout>
    )
}
