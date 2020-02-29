import React, { Component } from "react";
import PropTypes from "prop-types";

class Pagination extends Component {
    render() {
        return (
            <div className="pagination">
                <div className="grid grid-gutters">
                    <div className="grid-cell grid-cell-autoSize">
                        <div className="btn btn-custom btn-select-first" onClick={() => { this.props.firstPage(); }}>First</div>
                    </div>
                    <div className="grid-cell grid-cell-autoSize">
                        <div className="grid">
                            <div className="grid-cell grid-cell-autoSize">
                                <div onClick={() => { this.props.changePage("-1"); }} className="btn btn-custom btn-select-left">
                                    <i className="fa fa-caret-left" />
                                </div>
                            </div>
                            <div className="grid-cell grid-cell-autoSize">
                                <div className="btn btn-custom btn-custom-full btn-select-page">{this.props.page||0}</div>
                            </div>
                            <div className="grid-cell grid-cell-autoSize">
                                <div onClick={() => { this.props.changePage("+1",this.props.prePaginatedItems); }} className="btn btn-custom btn-select-right">
                                    <i className="fa fa-caret-right" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid-cell grid-cell-autoSize">
                        <div className="btn btn-custom btn-select-last" onClick={() => { this.props.lastPage(this.props.prePaginatedItems); }}>Last</div>
                    </div>
                </div>
            </div>
        );
    }
}

Pagination.propTypes = {};
Pagination.defaultProps = {};
Pagination.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default Pagination;