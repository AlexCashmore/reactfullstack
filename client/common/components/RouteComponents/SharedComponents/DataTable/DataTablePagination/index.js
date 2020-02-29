import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Pagination from "../../../../UIComponents/Pagination";

class PaginationDataTable extends PureComponent {
    render() {
        const { items,prePaginatedItems } = this.props;
        return (
            <div className="data-table-pagination">
                <Pagination page={this.props.page} firstPage={this.props.firstPage} lastPage={this.props.lastPage} changePage={this.props.changePage} items={items} prePaginatedItems={prePaginatedItems} />
            </div>
        );
    }
}

PaginationDataTable.propTypes = {
    items: PropTypes.array,
};
PaginationDataTable.defaultProps = {
    items: [],
};
PaginationDataTable.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default PaginationDataTable;