
import utilStyles from '../../../styles/utils.module.css'
import Link from 'next/link'
import Date from '../../../components/date'
import Contact from './add';
import { GetStaticProps } from 'next'
import { getTrainingSchool } from '../lib/schools';
import { schoolDataProps } from '../store/types';
import Contacts from '../../contacts/components/all';

export default function School({
    schoolData
}:schoolDataProps) {
    const {contacts,createdAt,name, principal,courses}=schoolData;
    
    return (
        <>
        <h1 className={utilStyles.headingXl}>{name}</h1>
                <div className="row">
                    <div className="col"><strong>Principal</strong></div>
                    <div className="col">{principal}</div>
                    <hr/>
                </div>
                <div className="row">
                    <div className="col"><strong>created At</strong></div>
                    <div className="col">{createdAt &&<Date dateString={createdAt} />}</div>
                    <hr/>
                </div>

                <div>
                {courses && <table className="table">
                <thead className={utilStyles.sticky}>
                <tr>
                    <th colSpan={7}><b>Courses</b></th>

                </tr>
                    <tr>
                        <th>#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Cadre</th>
                        <th scope="col">Qualification</th>
                        <th scope="col">duration</th>
                        <th scope="col">Created At</th>
                        <th scope="col"></th>
                        
                    </tr>
                </thead>
                <tbody>
                    {courses?.map(({ name, cadre,professionalQualification,durationYears, createdAt, id }, index) => (
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
                                <Link href={`/courses/view/${id}`}><a className='btn btn-sm btn-outline-primary' >View</a></Link>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>}
            
            {contacts &&<Contacts allContacts={contacts}></Contacts>}
                </div>

        </>
    )
}
