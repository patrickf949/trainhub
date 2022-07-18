
import utilStyles from '../../../styles/utils.module.css'
import Link from 'next/link'
import Date from '../../../components/date'
import { schoolData } from '../store/types'

export default function Schools({
    allTrainingSchools
}: {
    allTrainingSchools: schoolData[]
}) {
    return (
        <>
            <table className="table">
                <thead className={utilStyles.sticky}>
                    <tr>
                        <td colSpan={4}><b>Training Schools</b></td>
                    </tr>
                    <tr>
                        <th>#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Principal</th>
                        <th scope="col">CreatedAt</th>
                        <th scope="col"></th>

                    </tr>
                </thead>
                <tbody>
                    {allTrainingSchools.map(({ name, principal, createdAt, id }, index) => (
                        <tr key={name}>
                            <td>{index + 1}</td>
                            <td>  <a>{name}</a>
                            </td>
                            <td> {principal}
                            </td>
                            <td className={utilStyles.lightText}>
                                <Date dateString={createdAt} />
                            </td>
                            <td className={utilStyles.lightText}>
                                <Link href={`trainingSchools/view/${id}`}><a className='btn btn-sm btn-outline-primary' >View</a></Link>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </>
    )
}
