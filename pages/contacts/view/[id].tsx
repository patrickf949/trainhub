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

export default function Post() {
    
    const router = useRouter()
    console.log(router.query.id);
    const { isLoading, data,  } = useQuery("singleContactData", () =>
        getContact(router.query.id)
            .then((res) => {
                toast.success('Contacts Loaded');
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
        <title>Training Hub Contact</title>
      </Head>
      <article>
        {data && <><h5>{data.data.phoneNumber}</h5>
        <Date dateString={data.data.createdAt}></Date>
        </>}
      {isLoading && <Loader isLoading={isLoading}></Loader>}
        
      </article>
    </Layout>
  )
}

