import Layout from '../../components/layout'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { getAllTrainingSchools } from '../../modules/trainingSchools/lib/schools'
import Loader from '../../components/loader'
import Schools from '../../modules/trainingSchools/components/all'
import { toast } from 'react-toastify';
import Heading from '../../components/header'

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
                <Heading
                    name="Training Schools"
                    link='/trainingSchools/create'
                    button="Add School"
                />
            </article>
            <section>
                {data && <Schools allTrainingSchools={data.data}></Schools>}
                {isLoading && <Loader isLoading={isLoading}></Loader>}
            </section>
        </Layout>
    )
}
