import Layout from '@/components/layout'
import { getAllPostIds, getPostData } from '@/lib/posts'
import Head from 'next/head'
import Date from '@/components/date'
import utilStyles from '@/styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import schoolData from '../../../types/trainingSchool'

export default function TrainingSchool({
    schoolData
}: schoolData) {
    return (
        <Layout>
            <Head>
                <title>{schoolData.name}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{schoolData.principal}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={schoolData.createdAt} />
                </div>
                <div>

                </div>
            </article>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params.id as string)
    return {
        props: {
            postData
        }
    }
}