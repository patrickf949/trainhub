
import utilStyles from '../../../styles/utils.module.css'
import Link from 'next/link'
import Date from '../../../components/date'
import { contactObj } from '../store/types'
import Empty from '../../../components/empty'

export default function Contacts({
    allContacts
}:{
    allContacts:contactObj[]
}) {
    const title = 'Contacts'
    const columns = 4
    return (
        <>
            <table className="table">
                <thead className={utilStyles.sticky}>
                    <tr>
                        <td colSpan={columns}><b>{title}</b></td>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Created on</th>
                        <th scope="col"></th>
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
                                    <Link href={`/contacts/view/${id}`}><a className='btn btn-sm btn-outline-primary float-end' >View</a></Link>
                                </td>
                        </tr>
                    ))}

                </tbody>
                {!allContacts.length && <Empty columns={columns} label={title}/>}
            </table>


        </>
    )
}