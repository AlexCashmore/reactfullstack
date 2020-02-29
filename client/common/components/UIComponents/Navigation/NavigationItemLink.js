import React, { Component } from "react";
import PropTypes from "prop-types";

class NavigationItemLink extends Component {
    /* used when checking if current item is a parent of a slug */
    static arrayStartsWith(needleArray, haystackArray) {
        if(haystackArray.length < needleArray.length) {
            return false;
        }

        for(let i = 0; i < needleArray.length; i++) {
            if(haystackArray[i] !== needleArray[i]) {
                return false;
            }
        }

        return true;
    }

    componentWillMount() {
        const { active } = this.props;
        this.setState({
            active: active || false,
        });
    }

    get hasChildren() {
        const { children } = this.props;
        return typeof children !== "undefined";
    }

    get isSelected() {
        const { context } = this;
        const { link, useParentMatching } = this.props;
        const linkSlugArray = link ? link.split("/") : [];
        const routerPathnameSlugArray = context.router.location.pathname ? context.router.location.pathname.split("/") : [];
        return typeof link !== "undefined"
            && (link !== context.router.location.pathname
                ? (link !== "/" ? useParentMatching && NavigationItemLink.arrayStartsWith(linkSlugArray, routerPathnameSlugArray) : false) : true);
    }

    get anyChildrenIsSelected() {
        const { context } = this;
        const { children } = this.props;
        let childrenSelected = false;
        if(this.hasChildren) {
            const childrenArray = Array.isArray(children) ? children : [children];
            const routerPathnameSlugArray = context.router.location.pathname ? context.router.location.pathname.split("/") : [];
            for(const item of childrenArray) {
                if(item && item.props) {
                    const linkSlugArray = item.props.link ? item.props.link.split("/") : [];
                    if(typeof item.props !== "undefined" && typeof item.props.link !== "undefined" && NavigationItemLink.arrayStartsWith(linkSlugArray, routerPathnameSlugArray)) {
                        childrenSelected = true;
                    }
                }
            }
        }

        return childrenSelected;
    }

    get className() {
        return this.hasChildren ? "has_sub" : "";
    }

    get selectedClass() {
        return this.isSelected || this.anyChildrenIsSelected ? "selected" : "";
    }

    get iconChevronClass() {
        const { caretClass } = this.props;
        return this.hasChildren ? (<i className={caretClass} />) : "";
    }

    get labelClass() {
        const { labelClass, labelPosition, labelValue } = this.props;
        return typeof labelClass !== "undefined" && typeof labelPosition !== "undefined" && typeof labelValue !== "undefined" ? (
            <span className={`label label-${labelClass} pull-${labelPosition}`}>{labelValue}</span>
        ) : "";
    }

    get toggleSubMenu() {
        return (event) => {
            const { context } = this;
            const { callback, useRouterPush, link } = this.props;
            const { active } = this.state;
            if(this.hasChildren) {
                this.setState({
                    active: !active,
                });
            }
            if(typeof callback === "function") {
                callback(event, this);
            }
            if(useRouterPush) {
                if(typeof link === "string") {
                    context.router.push(link);
                }
                event.stopPropagation();
                event.preventDefault();
            }
            return false;
        };
    }

    get submenuClass() {
        const { active } = this.state;
        return active || this.anyChildrenIsSelected ? "open" : "";
    }

    get submenu() {
        const { children } = this.props;
        return this.hasChildren ? (
            <ul>
                {children}
            </ul>
        ) : "";
    }

    iconClass(currentPosition) {
        const { iconPosition, iconClass, fontIconClass } = this.props;
        return currentPosition === iconPosition && typeof iconClass !== "undefined" && typeof fontIconClass !== "undefined" ? (
            <i className={`${fontIconClass} ${fontIconClass}-${iconClass}`} />
        ) : "";
    }

    render() {
        const {
            className, linkClassName, link, href, target, title, itemName,
        } = this.props;
        const finalClassName = (`${className || ""} ${this.selectedClass} ${this.className} ${this.submenuClass}`).trim();
        const htmlPropsLi = {
            className: finalClassName,
        };
        const htmlPropsLink = {
            className: linkClassName || null,
            href: link || href || "/#",
            target,
            title,
        };
        return (
            <li {...htmlPropsLi}>
                <a
                    {...htmlPropsLink}
                    onClick={this.toggleSubMenu}
                >
                    {this.iconClass("left")}
                    <span>{itemName}</span>
                    {this.iconClass("right")}
                    {this.labelClass}
                    {this.iconChevronClass}
                </a>
                {this.submenu}
            </li>
        );
    }
}

NavigationItemLink.propTypes = {
    className: PropTypes.string, // className of the li
    linkClassName: PropTypes.string, // className of the link
    link: PropTypes.string, // href of the link
    active: PropTypes.bool, // sets the first state of navigation item as selected
    target: PropTypes.string, // target of the link
    iconPosition: PropTypes.string, // position of icon
    iconClass: PropTypes.string, // iconClass to be added to an i using the iconPosition (values: ["left", "right"])
    fontIconClass: PropTypes.string, // fontIconClass for the icon added at the iconPosition
    labelClass: PropTypes.string, // labelClass same as iconClass but after the itemName
    labelPosition: PropTypes.string, // labelPosition is used to move the label (className of the label position defined in CSS like pull-left)
    labelValue: PropTypes.string, // labelValue text of the label (this should be used for example notifications in navigation links)
    title: PropTypes.string, // title of the link
    caretClass: PropTypes.string, // caretClass will be used for the chevron
    useRouterPush: PropTypes.bool, // enables the target and makes the link to behave as a normal link
    useParentMatching: PropTypes.bool, // use array slug selector for selecting location when checking to add selected class,
    openDropdownOnClick: PropTypes.bool,
    itemName: PropTypes.string.isRequired, // the link text that will be added in the link
    callback: PropTypes.func, // callback(event) to be fired when click event will happen on the item
};
NavigationItemLink.defaultProps = {
    className: "",
    linkClassName: "",
    active: false,
    iconClass: "",
    fontIconClass: "",
    labelClass: "",
    labelPosition: "",
    labelValue: "",
    title: "",
    link: "",
    target: "",
    useRouterPush: true,
    useParentMatching: true,
    openDropdownOnClick: false,
    caretClass: "",
    iconPosition: "left",
    callback: null,
};
NavigationItemLink.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default NavigationItemLink;