import { FormRow, FormSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { handleChange, clearValues, createJob, editJob } from '../../features/job/jobSlice';

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!position || !company || !jobLocation) {
      toast.error('please, fill out all fields');
      return;
    }
    if(isEditing) {
      dispatch(editJob({jobId: editJobId, job: {position, company, jobLocation, jobType, status}}));
      return;
    }
    dispatch(createJob({position, company, jobLocation, jobType, status}))
  }

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({name, value}));
    
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className="form-center">
          <FormRow type='text' name='position' value={position} handleChange={handleJobInput}/>
          <FormRow type='text' name='company' value={company} handleChange={handleJobInput}/>
          <FormRow type='text' name='jobLocation' value={jobLocation} labelText={'Job Location'} handleChange={handleJobInput}/>
          <FormSelect name='status' value={status} handleChange={handleJobInput} list={statusOptions}/>
          <FormSelect name='jobType' labelText='job type' value={jobType} handleChange={handleJobInput} list={statusOptions}/>
          <div className="btn-container">
            <button type='button' className='btn btn-block clear-btn' onClick={()=> dispatch(clearValues())
            }>clear</button>
            <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit} disabled={isLoading}>submit</button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob