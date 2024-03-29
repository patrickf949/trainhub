import Layout from '../../../components/layout'
import Link from 'next/link'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { useReducer } from 'react'
import { toast } from 'react-toastify';
import { editReducer } from '../../../modules/trainingSchools/store/reducer'
import { editInitialState } from '../../../modules/trainingSchools/store/initialState'
import Edit from '../../../modules/trainingSchools/components/edit'
import { schoolEditObj } from '../../../modules/trainingSchools/store/types'
import { editTrainingSchool, getTrainingSchool } from '../../../modules/trainingSchools/lib/schools'
import { useRouter } from 'next/router'
import { convertToString, flattenArray, nonNullValues } from '../../../modules/trainingSchools/utils'
import Loader from '../../../components/loader'


export default function UpdateSchool({schoolId}) {
    const router = useRouter();
    const [state, dispatch] = useReducer(editReducer, editInitialState);
    const { isLoading, school } = state;

    useQuery("editsingleSchoolData", async () => {
        dispatch({ type: "editSchoolLoadingUpdate", payload: true });
        await getTrainingSchool(schoolId)
            .then((res) => {
                toast.success('School Loaded');
                dispatch({ type: "editSchoolLoadingUpdate", payload: false });
                const editschool = res.data.data;
                let newschool = {...editInitialState.school,...nonNullValues(editschool)}
                newschool.district =  newschool['districtId']?newschool['districtId']:'';
                newschool.contacts = flattenArray(editschool.contacts);
                newschool.courses = flattenArray(editschool.courses);
                newschool.passRate = convertToString(editschool.passRate);
                newschool.level = convertToString(editschool.level);
                delete newschool['id'];
                delete newschool['districtId'];
                dispatch({ type: "editSchoolUpdate", payload: newschool });
                return res.data;
            })
            .catch((error) => {
                toast.error("Failed to load school");
                toast.error(error.message);
                dispatch({ type: "editSchoolLoadingUpdate", payload: false });
            })
    });

    const handleSubmit = async (values: schoolEditObj) => {
        dispatch({
            type: "editstateUpdate", payload:
                { isLoading: true, school: values }
        });
        await editTrainingSchool(nonNullValues(values), schoolId).then(() => {
            toast.success("Successfully updated");
            dispatch({ type: "editSchoolLoadingUpdate", payload: false });
            router.push('/trainingSchools');
        }).catch(error => {
            dispatch({ type: "editSchoolLoadingUpdate", payload: false });
            toast.error("Failed to update");

            toast.error(error.message);

            toast.error(error.response.data.message);
            
        });
    }

    return (
        <Layout>
            <Head>
                <title>Edit Training School</title>
            </Head>
            <article>
                <p> <Link href="/">Menu</Link>&nbsp;&gt;&nbsp;
                    <Link href="/trainingSchools">Training Schools</Link>
                    &nbsp;&gt;&nbsp;
                    <b>Edit Training School</b>
                </p>
                <section>
                    {school.name.length > 1 && !isLoading && <Edit
                        handleSubmit={handleSubmit}
                        school={school}
                        isProcessing={isLoading}

                    ></Edit>}
                    <Loader isProcessing={isLoading}></Loader>
                </section>
            </article>
        </Layout>
    )
}
export async function getServerSideProps({ params }) {
    return {
      props: {
        schoolId:params.id
      }
    }
  }
