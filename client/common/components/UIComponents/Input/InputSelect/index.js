import React, { Component } from "react";
import PropTypes from "prop-types";

class InputSelect extends Component {
    componentWillMount() {
        const { visible } = this.props;
        this.setState({
            visible,
        });
    }

    componentDidMount() {
        const { value } = this.props;
        if(value) {
            this.changeCurrentValue(value);
        } else {
            this.changeCurrentKey(0);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { currentKey } = this.state;
        const { value } = this.props;
        if(nextProps.value !== value) {
            const nextItemKey = this.getItemKeyByValue(nextProps.value);
            if(nextItemKey !== currentKey) {
                this.changeCurrentKey(nextItemKey);
            }
        }
    }

    get isVisible() {
        const { visible } = this.state;
        return !!visible;
    }

    get optionsListToggle() {
        return () => {
            this.setState({
                visible: !this.isVisible,
            });
        };
    }

    get className() {
        const { className } = this.props;
        return `input-control input-select-control${
            this.isVisible ? " open" : ""
        }${className ? ` ${className}` : ""}`;
    }

    getItemKeyByValue(value) {
        const { values } = this.props;
        for(const item in values) {
            if(Object.prototype.hasOwnProperty.call(values, item) && values[item].value === value) {
                return item;
            }
        }

        return null;
    }

    get handleSelectChange() {
        return (event) => {
            this.changeCurrentValue(event.target.value);
        };
    }

    getItemByKey(key) {
        const { values } = this.props;
        if(Object.prototype.hasOwnProperty.call(values, key)) {
            return values[key];
        }
        return null;
    }

    classNameListItem(key) {
        return this.isItemSelected(key) ? "selected" : null;
    }

    isItemSelected(key) {
        const { currentKey } = this.state;
        return currentKey === key;
    }

    changeCurrentKey(key) {
        const requestItem = this.getItemByKey(key);
        const { onChange } = this.props;
        const { currentKey } = this.state;
        if(requestItem) {
            if(currentKey !== null && currentKey !== key && typeof onChange === "function") {
                onChange(requestItem);
            }
            this.setState({
                currentKey: Number(key),
                currentValue: requestItem.value,
            });
            return true;
        }
        return false;
    }

    changeCurrentValue(value) {
        const requestItemKey = this.getItemKeyByValue(value);
        const { onChange } = this.props;
        const { currentKey } = this.state;
        if(requestItemKey !== null) {
            if(currentKey !== null && currentKey !== requestItemKey && typeof onChange === "function") {
                onChange(this.getItemByKey(requestItemKey));
            }
            this.setState({
                currentKey: Number(requestItemKey),
                currentValue: value,
            });
            return true;
        }
        return false;
    }

    handleListChange(key) {
        return () => {
            if(this.changeCurrentKey(key)) {
                this.optionsListToggle();
            }
        };
    }

    render() {
        const { values, name } = this.props;
        const { currentKey, currentValue } = this.state;
        const currentItem = this.getItemByKey(currentKey);
        return (
            <div className={this.className}>
                <div onClick={this.optionsListToggle} className="input-control-container">
                    <div className="input-select-current"><span>{currentItem ? currentItem.text : null}</span></div>
                    <div className="input-control-addon input-control-inner-addon input-select-addon">
                        <div className="fa fa-caret-up icon" />
                        <div className="fa fa-caret-down icon" />
                    </div>
                </div>
                <ul className="input-select-list">
                    {
                        values.map((item, key) => (<li key={key} className={this.classNameListItem(key)} onClick={this.handleListChange(key)}>{item.text}</li>))
                    }
                </ul>
                <select name={name} className="input-html-select" value={currentValue} onChange={this.handleSelectChange}>
                    {
                        values.map((item, key) => (<option key={key} value={item.value}>{item.text}</option>))
                    }
                </select>
            </div>
        );
    }
}

InputSelect.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
    values: PropTypes.array,
    value: PropTypes.any,
    onChange: PropTypes.func,
};
InputSelect.defaultProps = {
    className: "",
    values: [],
    value: null,
    onChange: null,
};
InputSelect.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default InputSelect;