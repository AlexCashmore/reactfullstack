/* eslint class-methods-use-this: 0 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import { Group } from "@vx/group";
import { Tree } from "@vx/hierarchy";

import { hierarchy } from "d3-hierarchy";
// import { pointRadial } from "d3-shape";

import {
    LinkHorizontal, // LinkVertical, LinkRadial,
    // LinkHorizontalStep, LinkVerticalStep, LinkRadialStep,
    // LinkHorizontalCurve, LinkVerticalCurve, LinkRadialCurve,
    // LinkHorizontalLine, LinkVerticalLine, LinkRadialLine,
} from "@vx/shape";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as pageActions from "../../../../../../actions/pageActions";
import * as organizationActions from "../../../../../../actions/organizationActions";
import * as networkActions from "../../../../../../actions/networkActions";
import Link from "../../../../../UIComponents/Link";
import Spinner from "../../../../../UIComponents/Spinner";

class NetworkManager extends Component {
    componentDidMount() {
        const { fetchNetworkById, user } = this.props;
        fetchNetworkById(user.session.account.userId, user.session.account.token);
        this.props.changeTitle('My Organization');

    }

    nodeHandleOnClick(node) {
        return () => {
            const { data } = node;
            data.isExpanded = !data.isExpanded;
            this.forceUpdate();
        };
    }

    NodeTreeComponent() {
        return ({ node }) => {
            try {
                const hasChildAddNode = node.data.children.filter(i => ((i.name === "New Node")));
                if(hasChildAddNode.length < 1) {
                    if(node.data.name !== "New Node") {
                        node.data.children.push({
                            name: "New Node",
                            parentId: node.data.organizationId || node.data.rootId || "I have no parent",
                        });
                    }
                }
            } catch
            (e) {
                node.data.children = [];
            }

            const width = 150;
            let height = 50;

            const nodeStrokeFill = "#FFF";
            let nodeStrokeColor = "#374469";
            let nodeStrokeStyle = 5;
            const nodeStrokeWidth = 2;
            const nodeStrokeOpacity = 1;
            const nodeStrokeRadius = 10;

            if(node.children || node.data.children) {
                if(node.data.isExpanded) {
                    nodeStrokeColor = "#FE7A1E";
                }
                nodeStrokeStyle = 0;
            }
            if(node.data.name === "New Node") {
                height = 25;
            }

            return (
                <Group top={node.x} left={node.y}>
                    <rect
                        height={height}
                        width={width}
                        y={-height / 2}
                        x={-width / 2}
                        fill={nodeStrokeFill}
                        stroke={nodeStrokeColor}
                        strokeWidth={nodeStrokeWidth}
                        strokeDasharray={nodeStrokeStyle}
                        strokeOpacity={nodeStrokeOpacity}
                        rx={nodeStrokeRadius}
                        onClick={this.nodeHandleOnClick(node)}
                    />
                    {node.depth === 0
                    && (
                        <circle
                            r={12}
                            fill="url('#lg')"
                            onClick={this.nodeHandleOnClick(node)}
                        />
                    )
                    }
                    {node.depth !== 0
                    && (
                        <rect
                            height={height}
                            width={width}
                            y={-height / 2}
                            x={-width / 2}
                            fill={nodeStrokeFill}
                            stroke={nodeStrokeColor}
                            strokeWidth={nodeStrokeWidth}
                            strokeDasharray={nodeStrokeStyle}
                            strokeOpacity={nodeStrokeOpacity}
                            rx={nodeStrokeRadius}
                            onClick={this.nodeHandleOnClick(node)}
                        />
                    )
                    }
                    {node.depth === 0
                    && (
                        <rect
                            height={height}
                            width={width}
                            y={-height / 2}
                            x={-width / 2}
                            fill="#f5f8fa"
                            stroke={node.children ? "#71248e" : "#374469"}
                            strokeWidth={2}
                            strokeDasharray={!node.children ? "0" : "0"}
                            strokeOpacity={node.children ? 1 : 1}
                            rx={!node.children ? 10 : 10}
                            onClick={this.nodeHandleOnClick(node)}
                        />

                    )
                    }
                    {(node.data.name !== "New Node")
                        ? (
                            <Group>

                                <text
                                    dy=".33em"
                                    fontSize={14}
                                    fontFamily="Roboto"
                                    textAnchor="middle"
                                    onClick={this.nodeHandleOnClick(node)}
                                >
                                    {node.data.name}
                                </text>
                                <text
                                    dy=".33em"
                                    fontSize={12}
                                    fontFamily="Roboto"
                                    y={-15}
                                    x={50}
                                    textAnchor="middle"

                                >
                                    <Link link={`/organization/${node.data.organizationId}`}> Edit ✎</Link>
                                </text>
                            </Group>
                        )
                        : (
                            <text
                                dy=".33em"
                                fontSize={14}
                                fontFamily="Roboto"
                                textAnchor="middle"
                            >
                                <Link link={`/organization/create/parent/${node.data.parentId}`}>Create Organization +</Link>
                            </text>
                        )
                    }
                    )}
                </Group>
            );
        };
    }

    LinkTreeComponent() {
        return ({ link }) => (
            <LinkHorizontal
                data={link}
                stroke="#374469"
                strokeWidth="1"
                fill="none"
            />
        );
    }

    render() {
        const { width, height, margin } = this.props;
        if(this.props.network.fetched && !this.props.network.fetching) {
            try {
                const tree = this.props.network.data.treeMap;
                const root = tree.rootId;
                if(!tree.children||tree.children.length<1) {
                    tree.children = [{
                        name: "New Node",
                        parentId: root,
                    }];
                }
                const hasChildAddNode = tree.children.filter(i => ((i.name === "New Node")));
                if(hasChildAddNode.length < 1) {
                            tree.children.push({
                                name: "New Node",
                                parentId: root,
                            });
                }
                tree.isExpanded = true;

                return (
                    <section className="network-manager">
                        <svg width={width} height={height}>
                            <Tree
                                top={margin.top}
                                left={margin.left}
                                root={hierarchy(tree, d => (d.isExpanded ? d.children : null))}
                                size={[
                                    height - margin.top - margin.bottom,
                                    width - margin.left - margin.right,
                                ]}
                                nodeComponent={this.NodeTreeComponent()}
                                linkComponent={this.LinkTreeComponent()}
                            />
                        </svg>
                    </section>
                );
            } catch (e) {
                console.log(e);
                return (<h3>There was an error loading the network</h3>);
            }
        }
        return (<Spinner label="Loading Network..." />);
    }
}

NetworkManager.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.object,
};
NetworkManager.defaultProps = {
    margin: {
        top: 120,
        left: 120,
        right: 120,
        bottom: 120,
    },
};
NetworkManager.contextTypes = {
    router: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return {
        lang: state.lang,
        strings: state.strings.strings,
        page: state.page.page,
        user: state.user,
        organization: state.organization.organization,
        network: state.network.network,
    };
}
function mapDispatchToProps(dispatch) {
    const actions = Object.assign({}, pageActions, organizationActions, networkActions);
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkManager);