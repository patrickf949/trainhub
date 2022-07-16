
import utilStyles from '../../../styles/utils.module.css'
import Link from 'next/link'
import Date from '../../../components/date'

export default function Contacts({
    allContacts
}:{
    allContacts:{
        phoneNumber:string,
        createdAt:string,
        id:string,
    }[]
}) {
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
                    {allContacts.map(({ phoneNumber, createdAt, id },index) => (
                        <tr key={phoneNumber}>
                                <td>{index+1}</td>
                                <td>  <a>{phoneNumber}</a>
                                </td>
                                <td className={utilStyles.lightText}>
                                    <Date dateString={createdAt} />
                                </td>
                                <td className={utilStyles.lightText}>
                                    <Link href={`contacts/view/${id}`}><a className='btn btn-sm btn-outline-primary' >View</a></Link>
                                </td>
                        </tr>
                    ))}

                </tbody>
            </table>


        </>
    )
}