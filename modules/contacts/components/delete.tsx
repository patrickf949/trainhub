
import Link from 'next/link';
import utilStyles from '../../../styles/utils.module.css'
import {  contactObj } from '../store/types';

export default function Contact({
    contactData,
    handleDelete
}: { contactData: contactObj, handleDelete: () => void }) {
    const { id,phoneNumber } = contactData;


    return (
        <div className={utilStyles.sticky}>
            <h4>Are you sure you want to delete the contact:&nbsp;
                <b>{phoneNumber}</b>?
            </h4>
            <Link href={`/contacts/view/${id}`}><button className='btn btn-sm btn-outline-danger' type="button">Cancel</button></Link>
            <button onClick={async()=>await handleDelete()} className='btn btn-sm btn-danger float-end'>Delete</button>
            <hr />
        </div>
    )
}
