import Layout from '../../../components/layout'
import Head from 'next/head'
import { toast } from 'react-toastify';
import { useQuery } from 'react-query'
import { getContact } from '../../../modules/contacts/lib/contacts'
import Loader from '../../../components/loader'
import Link from 'next/link'
import SingleContact from '../../../modules/contacts/components/single';

export default function Contact({ contactId }: { contactId: string }) {

  const { isLoading, data, } = useQuery("singleContactData", async () =>
    await getContact(contactId)
      .then((res) => {
        toast.success('Contact Loaded');
        return res.data.data;
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

        <p> <Link href="/">Menu</Link>&nbsp;&gt;&nbsp;<Link href="/contacts">Contacts</Link></p>
        {isLoading && <Loader isProcessing={isLoading}></Loader>}
        {data && !isLoading && <><div className='row'><div className="col">
          <Link href={`/contacts/update/${contactId}`}>
            <a className='btn btn-sm btn-outline-primary'>Update</a></Link>
        </div>
          <div className="col">
            <Link href={`/contacts/delete/${contactId}`}>
              <a className='btn btn-sm btn-outline-danger float-end'>Delete</a></Link>
          </div>
        </div><hr/><SingleContact contact={data} /></>
        }
      </article>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      contactId: params.id
    }
  }
}