
import Link from 'next/link';
import utilStyles from '../../../styles/utils.module.css'
import { schoolData } from '../store/types';

export default function School({
    schoolData,
    handleDelete
}: { schoolData: schoolData, handleDelete: () => void }) {
    const { id,name } = schoolData;


    return (
        <div className={utilStyles.sticky}>
            <h4>Are you sure you want to delete the school:&nbsp;
                <b>{name}</b>?
            </h4>
            <Link href={`/trainingSchools/${id}`}><button className='btn btn-sm btn-outline-danger' type="button">Cancel</button></Link>
            <button onClick={async()=>await handleDelete()} className='btn btn-sm btn-danger '>Delete</button>
            <br />
        </div>
    )
}
