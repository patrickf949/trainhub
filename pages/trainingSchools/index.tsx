import Layout from '../../components/layout'
import Link from 'next/link'
import Head from 'next/head'
import Date from '../../components/date'
import { useQuery } from 'react-query'
import { getAllTrainingSchools } from '../../modules/trainingSchools/lib/schools'
import Loader from '../../components/loader'
import Schools from '../../modules/trainingSchools/components/all'
import { toast } from 'react-toastify';

export default function TrainingSchools() {
    const { isLoading, data, } = useQuery("schoolsData", async () =>
        await getAllTrainingSchools()
            .then((res) => {
                toast.success('Schools Loaded');
                return res.data;
            })
            .catch((error) => {
                toast.error("Failed");
                toast.error(error.message);
            })
    );

    return (
        <Layout>
            <Head>
                <title>Training Schools</title>
            </Head>
            <article>
                <p> <Link href="/">Menu</Link>&nbsp;&gt;&nbsp;Schools</p>
                <Link href={`/trainingSchools/create`}>
                    <button className='btn btn-sm btn-outline-primary'>Add School</button></Link>

            </article>
            <section>
                {data && <Schools allTrainingSchools={data.data}></Schools>}
                {isLoading && <Loader isLoading={isLoading}></Loader>}
            </section>
        </Layout>
    )
}
