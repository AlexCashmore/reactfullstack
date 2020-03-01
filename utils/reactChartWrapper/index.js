import React, { Component } from "react";
import PropTypes from "prop-types";

import deepEqual from "deep-equal";
import Chart from "chart.js";

class ChartWrapper extends Component {
    /*
     content variable must have the structure:
     [{
     text: "",
     position: {
     x: 0,
     y: 0
     },
     fillStyle: "#FFF",
     fontSize: 14,
     fontStyle: "normal",
     fontFamily: "Roboto",
     textBaseline: "alphabetic",
     textAlign: "left"
     }]
     where all options are independent on the content item and position in case of middle alignment is added;
     the text supports multi-line on same line-height as the item
     */

    static drawTextItems(ctx, width, height, content, alignment = "normal") {
        ctx.restore();

        const usingMiddleAlignment = alignment === "middle";

        for(let i = 0; i < content.length; i++) {
            const item = content[i];
            if(item.text) {
                const { text } = item;
                const lines = text.split("\n");

                for(let j = 0; j < lines.length; j++) {
                    ctx.font = Chart.helpers.fontString(item.fontSize, item.fontStyle, item.fontFamily);
                    ctx.textBaseline = item.textBaseline;
                    ctx.textAlign = item.textAlign;
                    ctx.fillStyle = item.fillStyle;
                    const measureText = ctx.measureText(lines[j]);
                    const x = (usingMiddleAlignment ? Math.round(width - measureText.width) / 2 + item.position.x : item.position.x);
                    const y = (usingMiddleAlignment ? Math.round(height / 2) + item.position.y : item.position.y) - item.fontSize / 2 * lines.length + item.fontSize * j;
                    ctx.fillText(lines[j], x, y);
                }
            }
        }

        ctx.save();
    }

    static drawText(ctx, width, height, text, alignment = "normal", position = {
        x: 0,
        y: 0,
    }, fillStyle = "#FFF", fontSize = 14, fontStyle = "normal", fontFamily = "Roboto", textBaseline = "alphabetic", textAlign = "left") {
        ctx.restore();

        ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
        ctx.textBaseline = textBaseline;
        ctx.textAlign = textAlign;
        ctx.fillStyle = fillStyle;

        const usingMiddleAlignment = alignment === "middle";
        const lines = text.split("\n");
        for(let i = 0; i < lines.length; i++) {
            const measureText = ctx.measureText(lines[i]);
            const y = (usingMiddleAlignment ? height / 2 + position.y : position.y) - fontSize / 2 * lines.length + fontSize * i;
            const x = (usingMiddleAlignment ? width / 2 - measureText.width / 2 + position.x : position.x);
            ctx.fillText(lines[i], x, y);
        }

        ctx.save();
    }

    componentDidMount() {
        const {
            type, data, options, plugins,
        } = this.props;

        this.chartInstance = new Chart(this.canvas, {
            type,
            data,
            options,
            plugins,
        });
        try{this.props.chartHandle(this.chartInstance);}catch(e){console.log('error',e)}
    }

    componentWillReceiveProps(nextProps) {
        const { data, options } = this.props;

        const nextData = deepEqual(data, nextProps.data);
        const nextOptions = deepEqual(options, nextProps.options);
        if(!nextData || !nextOptions) {
            this.updateChart(nextProps);
        }
    }

    componentWillUnmount() {
        this.chartInstance.destroy();
    }

    updateChart(nextProps) {
        const chart = this.chartInstance;
        chart.config.data = nextProps.data;
        chart.config.options = nextProps.options;
        chart.update();
    }

    render() {
        return (
            <canvas
                ref={canvas => this.canvas = canvas}
            />
        );
    }
}

ChartWrapper.propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    options: PropTypes.object,
    plugins: PropTypes.array,
};
ChartWrapper.defaultProps = {
    plugins: [],
    options: {},
};

export default ChartWrapper;