
import utilStyles from '../../../styles/utils.module.css'
import Link from 'next/link'
import Date from '../../../components/date'
import { schoolData } from '../store/types'
import Empty from '../../../components/empty'

export default function Schools({
    allTrainingSchools
}: {
    allTrainingSchools: schoolData[]
}) {
    const title = 'Training Schools'
    const columns = 5

    return (
        <>
            <table className="table">
                <thead className={utilStyles.sticky}>
                    <tr>
                        <td colSpan={columns}><b>{title}</b></td>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Principal</th>
                        <th scope="col">Created on</th>
                        <th scope="col"></th>

                    </tr>
                </thead>
                <tbody>
                    {allTrainingSchools.map(({ name, principal, createdAt, id }, index) => (
                        <tr key={id}>
                            <td>{index + 1}</td>
                            <td>  <a>{name}</a>
                            </td>
                            <td> {principal}
                            </td>
                            <td className={utilStyles.lightText}>
                                <Date dateString={createdAt} />
                            </td>
                            <td className={utilStyles.lightText}>
                                <Link href={`/trainingSchools/view/${id}`}><a className='btn btn-sm btn-outline-primary' >View</a></Link>
                            </td>
                        </tr>
                    ))}

                </tbody>
                {!allTrainingSchools.length && <Empty columns={columns} label={title}/>}
            </table>
        </>
    )
}
