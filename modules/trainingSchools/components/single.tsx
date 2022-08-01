
import utilStyles from '../../../styles/utils.module.css'
import Date from '../../../components/date'
import { schoolDataProps } from '../store/types';
import Contacts from '../../contacts/components/all';
import Row from '../../../components/keyValue'
import Courses from '../../courses/components/all';

export default function School({
    schoolData
}: schoolDataProps) {
    const { contacts, createdAt, name,district, principal, courses, registrationStatus, healthFacility, address, email, passRate,level } = schoolData;

    return (
        <>
            <h1 className={utilStyles.headingXl}>{name}</h1>
            <Row name={'Principal'} value={principal}></Row>
            <Row name={'Created on'} value={createdAt &&<Date dateString={createdAt} />}></Row>
            <Row name={'Registration'} value={registrationStatus}></Row>
            <Row name={'Health Facility'} value={healthFacility}></Row>
            <Row name={'Address'} value={address}></Row>
            <Row name={'District'} value={district?.name}></Row>
            <Row name={'Email'} value={email}></Row>
            <Row name={'Pass Rate'} value={passRate}></Row>
            <Row name={'Level'} value={level}></Row>
            <div>
                {courses && <Courses allCourses={courses}/>}

                {contacts && <Contacts allContacts={contacts}></Contacts>}
            </div>

        </>
    )
}
