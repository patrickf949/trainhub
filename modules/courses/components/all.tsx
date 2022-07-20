
import utilStyles from '../../../styles/utils.module.css'
import Link from 'next/link'
import Date from '../../../components/date'
import { allCoursesData } from '../store/types'
import Empty from '../../../components/empty'

export default function Courses({
    allCourses
}: {
    allCourses: allCoursesData
}) {
    const title = 'Courses'
    const columns = 7

    return (
        <table className="table">
        <thead className={utilStyles.sticky}>
            <tr>
                <th colSpan={7}><b>Courses</b></th>

            </tr>
            <tr>
                <th>#</th>
                <th scope="col">Name</th>
                <th scope="col">Cadre</th>
                <th scope="col">Qualification</th>
                <th scope="col">Duration</th>
                <th scope="col">Created on</th>
                <th scope="col"></th>

            </tr>
        </thead>
        <tbody>
            {allCourses?.map(({ name, cadre, professionalQualification, durationYears, createdAt, id }, index) => (
                <tr key={name}>
                    <td>{index + 1}</td>
                    <td>  <a>{name}</a>
                    </td>
                    <td> {cadre}
                    </td>
                    <td> {professionalQualification}
                    </td>
                    <td> {durationYears}
                    </td>

                    <td className={utilStyles.lightText}>
                        <Date dateString={createdAt} />
                    </td>
                    <td className={utilStyles.lightText}>
                        <Link href={`/courses`}><a className='btn btn-sm btn-outline-primary float-end' >View</a></Link>
                    </td>
                </tr>
            ))}

        </tbody>
        {!allCourses.length && <Empty columns={columns} label={title}/>}
    </table>
    )
}
