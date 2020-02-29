import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class DumbComponent extends PureComponent {
    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    render() {
        const { sampleProp } = this.props;
        return (
            <div>
                DumbComponent,
                {sampleProp}
            </div>
        );
    }
}

DumbComponent.propTypes = {
    sampleProp: PropTypes.string,
};
DumbComponent.defaultProps = {
    sampleProp: null,
};
DumbComponent.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default DumbComponent;