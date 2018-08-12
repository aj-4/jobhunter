import React, { Component } from 'react';
import {SimpleLine, SimpleBars} from '../atoms/sparklines';

import WorkflowRow from './workflow-row';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addingNew: false,
            editing: {}
        }
    }

    componentWillReceiveProps() {
        this.setState({addingNew: false})
    }

    onClickAdd(workflowName) {
        this.setState({
            addingNew: true
        })
    }

    onClickEdit(workflowId) {
        const {editing} = this.state;
        this.setState({
            editing: Object.assign({[workflowId]: true}, editing)
        })
    }

    onFinishEdit(workflowId, fields) {
        const {editing} = this.state;
        const isValidEdit = this.validateEdit(fields);

        if (isValidEdit) {
            // UPDATE_JOB action
            this.setState({
                editing: Object.assign({[workflowId]: false}, editing)
            })
        }
    }

    isValidEdit(fields) {

    }

    _renderWorkflowList() {
        const {editing, addingNew} = this.state
        const {workflows, workflowName} = this.props;
        let blankWorkflow = {
            workflow_status: workflowName,
            company: {name: ''}
        }
        return (
            <div>
                {
                    addingNew &&
                    <WorkflowRow 
                        key={'new'} 
                        workflow={blankWorkflow}
                        editing={true}
                    />
                }
                {
                    workflows && workflows.length &&
                    workflows.map((workflow, i) => {
                        return <WorkflowRow 
                                    key={i} 
                                    workflow={workflow} 
                                    editing={editing[i]}
                                />
                    })
                }
            </div>
        );
    }

    render() {
        const {addingNew} = this.state;    
        const {workflowName} = this.props;
        return (
            <div 
                className="workflow-list" 
                style={{backgroundColor: 'lightgrey'}}
            >
                <h4>{workflowName}</h4>
                <img 
                    className="add-job" 
                    src="/src/static/plus.png" 
                    onClick={() => this.onClickAdd(workflowName)}
                />

                {this._renderWorkflowList()}
            </div>
        );
    }
}