import React, { Component } from "react";
//import '../../css/dashboard.css';
import Highcharts from "highcharts";
import variablePie from "highcharts/modules/variable-pie";
import HighchartsReact from "highcharts-react-official";

import ReactHighcharts from "react-highcharts";
import HighchartsMore from "highcharts/highcharts-more";

import highcharts3d from "highcharts/highcharts-3d";
import ProgressBar from "@ramonak/react-progress-bar";

import { Select, DatePicker } from "antd";
import moment from "moment";
const dateFormat = "YYYY/MM/DD";
// const customFormat = value => `custom format: ${value.format(dateFormat)}`;
const { Option } = Select;

function onChange(date, dateString) {
  console.log(date, dateString);
}

variablePie(Highcharts);
highcharts3d(Highcharts);
HighchartsMore(ReactHighcharts.Highcharts);

function handleChange(value) {
  console.log(`selected ${value}`);
}

class WalletToAccount3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDivHeight: null,

      options: {
        chart: {
          type: "pie",
          height: 300,
          options3d: {
            enabled: true,
            alpha: 20,
            beta: 25,
          },
        },
        credits: {
          enabled: false,
        },
        title: {
          text: "",
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            depth: 20,
            showInLegend: true,
            dataLabels: {
              enabled: false,
              format: "{point.name}",
            },
          },
        },
        legend: {
          align: "left",
          verticalAlign: "bottom",
          layout: "horizontal",
          // x: -50,
          // y: 120,
          symbolPadding: 0,
          symbolWidth: 0.1,
          symbolHeight: 0.1,
          symbolRadius: 0,
          useHTML: true,
          symbolWidth: 0,
          labelFormatter: function () {
            return (
              '<div><div class="dsFle"><span class="chartDot" style="border:2px solid ' +
              this.color +
              '"></span>' +
              this.name +
              " (" +
              this.y +
              "%)</div></div>"
            );
          },
          itemStyle: {
            color: "#343A40",
            fontWeight: "bold",
            fontSize: "14px",
            lineHeight: "20px",
            fontFamily: "Lato",
          },
        },
        series: [
          {
            type: "pie",
            name: " ",
            slicedOffset: 15,
            borderColor: "white",
            data: [
              {
                name: "AGENT",
                y: 20,
                sliced: true,
                color: "#FF3A2F",
              },
              {
                name: "MERCHANT",
                y: 80,
                sliced: true,
                selected: true,
                color: "#787878",
              },
            ],
          },
        ],
      },
      transectionPerc1: {
        chart: {
          type: "pie",
          height: 300,
          options3d: {
            enabled: true,
            alpha: 20,
            beta: 20,
          },
        },
        credits: {
          enabled: false,
        },
        title: {
          text: "",
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            depth: 20,
            showInLegend: true,
            dataLabels: {
              enabled: false,
              format: "{point.name}",
            },
          },
        },
        legend: {
          align: "left",
          verticalAlign: "bottom",
          layout: "horizontal",
          // x: -50,
          // y: 120,
          symbolPadding: 0,
          symbolWidth: 0.1,
          symbolHeight: 0.1,
          symbolRadius: 0,
          useHTML: true,
          symbolWidth: 0,
          labelFormatter: function () {
            return (
              '<div><div class="dsFle"><span class="chartDot" style="border:2px solid ' +
              this.color +
              '"></span>' +
              this.name +
              " (" +
              this.y +
              "%)</div></div>"
            );
          },
          itemStyle: {
            color: "#343A40",
            fontWeight: "bold",
            fontSize: "14px",
            lineHeight: "20px",
            fontFamily: "Lato",
          },
        },
        series: [
          {
            type: "pie",
            name: " ",
            slicedOffset: 10,
            borderColor: "white",
            data: [
              {
                name: "Shop 1 (40%)",
                y: 40,
                sliced: true,
                color: "#757575",
              },
              {
                name: "Shop 2 (20%)",
                y: 40,
                sliced: true,
                color: "#ADAEB0",
              },
              {
                name: "Shop 3 (20%)",
                y: 70,
                sliced: true,
                color: "#FE514E",
              },
              {
                name: "Shop 4  (20%)",
                y: 60,
                sliced: true,
                color: "#434343",
              },
            ],
          },
        ],
      },
      transectionPerc: {
        chart: {
          type: "pie",
          height: 300,
          options3d: {
            enabled: true,
            alpha: 20,
            beta: 20,
          },
        },
        credits: {
          enabled: false,
        },
        title: {
          text: "",
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            depth: 20,
            showInLegend: true,
            dataLabels: {
              enabled: false,
              format: "{point.name}",
            },
          },
        },
        legend: {
          align: "left",
          verticalAlign: "bottom",
          layout: "horizontal",
          // x: -50,
          // y: 120,
          symbolPadding: 0,
          symbolWidth: 0.1,
          symbolHeight: 0.1,
          symbolRadius: 0,
          useHTML: true,
          symbolWidth: 0,
          labelFormatter: function () {
            return (
              '<div><div class="dsFle"><span class="chartDot" style="border:2px solid ' +
              this.color +
              '"></span>' +
              this.name +
              " (" +
              this.y +
              "%)</div></div>"
            );
          },
          itemStyle: {
            color: "#343A40",
            fontWeight: "bold",
            fontSize: "14px",
            lineHeight: "20px",
            fontFamily: "Lato",
          },
        },
        series: [
          {
            type: "pie",
            name: " ",
            slicedOffset: 10,
            borderColor: "white",
            data: [
              {
                name: "DEPOSIT",
                y: 40,
                sliced: true,
                color: "#757575",
              },
              {
                name: "PAYOUT",
                y: 40,
                sliced: true,
                color: "#ADAEB0",
              },
              {
                name: "TRANSFER",
                y: 70,
                sliced: true,
                color: "#FE514E",
              },
              {
                name: "OTHERS",
                y: 60,
                sliced: true,
                color: "#434343",
              },
            ],
          },
        ],
      },
      toAmountColl: {
        chart: {
          type: "line",
          height: 400,
        },
        credits: {
          enabled: false,
        },
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },
        xAxis: {
          categories: [
            "29 March",
            "30 March",
            "31 March",
            "1 Apr",
            "2 Apr",
            "3 Apr",
            "4 Apr",
            "5 Apr",
            "6 Apr",
            "7 Apr",
            "8 Apr",
            "9 Apr",
            "10 Apr",
            "11 Apr",
            "12 Apr",
            "13 Apr",
            "14 Apr",
            "15 Apr",
            "16 Apr",
            "17 Apr",
            "18 Apr",
            "19 Apr",
            "20 Apr",
            "21 Apr",
            "22 Apr",
            "23 Apr",
            "24 Apr",
          ],
          crosshair: true,
          // minorTickLength: 0,
          // tickLength: 0
        },
        yAxis: {
          title: {
            text: "",
          },
          opposite: false,
          max: 150000,
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
            },
            enableMouseTracking: false,
          },
        },
        legend: {
          labelFormatter: function () {
            return (
              '<span class="lineCircleSty"><span class=""></span>' +
              this.name +
              "</span>"
            );
          },
          layout: "horizontal",
          align: "left",
          verticalAlign: "bottom",
          // symbolWidth: 20,
          // symbolHeight: 20,
          itemStyle: {
            color: "red",
            fontWeight: "bold",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: "500",
            color: "#343A40",
            textTransform: "uppercase",
          },
        },
        series: [
          {
            name: "Quick Ratio",
            color: "#E64C43",
            marker: {
              enabled: false,
              radius: 4,
            },
            dataLabels: {
              enabled: false,
            },
            data: [
              90000, 40000, 15000, 1000, 20000, 50000, 80000, 40000, 12000,
              13000, 18000, 49000,
            ],
          },
          {
            name: "Cash ratio",
            color: "#343A40",
            marker: {
              enabled: false,
              radius: 4,
            },
            dataLabels: {
              enabled: false,
            },
            data: [
              0, 8000, 80000, 90000, 20000, 35000, 80000, 40000, 12000, 13000,
              18000, 49000,
            ],
          },
          // {
          //   name: 'Transfer',
          //   color: "#93F035",
          //   marker: {
          //     enabled: false,
          //     radius: 4
          //   },
          //   dataLabels: {
          //     enabled: false
          //   },
          //   data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          // }
        ],
      },
      toAmountColl1: {
        chart: {
          type: "line",
          height: 400,
        },
        credits: {
          enabled: false,
        },
        title: {
          text: "",
        },
        subtitle: {
          text: "",
        },
        xAxis: {
          categories: [
            "29 March",
            "30 March",
            "31 March",
            "1 Apr",
            "2 Apr",
            "3 Apr",
            "4 Apr",
            "5 Apr",
            "6 Apr",
            "7 Apr",
            "8 Apr",
            "9 Apr",
            "10 Apr",
            "11 Apr",
            "12 Apr",
            "13 Apr",
            "14 Apr",
            "15 Apr",
            "16 Apr",
            "17 Apr",
            "18 Apr",
            "19 Apr",
            "20 Apr",
            "21 Apr",
            "22 Apr",
            "23 Apr",
            "24 Apr",
          ],
          crosshair: true,
          // minorTickLength: 0,
          // tickLength: 0
        },
        yAxis: {
          title: {
            text: "",
          },
          opposite: false,
          max: 150000,
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true,
            },
            enableMouseTracking: false,
          },
        },
        legend: {
          labelFormatter: function () {
            return (
              '<span class="lineCircleSty"><span class=""></span>' +
              this.name +
              "</span>"
            );
          },
          layout: "horizontal",
          align: "left",
          verticalAlign: "bottom",
          // symbolWidth: 20,
          // symbolHeight: 20,
          itemStyle: {
            color: "red",
            fontWeight: "bold",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: "500",
            color: "#343A40",
            textTransform: "uppercase",
          },
        },
        series: [
          {
            name: "Earned",
            color: "#DA4139",
            marker: {
              enabled: false,
              radius: 4,
            },
            dataLabels: {
              enabled: false,
            },
            data: [
              90000, 40000, 15000, 1000, 20000, 50000, 80000, 40000, 12000,
              13000, 18000, 49000,
            ],
          },
          //  {
          //   name: 'Cash ratio',
          //   color: "#343A40",
          //   marker: {
          //     enabled: false,
          //     radius: 4
          //   },
          //   dataLabels: {
          //     enabled: false
          //   },
          //   data: [0, 8000, 80000, 90000, 20000, 35000, 80000, 40000, 12000, 13000, 18000, 49000]
          // },
          // {
          //   name: 'Transfer',
          //   color: "#93F035",
          //   marker: {
          //     enabled: false,
          //     radius: 4
          //   },
          //   dataLabels: {
          //     enabled: false
          //   },
          //   data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          // }
        ],
      },
      chartMerchant: {
        chart: {
          type: "column",
          height: 200,
        },
        title: {
          text: "",
        },
        yAxis: {
          title: {
            text: "",
          },
          // min: 25000,
          max: 50000,
        },
        xAxis: {
          labels: {
            enabled: false,
          },

          type: "category",
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: "transparent",
          minorTickLength: 0,
          tickLength: 0,
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          series: {
            groupPadding: 0.15,
            borderRadius: 8,
          },
          column: {
            grouping: true,
            borderRadiusTopLeft: 10,
            borderRadiusTopRight: 10,
          },
        },
        series: [
          {
            color: "#E65354",
            data: [26000, 50000, 45000, 28000],
          },
          //  {
          //   color: "#716D6C",
          //   data: [32000, 35000, 28000, 35000, 31000]
          // }
        ],
      },
      chartAgent: {
        chart: {
          type: "column",
          height: 200,
        },
        title: {
          text: "",
        },
        yAxis: {
          title: {
            text: "",
          },
          // min: 25000,
          max: 50000,
        },
        xAxis: {
          labels: {
            enabled: true,
          },
          type: "category",
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: "transparent",
          minorTickLength: 0,
          tickLength: 0,
        },
        credits: {
          enabled: false,
        },
        // legend: {
        //   enabled: true,
        // },
        plotOptions: {
          series: {
            groupPadding: 0.15,
            borderRadius: 8,
          },
          column: {
            grouping: true,
          },
        },
        series: [
          {
            color: "#423939",
            data: [25000, 35000, 30000, 28000, 26000],
          },
          {
            color: "#716D6C",
            data: [32000, 35000, 28000, 35000, 31000],
          },
        ],
      },

      colors: Highcharts.setOptions({
        colors: ["#fff", "red"],
      }),

      chartRevenue: {
        chart: {
          zoomType: "x",
          height: 200,
          type: "area",
        },
        credits: {
          enabled: false,
        },
        title: {
          text: "",
        },
        subtitle: {
          text:
            document.ontouchstart === undefined
              ? "Click and drag in the plot area to zoom in"
              : "Pinch the chart to zoom in",
        },
        xAxis: {
          lineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: "transparent",
          minorTickLength: 0,
          tickLength: 0,
          labels: {
            enabled: false,
          },
        },
        yAxis: {
          title: {
            text: "",
          },
          // min: 0,
          // max:40
        },
        legend: {
          enabled: false,
        },

        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, "#FF0000"],
                [
                  1,
                  Highcharts.color(Highcharts.getOptions().colors[0])
                    .setOpacity(0)
                    .get("rgba"),
                ],
              ],
            },

            marker: {
              radius: 2,
              enabled: false,
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1,
              },
            },
            threshold: null,
          },
        },

        series: [
          {
            type: "area",
            name: "",
            data: [
              null,
              null,
              null,
              null,
              null,
              6,
              11,
              32,
              110,
              235,
              369,
              640,
              1005,
              1436,
              2063,
              3057,
              4618,
              6444,
              9822,
              15468,
              20434,
              24126,
              27387,
              29459,
              31056,
              31982,
              32040,
              31233,
              29224,
              27342,
              26662,
              26956,
              27912,
              28999,
              28965,
              27826,
              25579,
              25722,
              24826,
              24605,
              24304,
              23464,
              23708,
              24099,
              24357,
              24237,
              24401,
              24344,
              23586,
              22380,
              21004,
              17287,
              14747,
              13076,
              12555,
              12144,
              11009,
              10950,
              10871,
              10824,
              10577,
              10527,
              10475,
              10421,
              10358,
              10295,
              10104,
              9914,
              9620,
              9326,
              5113,
              5113,
              4954,
              4804,
              4761,
              4717,
              4368,
              4018,
            ],
          },
        ],
      },
    };
  }

  componentDidMount() {
    const fromDivHeight = document.querySelector(".getHeight").clientHeight;
    this.setState(
      {
        fromDivHeight: fromDivHeight,
      },
      () => {
        console.log("test001", this.state.fromDivHeight);
      }
    );
  }

  render() {
    return (
      <div className="main_contain">
        <div className="dashboard_wraps">
          <div className="section_custom">
            <div className="sectionInn">
              <div className="chartCard_w m_r24 getHeight">
                <div className="chartgraycard chartCardTop">
                  <div className="flCenterColumn">
                    <h1 className="commonHeading textAlignCenter">Transfer</h1>
                    {/* <h6 className="commonHeadingSmall color6E6E70">as of 29 March 2021, 09:41 PM</h6> */}
                  </div>
                </div>
                <div className="chartCardMiddle" style={{ padding: "12px" }}>
                  <div className="customdashboardrow dashCards section_custom">
                    <div className="custom_row">
                      <div className="custom_col width3">
                        <div className="dcard">
                          <div className="icNa">
                            <div className="cardrightVal width50p">
                              <p>Wallet to Wallet</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="custom_col width3">
                        <div className="dcard">
                          <div className="icNa">
                            <div className="cardrightVal width50p">
                              <p>Wallet to Account</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default WalletToAccount3;
