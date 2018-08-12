import { connect } from 'react-redux';
import JobDashboard from '../components/dashboard/dashboard';
import {getJobSearchAction} from '../actions';

const mapStateToProps = state => {
    return {
        allJobSearchData: state.jobSearch.jobSearchBuckets,
        addWorkflowSuccess: state.addWorkflowResult
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getJobSearch: (jobSearchId) => 
            getJobSearchAction(jobSearchId, dispatch),
        addWorkflow: (workflowData) =>
            addWorkflowAction(workflowData, dispatch)
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(JobDashboard);