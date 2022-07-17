import Layout from '../../../components/layout'
import Head from 'next/head'
import Date from '../../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import { toast } from 'react-toastify';
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { getContact } from '../../../modules/contacts/lib/contacts'
import Loader from '../../../components/loader'
import Link from 'next/link'

export default function Post() {
    
    const router = useRouter()
    const { isLoading, data,  } = useQuery("singleContactData", async () =>
        await getContact(router.query.id)
            .then((res) => {
                toast.success('Contact Loaded');
                return res.data;
            })
            .catch((error) => {
                toast.error("Failed to load Contact");
                toast.error(error.message);
            })
    );


  return (

    <Layout>
      <Head>
        <title>Training Hub Contact</title>
      </Head>
      <article>
        <p><Link href="/contacts">← Back to Contacts</Link></p>
        {data && <><h5>{data.data.phoneNumber}</h5>
          <Date dateString={data.data.createdAt}></Date>
        </>}
        {isLoading && <Loader isLoading={isLoading}></Loader>}

      </article>
    </Layout>
  )
}

