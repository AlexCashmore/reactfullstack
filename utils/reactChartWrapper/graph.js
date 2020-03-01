import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deepEqual from 'deep-equal';
import Chart from 'chart.js';
import Moment from 'moment';
import InputElement from "../../client/common/components/UIComponents/Input/InputElement";
import Input from "../../client/common/components/UIComponents/Input";

import { InputGroup, Button, Icon } from "@blueprintjs/core";


class CoreTempChartWrapper extends Component {
    constructor(props) {
        super(props);

        this.state={
            annotations:[

            ],
            inputAnnotationsValue:[],
        };


    }
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

        let usingMiddleAlignment = alignment === "middle";

        for(let i = 0; i < content.length; i++) {

            let item = content[i];
            if(item.text) {
                let text = item.text;
                let lines = text.split('\n');

                for(let j = 0; j < lines.length; j++) {
                    ctx.font = Chart.helpers.fontString(item.fontSize, item.fontStyle, item.fontFamily);
                    ctx.textBaseline = item.textBaseline;
                    ctx.textAlign = item.textAlign;
                    ctx.fillStyle = item.fillStyle;
                    let measureText = ctx.measureText(lines[j]);
                    let x = (usingMiddleAlignment ? Math.round(width - measureText.width) / 2 + item.position.x : item.position.x);
                    let y = (usingMiddleAlignment ? Math.round(height / 2) + item.position.y : item.position.y) - item.fontSize / 2 * lines.length + item.fontSize * j;
                    ctx.fillText(lines[j], x, y);
                }
            }
        }

        ctx.save();

    }

    static drawText(ctx, width, height, text, alignment = "normal", position = {
        x: 0,
        y: 0
    }, fillStyle = "#FFF", fontSize = 14, fontStyle = "normal", fontFamily = "Roboto", textBaseline = "alphabetic", textAlign = "left") {

        ctx.restore();

        ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
        ctx.textBaseline = textBaseline;
        ctx.textAlign = textAlign;
        ctx.fillStyle = fillStyle;

        let usingMiddleAlignment = alignment === "middle";
        let lines = text.split('\n');
        for(let i = 0; i < lines.length; i++) {
            let measureText = ctx.measureText(lines[i]);
            let y = (usingMiddleAlignment ? height / 2 + position.y : position.y) - fontSize / 2 * lines.length + fontSize * i;
            let x = (usingMiddleAlignment ? width / 2 - measureText.width / 2 + position.x : position.x);
            ctx.fillText(lines[i], x, y);
        }

        ctx.save();
    }

    componentDidMount() {
        this.chartInstance = new Chart(this.canvas, {
            type: this.props.type,
            data: this.props.data,
            options: this.props.options,
            plugins: this.props.plugins
        });
        try{this.props.chartHandle(this.chartInstance);}catch(e){}
    }

    componentWillReceiveProps(nextProps) {
        const nextData = deepEqual(this.props.data, nextProps.data);
        const nextOptions = deepEqual(this.props.options, nextProps.options);
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
    /*  nukeAnnotation(e,index){
          const chart = this.chartInstance;
          chart.config.options.annotation.annotations.splice(index,1);
          let annotationsArray=chart.config.options.annotation.annotations;
          chart.update();
          return annotationsArray;

      }*/
    /*addAnnotation(e,chart,beginDate,endDate,title){
        console.log('add annotation callback',beginDate,endDate);
        //dealing with client offset for responsive adding of annotations

    };*/

    render() {
        let {clickHandler} = this.props;
        return (
            <div id={`chart${this.props.title}`}>
                <canvas
                    width={this.props.width}
                    height={this.props.height}
                    ref={canvas => this.canvas = canvas}
                />

            </div>
        );
    }
}

CoreTempChartWrapper.propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    options: PropTypes.object,
    plugins: PropTypes.array
};
CoreTempChartWrapper.defaultProps = {
    plugins: []
};

export default CoreTempChartWrapper;