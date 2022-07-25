
import utilStyles from '../../../styles/utils.module.css'
import Date from '../../../components/date'
import Schools from '../../trainingSchools/components/all';
import { contactObj } from '../store/types';

export default function SingleContact({
    contact
}: {
    contact: contactObj
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
