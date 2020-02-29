import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class PanelContainer extends PureComponent {
    render() {
        const { children, title, titleClassName } = this.props;
        const panelContainerHeaderClassName = classNames("panel-header-container", titleClassName);

        return (
            <div className="holygrail panel panel-container">
                <div className="holygrail-header-container">
                    <div className={panelContainerHeaderClassName}>{title}</div>
                </div>
                <div className="holygrail-body-container">
                    <div className="holygrail-content-container">
                        <div className="panel-content-container">{children}</div>
                    </div>
                </div>
            </div>
        );
    }
}

PanelContainer.propTypes = {
    title: PropTypes.any,
    titleClassName: PropTypes.string,
};
PanelContainer.defaultProps = {
    title: "",
    titleClassName: undefined,
};
PanelContainer.contextTypes = {
    router: PropTypes.object.isRequired,
};
export default PanelContainer;