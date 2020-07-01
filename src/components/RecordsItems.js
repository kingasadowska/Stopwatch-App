import React from 'react';
import { msToString } from '../helpers/helpers.js';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import '../styles/RecordsItems.css';

class RecordsItems extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            changed: false,
            element: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.history.length !== this.props.history.length){
            this.setState({
                changed: true
            });
        this.forceUpdate();
        }
    }

    render(){
        const changed = this.state.changed;
        var listItems = this.state.element;

        if (changed) {
            listItems = this.props.history.map((step, index) => {
                const descent = msToString(step);
                return (
                    <ListItem className= "avatar" key={index} divider>
                        <Avatar className= "avatar" variant="rounded" >{index + 1}</Avatar>
                        <ListItemText className= "items">{descent}</ListItemText>
                    </ListItem>
                );
            });

            this.setState({
                changed: false,
                element: listItems
            });
        }

        return listItems;
    }
}

export default RecordsItems;