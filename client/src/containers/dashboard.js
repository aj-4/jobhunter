import { connect } from 'react-redux';
import JobDashboard from '../components/dashboard/dashboard';
import {getJobSearchAction} from '../actions';

const mapStateToProps = state => {
    return {
        jobSearchBuckets: state.jobSearch.jobSearchBuckets
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getJobSearch: (jobSearchId) => 
            getJobSearchAction(jobSearchId, dispatch)
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(JobDashboard);