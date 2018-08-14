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
        const {addWorkflow} = this.props;
        this.setState({
            addingNew: true
        })
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
                                    index={i}
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
                <h4 className="workflow-name">{workflowName}</h4>
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