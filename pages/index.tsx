import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import { useAuth } from '../modules/auth/auth'

export default function Home({
  menuItems
}: {
  menuItems: {
    name: string
    route: string
  }[]
}) {
  const { user, login, } = useAuth();

  return (

      <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          This is a management portal for training institutions and their courses
        </p>
      </section>
       <section className={utilStyles.headingMd}>
       {!user &&<button onClick={login} className='btn btn-sm btn-outline-primary'>
          Click to Access
        </button>}
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      {user &&<><h2 className={utilStyles.headingLg}>Menu</h2>
        <ul className={utilStyles.list}>
          {menuItems.map(({ name, route, }) => (
            <li className={utilStyles.listItem} key={name}>
              <Link href={route}>
                <a>{name}</a>
              </Link>
              <br />
            </li>
          ))}
        </ul></>}
      </section>
    </Layout>

  )
}

export const getStaticProps: GetStaticProps = async () => {
  const menuItems: Array<Object> = [
    {
      name: 'Training Schools',
      route: '/trainingSchools'
    },
    {
      name: 'Contacts',
      route: '/contacts',
    },
    
  ]
  return {
    props: {
      menuItems
    }
  }
}