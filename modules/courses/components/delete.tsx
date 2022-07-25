
import Link from 'next/link';
import utilStyles from '../../../styles/utils.module.css'
import { courseData } from '../store/types';

export default function DeleteCourse({
    courseData,
    handleDelete
}: { courseData: courseData, handleDelete: () => void }) {
    const { name } = courseData;


    return (
        <div className={utilStyles.sticky}>
            <h4>Are you sure you want to delete the course:&nbsp;
                <b>{name}</b>?
            </h4>
            <Link href={`/courses/view/${courseData.id}`}><button className='btn btn-sm btn-outline-primary'>Cancel</button></Link>
            <button onClick={async()=>await handleDelete()} className='btn btn-sm btn-danger float-end'>Delete</button>
            <hr />
        </div>
    )
}
