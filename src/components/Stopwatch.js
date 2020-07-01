import 'typeface-roboto';
import React from 'react';
import Card from '@material-ui/core/Card';
import { Typography, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Numerals from './Numerals';
import Records from './Records';
import Tooltip from '@material-ui/core/Tooltip';

import '../styles/Stopwatch.css';

class Stopwatch extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            milliseconds: 0,
            previousMoment: 0,
            history: [],
        }

        this.startWatch = this.startWatch.bind(this);
        this.stopWatch = this.stopWatch.bind(this);
        this.resetWatch = this.resetWatch.bind(this);
        this.updateWatch = this.updateWatch.bind(this);
        this.addRecord = this.addRecord.bind(this);
        this.removeHistory = this.removeHistory.bind(this);
        this.confirmRemoveHistory = this.confirmRemoveHistory.bind(this);
    }

    componentWillUnmount(){
        this.stopWatch();
    }

    startWatch(){
        var currentMoment = Date.now();
        this.setState({
            previousMoment: currentMoment,
        });

        if (this.interval == null) {
            this.interval = setInterval(this.updateWatch, 10);
        }
    }

    stopWatch(){
        clearInterval(this.interval);
        this.interval = null;
    }

    resetWatch(){
        this.setState({
            milliseconds: 0,
        });
    }

    updateWatch() {
        var currentMoment = Date.now();
        var addMilliseconds = currentMoment - this.state.previousMoment;
        this.setState({
            milliseconds: this.state.milliseconds + addMilliseconds,
            previousMoment: currentMoment,
        });
    }

    addRecord() {
        let history = this.state.history;
        history.push(this.state.milliseconds);
        this.setState({
            milliseconds: 0,
            history: history
        });
    }

    removeHistory(){
        this.stopWatch();
        this.setState({
            milliseconds: 0,
            history: []
        });
    }

    confirmRemoveHistory() {
        if (window.confirm('Do you want to remove all records?')) {
            this.removeHistory() 
        }
    }


    render() {
        const history = this.state.history.slice(0);
        const milliseconds = this.state.milliseconds;

        return (
            <Card>    
                <AppBar position="flex">
                    <Toolbar>
                        <Icon>alarmadd</Icon>
                        <Typography variant="title" color="inherit" >
                            &nbsp;STOPWATCH
                        </Typography>                        
                    </Toolbar>
                </AppBar>                        
                <Numerals milliseconds={milliseconds} history={history}/>                                        
                <div className="buttons">
                    <Tooltip title="Start" interactive>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            aria-label="Start" 
                            onClick={this.startWatch}
                        >
                        <Icon>play_circle_outline</Icon></Button>
                    </Tooltip>
                    <Tooltip title="Stop" interactive>
                        <Button 
                        variant="contained" 
                        color="default" 
                        aria-label="Stop" 
                        onClick={this.stopWatch}
                        >
                        <Icon>stop</Icon></Button>
                    </Tooltip>
                    <Tooltip title="Reset" interactive>
                        <Button 
                        variant="outlined" 
                        color="default" 
                        aria-label="Reset" 
                        onClick={this.resetWatch}
                        >
                        <Icon>replay</Icon></Button>
                    </Tooltip>
                    <Tooltip title="Save" interactive>
                        <Button 
                        variant="contained" 
                        color="default" 
                        aria-label="Save" 
                        onClick={this.addRecord}
                        >
                        <Icon>save_alt</Icon></Button>
                    </Tooltip>
                    <Tooltip title="Remove history" interactive>
                        <Button 
                        variant="contained" 
                        color="secondary" 
                        aria-label="Delete all" 
                        onClick={this.confirmRemoveHistory}
                        >
                        <Icon>delete</Icon></Button>
                    </Tooltip>
                </div>                               
                <Records history={history} />
            </Card>
        );
    }
}

export default Stopwatch;