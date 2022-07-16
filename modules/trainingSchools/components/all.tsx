
import utilStyles from '../../../styles/utils.module.css'
import Link from 'next/link'
import Date from '../../../components/date'
import schoolData from '../store/types'

export default function Contacts({
    allTrainingSchools
}: {
    allTrainingSchools: schoolData[]
}) {
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th scope="col">Name</th>
                        <th scope="col">CreatedAt</th>
                    </tr>
                </thead>
                <tbody>
                    {allTrainingSchools.map(({ name, createdAt, id }, index) => (
                        <tr key={name}>
                            <td>{index + 1}</td>
                            <td>  <a>{name}</a>
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
