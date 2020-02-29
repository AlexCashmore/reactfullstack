import "babel-polyfill";

import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class DataTableContainer extends PureComponent {
    get className() {
        const { className } = this.props;
        return `data-table-container${className ? ` ${className}` : ""}`;
    }

    static renderFunctionDefault(itemData) {
        const { value } = itemData;
        return value || null;
    }

    static renderFunction(itemData) {
        return typeof itemData.renderFunction === "function" ? (itemData.renderFunction)(itemData) : DataTableContainer.renderFunctionDefault(itemData);
    }

    get getTableContent() {
        const { items } = this.props;
        return (
            <div className="grid grid-full data-table-row">
                {
                    items.map((item, key) => {
                        const itemKeys = Object.keys(item);
                        return (
                            <div key={key} className="grid-cell data-table-cell">
                                <div className="grid grid-fit data-item-row">
                                    {
                                        itemKeys.map((itemKey) => {
                                            const itemData = item[itemKey];
                                            const { className, style } = itemData;
                                            const itemCellProps = {
                                                className: `grid-cell data-item-cell${className ? ` ${className}` : ""}`,
                                                style: style || {},
                                            };
                                            return (
                                                <div key={itemKey} {...itemCellProps}>
                                                    <div className="grid grid-center data-item-cell-content-holder">
                                                        <div className="grid-cell">
                                                            <div className="data-item-cell-content">{DataTableContainer.renderFunction(itemData)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    render() {
        return (
            <div className={this.className}>
                {this.getTableContent}
            </div>
        );
    }
}

DataTableContainer.propTypes = {
    className: PropTypes.string,
    items: PropTypes.array,
};
DataTableContainer.defaultProps = {
    className: "",
    items: [],
};
DataTableContainer.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default DataTableContainer;