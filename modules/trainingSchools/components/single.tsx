
import utilStyles from '../../../styles/utils.module.css'
import Link from 'next/link'
import Date from '../../../components/date'
import Contact from './add';
import { GetStaticProps } from 'next'
import { getContact } from '../lib/contacts';

export default function getAllContacts({
    contact
}:{
    contact:{
        phoneNumber:string,
        createdAt:string,
        id:string,
    }
}) {
    const {phoneNumber,createdAt}=contact;
    
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">CreatedAt</th>
                    </tr>
                </thead>
                <tbody>

                    <tr >
                        <td></td>
                        <td>  <a>{phoneNumber}</a>
                        </td>
                        <td className={utilStyles.lightText}>
                            <Date dateString={createdAt} />
                        </td>
                    </tr>


                </tbody>
            </table>


        </>
    )
}