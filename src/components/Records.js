import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RecordsItems from './RecordsItems';

import '../styles/Records.css';

class Records extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            changed: false
        }

        this.handleChange = this.handleChange.bind(this);
    }


    historyText() {
        var historyText = 'Records';
        var historyLength = this.props.history.length;

        if (historyLength > 0) {
            historyText += ' (' + (historyLength) + ')';
        }

        return historyText;
    }

    handleChange(e, expanded) {
        this.setState({
            expanded: expanded
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.history.length === 0) {
            this.setState({
                expanded: false
            });
        }
    }

    render() {
        const expanded = this.state.expanded;
        const history = this.props.history;

        return (
            <ExpansionPanel className="panel" expanded={expanded} onChange={this.handleChange}>
                <ExpansionPanelSummary className="summary" expandIcon={<ExpandMoreIcon />}>
                    <Typography>{this.historyText()}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="details">
                    <List className="times">
                        <RecordsItems history={history} />
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default Records;