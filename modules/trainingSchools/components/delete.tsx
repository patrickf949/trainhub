
import utilStyles from '../../../styles/utils.module.css'
import Link from 'next/link'
import Date from '../../../components/date'
import { schoolData } from '../store/types';
import { useQuery } from 'react-query'

export default function School({
    schoolData,
    handleDelete
}: { schoolData: schoolData, handleDelete: () => void }) {
    const { id, name } = schoolData;


    return (
        <div className={utilStyles.stickyBottom}>
            <h4>Are you sure you want to delete this school&nbsp;
                <b>name</b>
            </h4>
            <button onClick={useQuery(`deleteSchool`, async () => await handleDelete()} className='btn btn-sm btn-danger'>Delete</button>

        </div>
    )
}
