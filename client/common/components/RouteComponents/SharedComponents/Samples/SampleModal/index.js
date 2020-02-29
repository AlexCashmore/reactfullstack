import React, { Component } from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SampleModalActions from "./SampleModalActions";
import SampleModalContent from "./SampleModalContent";

import Modal from "../../../../UIComponents/Modal";
import ModalTitle from "../../../../UIComponents/Modal/ModalTitle";
import ModalActions from "../../../../UIComponents/Modal/ModalActions";

import * as pageActions from "../../../../../actions/pageActions";

const MODAL_TIMER_VAR_NAME = "modalTimerSampleModal";
const MODAL_CLASS_VAR_NAME = "modalClassSampleModal";

class SampleModal extends Component {
    componentWillMount() {
        this.setState({
            status: false,
            visible: false,
            lastUpdated: new Date().getTime(),
        });
    }

    componentDidMount() {
        const { status } = this.state;
        if(status) {
            this.toggleCustomClass(status);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { status } = this.props;
        const { status: stateStatus } = this.state;
        // this.props.status != this.state.status is for clearing timeout properly on 0 seconds
        if(status !== prevProps.status && status !== stateStatus) {
            if(status) {
                this.openModal();
            } else {
                this.closeModal();
            }
        }
        if(stateStatus !== prevState.status) {
            this.onStateChange();
        }
    }

    onStateChange() {
        const { onStateChange } = this.props;
        if(typeof onStateChange !== "function") {
            return false;
        }
        return onStateChange(this.state);
    }

    get openModal() {
        return (event) => {
            if(event) {
                event.stopPropagation();
                event.preventDefault();
            }

            this.setState({
                status: true,
                visible: true,
                lastUpdated: new Date().getTime(),
            });

            this.toggleCustomClass(true);
        };
    }

    get closeModal() {
        const animationTime = 0;
        return (event) => {
            if(event) {
                event.stopPropagation();
                event.preventDefault();
            }

            this.setState({
                visible: false,
                lastUpdated: new Date().getTime(),
            });

            window[MODAL_TIMER_VAR_NAME] = setTimeout(() => {
                const newUpdateTime = new Date().getTime();
                const { lastUpdated } = this.state;
                if(newUpdateTime - lastUpdated >= animationTime) {
                    this.setState({
                        status: false,
                        visible: false,
                        lastUpdated: newUpdateTime,
                    });
                    this.toggleCustomClass(false);
                }
            }, animationTime);
        };
    }

    get toggleCustomClass() {
        return (status) => {
            const { updateCustomClass } = this.props;
            const customCLass = {};
            customCLass[MODAL_CLASS_VAR_NAME] = status;
            updateCustomClass(customCLass);
        };
    }

    render() {
        const { status, visible } = this.state;

        return (
            <Modal
                className="modal-sample"
                header={<ModalTitle title="Modal title" closeFunction={this.closeModal} />}
                footer={<ModalActions><SampleModalActions cancelFunction={this.closeModal} /></ModalActions>}
                status={status}
                visible={visible}
                openModal={this.openModal}
                closeModal={this.closeModal}
            >
                <SampleModalContent />
            </Modal>
        );
    }
}

SampleModal.propTypes = {
    status: PropTypes.bool,
    onStateChange: PropTypes.any,
    // data: PropTypes.object,
};
SampleModal.defaultProps = {
    status: false,
    onStateChange: null,
    // data: {},
};
SampleModal.contextTypes = {
    router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        lang: state.lang,
        strings: state.strings.strings,
        page: state.page.page,
    };
}

function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, pageActions);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SampleModal);