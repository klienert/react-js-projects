import React from "react";
import PropTypes from 'prop-types';

class Camper extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.name}</p>
            </div>
        )
    }
};

Camper.defaultProps = {
    name: 'CamperBot'
};

Camper.propTypes = {
    name: PropTypes.string.isRequired
};

class CampSite extends React.Component {
    constructor(props) {
        super(props);        
    }
    render() {
        return(
            <div>
                <h3>Welcome to the Campsite:</h3>
                <Camper  />
            </div>
        )
    }
};

export default CampSite;
