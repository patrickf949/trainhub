
import utilStyles from '../../../styles/utils.module.css'
import Date from '../../../components/date'
import Schools from '../../trainingSchools/components/all';

export default function SingleContact({
    contact
}: {
    contact: {
        phoneNumber: string,
        createdAt: string,
        id: string,
        trainingschools: []
    }
}) {

    const { phoneNumber, createdAt, trainingschools } = contact;
    return (
        <><h5>{phoneNumber}</h5>
            <Date dateString={createdAt}></Date>

            <hr />
            <Schools allTrainingSchools={trainingschools}></Schools>
        </>
    )
}
