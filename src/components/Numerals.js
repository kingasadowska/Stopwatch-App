import React from 'react';
import { msToString } from '../helpers/helpers.js';
import Typography from '@material-ui/core/Typography';

class Numerals extends React.Component {
    render() {
        const time = msToString(this.props.milliseconds);
        const history = this.props.history;

        return (
            <div className="Numerals">
                <Typography className="NumeralsText" >
                    {time}
                </Typography>
                <LastRecord history={history} />
            </div>
        );
    }
}

function LastRecord(props) {
    var lastTime = null;
    var time = '00:00:00:000';
    if (props.history.length > 0) {
        lastTime = props.history[props.history.length - 1];
        time = msToString(lastTime);
    }

    return (
        <Typography component="p" variant="heading" align="center">
            {time}
        </Typography>
    );
}

export default Numerals;