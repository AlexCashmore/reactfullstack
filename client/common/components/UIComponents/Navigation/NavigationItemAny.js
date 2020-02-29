import React, { Component } from "react";
import PropTypes from "prop-types";

class NavigationItemAny extends Component {
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

    get iconChevronClass() {
        const { caretClass } = this.props;
        return this.hasChildren ? (<i className={caretClass} />) : "";
    }

    get isSelected() {
        const { context } = this;
        const { link, useParentMatching } = this.props;
        const linkSlugArray = link ? link.split("/") : [];
        const routerPathnameSlugArray = context.router.location.pathname ? context.router.location.pathname.split("/") : [];
        return typeof link !== "undefined"
            && (link !== context.router.location.pathname
                ? (link !== "/" ? useParentMatching && NavigationItemAny.arrayStartsWith(linkSlugArray, routerPathnameSlugArray) : false) : true);
    }

    get selectedClass() {
        return this.isSelected ? "selected" : "";
    }

    get activeClass() {
        const { active } = this.state;
        return active ? "open" : "";
    }

    get toggleSubMenu() {
        return (event) => {
            const { context } = this;
            const { active } = this.state;
            const {
                openDropdownOnClick, callback, useRouterPush, link,
            } = this.props;
            if(openDropdownOnClick) {
                if(this.hasChildren) {
                    this.setState({
                        active: !active,
                    });
                }
            }
            if(callback === "function") {
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

    get enableSubMenu() {
        return (event) => {
            if(this.hasChildren) {
                this.setState({
                    active: true,
                });
            }
            event.preventDefault();
            return false;
        };
    }

    get disableSubMenu() {
        return (event) => {
            if(this.hasChildren) {
                this.setState({
                    active: false,
                });
            }
            event.preventDefault();
            return false;
        };
    }

    iconClass(currentPosition) {
        const { iconPosition, iconClass, fontIconClass } = this.props;
        return currentPosition === iconPosition && typeof iconClass !== "undefined" && typeof fontIconClass !== "undefined" ? (
            <i className={`${fontIconClass} ${fontIconClass}-${iconClass}`} />
        ) : "";
    }

    render() {
        const {
            className, link, href, target, title, itemName, linkParent, onHoverEnable, children,
        } = this.props;
        const finalClassName = (`${className || ""} ${this.selectedClass} ${this.activeClass}`).trim();
        const htmlPropsLi = {
            className: finalClassName,
        };
        const htmlOnHoverProps = {
            onMouseEnter: this.enableSubMenu,
            onMouseLeave: this.disableSubMenu,
        };
        const htmlPropsLink = {
            href: link || href || "/#",
            target,
            title,
        };
        return (
            <li {...htmlPropsLi}>
                {linkParent ? (
                    <div {...onHoverEnable ? htmlOnHoverProps : null}>
                        <a {...htmlPropsLink} onClick={this.toggleSubMenu}>
                            {this.iconClass("left")}
                            {itemName}
                            {this.iconClass("right")}
                            {this.iconChevronClass}
                        </a>
                        <div>{children}</div>
                    </div>
                ) : (
                    <div onClick={this.toggleSubMenu}>
                        {children}
                    </div>
                )}
            </li>
        );
    }
}

NavigationItemAny.propTypes = {
    itemName: PropTypes.string, // the link text before the chevron icon in case is a linkParent
    linkParent: PropTypes.bool, // creates a holder for more advanced functions like onHoverEnable or itemName, link, target, title, useRouterPush, side effect: will disable toggle
    active: PropTypes.bool, // sets the first state of navigation item as selected
    onHoverEnable: PropTypes.bool, // on hover fires the event and callback
    link: PropTypes.string, // link of the item (only if linkParent enabled)
    target: PropTypes.string, // target of the link (only if linkParent enabled)
    iconPosition: PropTypes.string, // position of icon
    iconClass: PropTypes.string, // iconClass to be added to an i using the iconPosition (values: ["left", "right"])
    fontIconClass: PropTypes.string, // fontIconClass for the icon added at the iconPosition
    title: PropTypes.string, // title of the link (only if linkParent enabled)
    caretClass: PropTypes.string, // caretClass will be used for the chevron (only if linkParent enabled)
    className: PropTypes.string, // the class name that will be used for the list item
    callback: PropTypes.func, // callback(event) to be fired when click event will happen on the item
    useRouterPush: PropTypes.bool, // enables the target and makes the link to behave as a normal link
    useParentMatching: PropTypes.bool, // use array slug selector for selecting parents or locations when styling items of the list,
    openDropdownOnClick: PropTypes.bool,
};
NavigationItemAny.defaultProps = {
    className: "",
    active: false,
    iconClass: "",
    fontIconClass: "",
    title: "",
    link: "",
    target: "",
    linkParent: false,
    onHoverEnable: false,
    useRouterPush: true,
    useParentMatching: true,
    openDropdownOnClick: false,
    caretClass: "",
    iconPosition: "left",
    itemName: "",
    callback: null,
};
NavigationItemAny.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default NavigationItemAny;