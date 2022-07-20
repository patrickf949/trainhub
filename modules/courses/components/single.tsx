
import utilStyles from '../../../styles/utils.module.css'
import Link from 'next/link'
import Date from '../../../components/date'
import { courseData } from '../store/types'
import Row from '../../../components/keyValue'
import Schools from '../../trainingSchools/components/all'

export default function Course({ course }: { course: courseData }) {
    const { 
        name, 
        professionalQualification, 
        durationYears, 
        createdAt, 
        cadre, 
        trainingschools 
    } = course
    return (
        <>
            <h1 className={utilStyles.headingXl}>{name}</h1>
            <Row name={'Cadre'} value={cadre}></Row>
            <Row name={'Created On'} value={createdAt && <Date dateString={createdAt} />}></Row>
            <Row name={'Professional Qualification'} value={professionalQualification}></Row>
            <Row name={'Duration'} value={`${durationYears} years`}></Row>
            <div>
                {trainingschools && <Schools allTrainingSchools={trainingschools} />}
            </div>
        </>
    )
}
