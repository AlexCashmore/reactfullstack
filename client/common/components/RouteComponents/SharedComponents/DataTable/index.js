import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import DataTableContainer from "./DataTableContainer";
import DataTablePagination from "./DataTablePagination";

class DataTable extends PureComponent {
    get className() {
        const { className } = this.props;
        return `data-table${className ? ` ${className}` : ""}`;
    }

    render() {
        const dataTableProps = {
            className: this.className,
        };

        const { headings, items, showPagination } = this.props;

        return (
            <div {...dataTableProps}>
                <DataTableContainer className="data-table-headings" items={headings} />
                <DataTableContainer className="data-table-content" items={items} />
                {showPagination ? <DataTablePagination prePaginatedItems={this.props.prePaginatedItems} firstPage={this.props.firstPage} lastPage={this.props.lastPage} changePage={this.props.changePage} page={this.props.tablePage} /> : null}
            </div>
        );
    }
}

DataTable.propTypes = {
    className: PropTypes.string,
    headings: PropTypes.array,
    items: PropTypes.array,
    showPagination: PropTypes.bool,
};
DataTable.defaultProps = {
    className: "",
    headings: [],
    items: [],
    showPagination: true,
};
DataTable.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default DataTable;