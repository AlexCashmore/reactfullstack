import React, { Component } from "react";
import PropTypes from "prop-types";

class Image extends Component {
    componentWillMount() {

    }

    render() {
        const {
            containerClass, className, src, width, height, alt,
        } = this.props;
        const htmlContainerProps = {
            className: containerClass,
        };
        const htmlImageProps = {
            className,
            src,
            width,
            height,
            title: alt,
        };
        let componentRender = (
            <img alt={alt} {...htmlImageProps} />
        );
        if(containerClass) {
            componentRender = (
                <div {...htmlContainerProps}>
                    {componentRender}
                </div>
            );
        }
        return (componentRender);
    }
}

Image.propTypes = {
    containerClass: PropTypes.string,
    className: PropTypes.string,
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    alt: PropTypes.string,
};

Image.defaultProps = {
    containerClass: "",
    className: "",
    alt: "",
};
Image.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default Image;