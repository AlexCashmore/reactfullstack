import React, { Component } from "react";
import PropTypes from "prop-types";

class Link extends Component {
    componentWillMount() {

    }

    get link() {
        return (event) => {
            const { context } = this;
            const {
                link, useRouterPush, target, callback,
            } = this.props;
            if(typeof callback === "function") {
                callback(event, this);
            }
            if(typeof link === "string" && useRouterPush && (!target || target !== "_blank")) {
                context.router.push(link);
            }
            if(useRouterPush && (!target || target !== "_blank")) {
                window.scrollTo(0, 0);
                event.stopPropagation();
                event.preventDefault();
            }

            return false;
        };
    }

    render() {
        const {
            children, containerClass, className, title, target, link, href,
        } = this.props;
        const htmlProps = {
            className,
            title,
            target,
            href: href || link || "/#",
        };
        let componentRender = (<a {...htmlProps} onClick={this.link}>{children}</a>);
        if(containerClass) {
            componentRender = (
                <div className={containerClass}>
                    {componentRender}
                </div>
            );
        }
        return (componentRender);
    }
}

Link.propTypes = {
    containerClass: PropTypes.string,
    className: PropTypes.string,
    link: PropTypes.string,
    target: PropTypes.string,
    title: PropTypes.string,
    useRouterPush: PropTypes.bool,
    callback: PropTypes.func,
};
Link.defaultProps = {
    containerClass: "",
    className: "link link-blue-hover",
    link: "",
    target: "",
    title: "",
    useRouterPush: true,
    callback: null,
};
Link.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default Link;