import React, { Component } from "react";
import "../../css/dashboard.css";
import Highcharts from "highcharts";
import variablePie from "highcharts/modules/variable-pie.js";
import HighchartsReact from "highcharts-react-official";

import ReactHighcharts from "react-highcharts";
import HighchartsMore from "highcharts/highcharts-more";

import highcharts3d from "highcharts/highcharts-3d";
import ProgressBar from "@ramonak/react-progress-bar";
import { connect } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import { ListItem, ListItemText } from "@material-ui/core";

import {
  getProfile,
  fetchAgentWallet,
  fetchAgentBankAccounts,
  getAllAgentMemberLists,
  getTickets,
} from "../../../src/services/agent/action";

import { Select, DatePicker } from "antd";
import moment from "moment";
import { FormattedMessage, IntlProvider } from "react-intl";
import { NavLink } from "react-router-dom";
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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDivHeight: null,
      profileImage: null,

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

      messages: "",
      language: "",
      agentType: "",
      walletBalance: 0,
      profileData: [],

      numberOfAgents: 0,
      numberOfAgentMembers: 0,
      numberOfTickets: 0,
    };
  }

  async translationHelperFunction() {
    const messages = await this.loadLocaleData(localStorage.getItem("lang"));
    this.setState({
      messages: messages,
      language: localStorage.getItem("lang"),
    });
    // console.log(messages.default, "MESSAGES", localStorage.getItem("lang"), "LANGUAGE");
  }

  loadLocaleData = (locale) => {
    switch (locale) {
      case "fr":
        return import("../i18n/messages/fr.js");
      default:
        return import("../i18n/messages/en.js");
    }
  };

  componentDidMount() {
    this.props.getTickets(sessionStorage.getItem("token"));

    this.props.getAllAgentMemberLists();

    this.props.fetchAgentWallet(sessionStorage.getItem("token"));

    if (document.querySelector(".getHeight") != null) {
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
    this.props.getProfile();

    this.translationHelperFunction();
  }

  componentDidUpdate(prevProps, nextProps) {
    console.log("dashboard component did update.");
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.ticketsData) {
    } else {
      this.setState({
        numberOfTickets: 0,
      });
    }

    if (nextProps.getAllAgentMemberList) {
      let filteredAgentList = nextProps.getAllAgentMemberList.filter((data) => {
        if (data.agentType === "AGENT") {
          return data;
        }
      });

      let filteredAgentMemberList = nextProps.getAllAgentMemberList.filter(
        (data) => {
          if (data.agentType === "AGENT_MEMBER") {
            return data;
          }
        }
      );

      if (filteredAgentMemberList.length > 0) {
        this.setState({
          numberOfAgentMembers: filteredAgentMemberList.length,
        });
      } else {
        this.setState({
          numberOfAgentMembers: 0,
        });
      }

      if (filteredAgentList.length > 0) {
        this.setState({
          numberOfAgents: filteredAgentList.length,
        });
      } else {
        this.setState({
          numberOfAgents: 0,
        });
      }
    }

    if (nextProps.walletAccount.data) {
      this.setState({
        walletBalance:
          nextProps.walletAccount.data.balance +
          " " +
          nextProps.walletAccount.data.currencyCode,
      });
    }

    if (nextProps.profileImageStatus) {
      var blob = new Blob([nextProps.profileImage], {
        type: "application/octet-stream",
      });

      const value = URL.createObjectURL(blob);
      this.setState({
        profileImage: value,
      });
    }

    if (nextProps.profile.data !== null) {
      // console.log(nextProps.profile.data.agentType, "PROFILE");

      this.setState(
        {
          agentType: nextProps.profile.data.agentType,
          profileData: nextProps.profile.data,
        },
        () => {
          console.log(this.state.profileData, "AGENT PROFILE DATA");
        }
      );
    }

    if (nextProps.language) {
      const messages = await this.loadLocaleData(nextProps.language);

      this.setState({
        messages: messages,
        language: nextProps.language,
      });
    }
  }

  loadingProfileName = () => {
    return (
      <React.Fragment>
        <Skeleton variant="text" width={100} style={{ margin: "auto" }} />
      </React.Fragment>
    );
  };

  render() {
    return (
      <IntlProvider
        messages={this.state.messages.default}
        locale={this.state.language}
      >
        {this.state.agentType === "AGENT" ||
        this.state.agentType === "AGENT_MEMBER" ||
        this.state.agentType === "AGENT_BANKER" ? (
          <>
            <div className="main_contain agentdashboardStyle">
              <div className="dashboard_wraps">
                <div className="customdashboardwholerow">
                  {this.state.agentType !== "AGENT_MEMBER" ? (
                    <>
                      <div className="customdashboardrow dashCards section_custom">
                        <div className="custom_row">
                          {this.state.agentType !== "AGENT" && (
                            <>
                              <div className="custom_col width3">
                                <div className="dcard">
                                  <div className="icNa">
                                    <div className="cardrightVal">
                                      <p>
                                        <FormattedMessage id="agent.TotalAgents" />
                                      </p>
                                      <div className="cardnumber">
                                        {this.state.numberOfAgents}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          <div className="custom_col width3">
                            <NavLink
                              to="/settings/agent-member"
                              style={{ textDecoration: "none" }}
                            >
                              <div className="dcard">
                                <div className="icNa">
                                  <div className="cardrightVal width50p">
                                    <p>
                                      <FormattedMessage id="agent.TotalAgentMember" />
                                    </p>
                                    <div className="cardnumber">
                                      {this.state.numberOfAgentMembers}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </NavLink>
                          </div>

                          {this.state.agentType !== "AGENT" &&
                            this.state.agentType !== "AGENT_BANKER" && (
                              <>
                                <div className="custom_col width3">
                                  <div className="dcard">
                                    <div className="icNa">
                                      <div className="cardrightVal width50p">
                                        <p>Total Plans</p>
                                        <div className="cardnumber">213</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}

                          <div className="custom_col width3">
                            <div className="dcard">
                              <div className="icNa">
                                <div className="cardrightVal width50p">
                                  <p>
                                    <FormattedMessage id="agent.LiquidityBalance" />
                                  </p>
                                  <div className="cardnumber">
                                    {this.state.walletBalance
                                      ? this.state.walletBalance
                                      : 0}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="custom_col width3">
                            <NavLink
                              to="/agent/tickets"
                              style={{ textDecoration: "none" }}
                            >
                              <div className="dcard">
                                <div className="icNa">
                                  <div className="cardrightVal width50p">
                                    <p>Total Tickets</p>
                                    <div className="cardnumber">
                                      {this.state.numberOfTickets}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </NavLink>
                          </div>
                          {this.state.agentType !== "AGENT" &&
                            this.state.agentType !== "AGENT_BANKER" && (
                              <>
                                <div className="custom_col width3">
                                  <div className="dcard">
                                    <div className="icNa">
                                      <div className="cardrightVal width50p">
                                        <p>Total Clients</p>
                                        <div className="cardnumber">100</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                        </div>
                      </div>
                      <div className="customdashboardrow1">
                        <div className="customdashboardrow1-heading">
                          <h4>
                            <FormattedMessage id="agent.AgentInfo" />
                          </h4>
                        </div>
                        <div className="customdashboardrow1-image">
                          {/* <img src="../../propic.jpg" /> */}
                          {this.props.profileImageStatus ? (
                            <img
                              src={this.state.profileImage}
                              alt="profile pic"
                            />
                          ) : (
                            <img src="../../propic.jpg" />
                          )}
                        </div>
                        <div className="customdashboardrow1-image-name">
                          {this.props.profile.loading
                            ? this.loadingProfileName()
                            : this.props.profile.data.firstName +
                              " " +
                              this.props.profile.data.lastName}
                        </div>
                        <div className="customdashboardrow1-label-whole">
                          <div className="customdashboardrow1-label">
                            <label>
                              <FormattedMessage id="agent.IDNumber" />:
                            </label>
                            <span>
                              {
                                this.state.profileData.idDocuments[0]
                                  .documentIdNumber
                              }
                            </span>
                          </div>
                          <div className="line-separator"></div>
                          <div className="customdashboardrow1-label">
                            <label>
                              <FormattedMessage id="agent.email" />:
                            </label>
                            <span>
                              {this.state.profileData.agentEmailAddress}
                            </span>
                          </div>
                          <div className="line-separator"></div>
                          <div className="customdashboardrow1-label">
                            <label>
                              <FormattedMessage id="agent.PhoneNo" />:{" "}
                            </label>
                            <span>{this.state.profileData.phoneNo}</span>
                          </div>
                          <div className="line-separator"></div>
                          <div className="customdashboardrow1-label">
                            <label>
                              <FormattedMessage id="agent.Address" />:{" "}
                            </label>
                            <span>{this.state.profileData.address}</span>
                          </div>
                          <div className="line-separator"></div>
                          {/* <div className="customdashboardrow1-label">
                            <label><FormattedMessage id="agent.Geolocalisation" />: </label>
                            <span>41° N & 28° E.</span>
                          </div>
                          <div className="location-btn">
                            <button>

                              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 1.67969C5.23969 1.67969 3 3.69563 3 6.17969C3 10.1797 8 15.6797 8 15.6797C8 15.6797 13 10.1797 13 6.17969C13 3.69563 10.7603 1.67969 8 1.67969ZM8 8.67969C7.60444 8.67969 7.21776 8.56239 6.88886 8.34263C6.55996 8.12286 6.30362 7.81051 6.15224 7.44505C6.00087 7.0796 5.96126 6.67747 6.03843 6.28951C6.1156 5.90155 6.30608 5.54518 6.58579 5.26547C6.86549 4.98577 7.22186 4.79529 7.60982 4.71812C7.99778 4.64095 8.39991 4.68055 8.76537 4.83193C9.13082 4.9833 9.44318 5.23965 9.66294 5.56855C9.8827 5.89745 10 6.28412 10 6.67969C9.99942 7.20994 9.78852 7.71831 9.41357 8.09326C9.03863 8.46821 8.53026 8.67911 8 8.67969Z" fill="white" />
                              </svg>
                              <span><FormattedMessage id="agent.SeeLocation" /></span>
                            </button>
                          </div> */}
                        </div>
                      </div>
                    </>
                  ) : (
                    //IF IT IS AGENT MEMBER, SHOW ONLY PROFILE INFO FULL WIDTH
                    <>
                      <div
                        className="customdashboardrow1"
                        style={{ width: "100%" }}
                      >
                        <div className="customdashboardrow1-heading">
                          <h4>
                            <FormattedMessage id="agent.AgentInfo" />
                          </h4>
                        </div>
                        <div className="customdashboardrow1-image">
                          {/* <img src="../../propic.jpg" /> */}
                          {this.props.profileImageStatus ? (
                            <img
                              src={this.state.profileImage}
                              alt="profile pic"
                            />
                          ) : (
                            <img src="../../propic.jpg" />
                          )}
                        </div>
                        <div className="customdashboardrow1-image-name">
                          {this.props.profile.loading
                            ? this.loadingProfileName()
                            : this.props.profile.data.firstName +
                              " " +
                              this.props.profile.data.lastName}
                        </div>
                        <div className="customdashboardrow1-label-whole">
                          <div className="customdashboardrow1-label">
                            <label>
                              <FormattedMessage id="agent.IDNumber" />:
                            </label>
                            <span>
                              {
                                this.state.profileData.idDocuments[0]
                                  .documentIdNumber
                              }
                            </span>
                          </div>
                          <div className="line-separator"></div>
                          <div className="customdashboardrow1-label">
                            <label>
                              <FormattedMessage id="agent.email" />:
                            </label>
                            <span>
                              {this.state.profileData.agentEmailAddress}
                            </span>
                          </div>
                          <div className="line-separator"></div>
                          <div className="customdashboardrow1-label">
                            <label>
                              <FormattedMessage id="agent.PhoneNo" />:{" "}
                            </label>
                            <span>{this.state.profileData.phoneNo}</span>
                          </div>
                          <div className="line-separator"></div>
                          <div className="customdashboardrow1-label">
                            <label>
                              <FormattedMessage id="agent.Address" />:{" "}
                            </label>
                            <span>{this.state.profileData.address}</span>
                          </div>
                          {/* <div className="line-separator"></div>
                          <div className="customdashboardrow1-label">
                            <label><FormattedMessage id="agent.Geolocalisation" />: </label>
                            <span>41° N & 28° E.</span>
                          </div>
                          <div className="location-btn">
                            <button>

                              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 1.67969C5.23969 1.67969 3 3.69563 3 6.17969C3 10.1797 8 15.6797 8 15.6797C8 15.6797 13 10.1797 13 6.17969C13 3.69563 10.7603 1.67969 8 1.67969ZM8 8.67969C7.60444 8.67969 7.21776 8.56239 6.88886 8.34263C6.55996 8.12286 6.30362 7.81051 6.15224 7.44505C6.00087 7.0796 5.96126 6.67747 6.03843 6.28951C6.1156 5.90155 6.30608 5.54518 6.58579 5.26547C6.86549 4.98577 7.22186 4.79529 7.60982 4.71812C7.99778 4.64095 8.39991 4.68055 8.76537 4.83193C9.13082 4.9833 9.44318 5.23965 9.66294 5.56855C9.8827 5.89745 10 6.28412 10 6.67969C9.99942 7.20994 9.78852 7.71831 9.41357 8.09326C9.03863 8.46821 8.53026 8.67911 8 8.67969Z" fill="white" />
                              </svg>
                              <span><FormattedMessage id="agent.SeeLocation" /></span>
                            </button>
                          </div> */}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* SHOW TRANSACTIONS PER AGENT MEMBER ONLY TAKING FULL WIDTH */}
                {this.state.agentType === "AGENT" ? (
                  <>
                    <div className="section_custom">
                      <div
                        className="sectionInn chartCardColumn"
                        style={{ height: "400px" }}
                      >
                        <div
                          className="chartCard_w width100p m_r24 getHeight"
                          style={{
                            marginTop: "-8%",
                            height: "-webkit-fill-available",
                          }}
                        >
                          <div className="chartgraycard chartCardTop">
                            <div>
                              <h1 className="commonHeading">
                                <FormattedMessage id="agent.TransactionsPerAgent" />{" "}
                                Member
                              </h1>
                            </div>
                            <div className="hSelect">
                              <div className="antdSelect">
                                <Select
                                  defaultValue="XAF"
                                  style={{ width: 114, height: 32 }}
                                  onChange={handleChange}
                                >
                                  <Option value="EN">XAF</Option>
                                  <Option value="FR">Doller</Option>
                                </Select>
                              </div>
                            </div>
                          </div>
                          <div className="chartCardMiddle">
                            <div className="chartTabs">
                              <ul>
                                <li className="active">
                                  <FormattedMessage id="agent.Today" />
                                </li>
                                <li>
                                  <FormattedMessage id="agent.ThisWeek" />
                                </li>
                                <li>
                                  <FormattedMessage id="agent.7Days" />
                                </li>
                                <li>This Month</li>
                                <li>
                                  <FormattedMessage id="agent.LastMonth" />
                                </li>
                              </ul>
                            </div>

                            <div className="custom-top-spacing hichchartIn0">
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={this.state.chartMerchant}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  // AGENT BANKER WILL SEE BELOW
                  <>
                    {this.state.agentType !== "AGENT_MEMBER" && (
                      <>
                        <div className="section_custom">
                          <div
                            className="sectionInn chartCardColumn"
                            style={{ height: "400px" }}
                          >
                            <div
                              className="chartCard_w width50p m_r24 getHeight"
                              style={{
                                marginTop: "-8%",
                                height: "-webkit-fill-available",
                              }}
                            >
                              <div className="chartgraycard chartCardTop">
                                <div>
                                  <h1 className="commonHeading">
                                    <FormattedMessage id="agent.TransactionsPerAgent" />
                                  </h1>
                                </div>
                                <div className="hSelect">
                                  <div className="antdSelect">
                                    <Select
                                      defaultValue="XAF"
                                      style={{ width: 114, height: 32 }}
                                      onChange={handleChange}
                                    >
                                      <Option value="EN">XAF</Option>
                                      <Option value="FR">Doller</Option>
                                    </Select>
                                  </div>
                                </div>
                              </div>
                              <div className="chartCardMiddle">
                                <div className="chartTabs">
                                  <ul>
                                    <li className="active">
                                      <FormattedMessage id="agent.Today" />
                                    </li>
                                    <li>
                                      <FormattedMessage id="agent.ThisWeek" />
                                    </li>
                                    <li>
                                      <FormattedMessage id="agent.7Days" />
                                    </li>
                                    <li>This Month</li>
                                    <li>
                                      <FormattedMessage id="agent.LastMonth" />
                                    </li>
                                  </ul>
                                </div>

                                <div className="custom-top-spacing hichchartIn0">
                                  <HighchartsReact
                                    highcharts={Highcharts}
                                    options={this.state.chartMerchant}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="chartCard_w width50p getHeight">
                              <div className="chartgraycard chartCardTop">
                                <div>
                                  <h1 className="commonHeading">
                                    Transaction Per Agent Member
                                  </h1>
                                </div>

                                <div className="hSelect">
                                  <div className="antdSelect">
                                    <Select
                                      defaultValue="XAF"
                                      style={{ width: 114, height: 32 }}
                                      onChange={handleChange}
                                    >
                                      <Option value="EN">XAF</Option>
                                      <Option value="FR">Doller</Option>
                                    </Select>
                                  </div>
                                </div>
                              </div>
                              <div className="chartCardMiddle">
                                <div className="chartTabs">
                                  <ul>
                                    <li className="active">
                                      <FormattedMessage id="agent.Today" />
                                    </li>
                                    <li>
                                      <FormattedMessage id="agent.ThisWeek" />
                                    </li>
                                    <li>
                                      <FormattedMessage id="agent.7Days" />
                                    </li>
                                    <li>This Month</li>
                                    <li>
                                      <FormattedMessage id="agent.LastMonth" />
                                    </li>
                                  </ul>
                                </div>

                                <div className="custom-top-spacing hichchartIn0">
                                  <HighchartsReact
                                    highcharts={Highcharts}
                                    options={this.state.chartMerchant}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
                {this.state.agentType !== "AGENT_MEMBER" && (
                  <>
                    <div className="section_custom">
                      <div className="sectionInn chartCardColumn">
                        <div className="amountcollectedcard chartCard_w width50p getHeight">
                          <div className="chartgraycard chartCardTop">
                            <h1 className="commonHeading">
                              <FormattedMessage id="agent.Transactions%ofAssets" />
                            </h1>
                            <div className="hSelect">
                              <div className="antdSelect">
                                <Select
                                  defaultValue="XAF"
                                  style={{ width: 114, height: 32 }}
                                  onChange={handleChange}
                                >
                                  <Option value="EN">XAF</Option>
                                  <Option value="FR">Doller</Option>
                                </Select>
                              </div>
                            </div>
                          </div>
                          <div className="chartCardMiddle">
                            <div className="chartTabs">
                              <ul>
                                <li className="active">
                                  <FormattedMessage id="agent.Today" />
                                </li>
                                <li>
                                  <FormattedMessage id="agent.ThisWeek" />
                                </li>
                                <li>
                                  <FormattedMessage id="agent.7Days" />
                                </li>
                                <li>This Month</li>
                                <li>
                                  <FormattedMessage id="agent.LastMonth" />
                                </li>
                              </ul>
                            </div>
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={this.state.transectionPerc}
                            />
                          </div>
                        </div>
                        <div className="amountcollectedcard chartCard_w width50p getHeight">
                          <div className="chartgraycard chartCardTop">
                            <h1 className="commonHeading">
                              <FormattedMessage id="agent.Transactions%ofCategory" />
                            </h1>
                            <div className="hSelect">
                              <div className="antdSelect">
                                <Select
                                  defaultValue="XAF"
                                  style={{ width: 114, height: 32 }}
                                  onChange={handleChange}
                                >
                                  <Option value="EN">XAF</Option>
                                  <Option value="FR">Doller</Option>
                                </Select>
                              </div>
                            </div>
                          </div>
                          <div className="chartCardMiddle">
                            <div className="chartTabs">
                              <ul>
                                <li className="active">
                                  <FormattedMessage id="agent.Today" />
                                </li>
                                <li>
                                  <FormattedMessage id="agent.ThisWeek" />
                                </li>
                                <li>
                                  <FormattedMessage id="agent.7Days" />
                                </li>
                                <li>This Month</li>
                                <li>
                                  <FormattedMessage id="agent.LastMonth" />
                                </li>
                              </ul>
                            </div>
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={this.state.transectionPerc1}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="section_custom">
                      <div className="sectionInn">
                        <div className="chartCard_w m_r24 getHeight">
                          <div className="chartgraycard chartCardTop">
                            <div className="flCenterColumn">
                              <h1 className="commonHeading textAlignCenter">
                                <FormattedMessage id="agent.Last30DaysTransaction" />
                              </h1>
                              {/* <h6 className="commonHeadingSmall color6E6E70">as of 29 March 2021, 09:41 PM</h6> */}
                            </div>
                          </div>
                          <div
                            className="chartCardMiddle"
                            style={{ padding: "12px" }}
                          >
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={this.state.toAmountColl}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="section_custom">
                      <div className="sectionInn">
                        <div className="chartCard_w m_r24 getHeight">
                          <div className="chartCardTop">
                            <div className="flCenterColumn">
                              <h1 className="commonHeading textAlignCenter">
                                <FormattedMessage id="agent.Last12weeksFeesEarned" />
                              </h1>
                              {/* <h6 className="commonHeadingSmall color6E6E70">as of 29 March 2021, 09:41 PM</h6> */}
                            </div>
                          </div>
                          <div
                            className="chartCardMiddle"
                            style={{ padding: "12px" }}
                          >
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={this.state.toAmountColl1}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="section_custom">
                      <div className="sectionInn">
                        <div className="chartCard_w m_r24 getHeight">
                          <div className="chartCardTop">
                            <div className="flCenterColumn">
                              <h1 className="commonHeading textAlignCenter">
                                <FormattedMessage id="agent.Last30DaysLiquiditybalance" />
                              </h1>
                              {/* <h6 className="commonHeadingSmall color6E6E70">as of 29 March 2021, 09:41 PM</h6> */}
                            </div>
                          </div>
                          <div
                            className="chartCardMiddle"
                            style={{ padding: "12px" }}
                          >
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={this.state.toAmountColl1}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="section_custom">
                      <div className="sectionInn">
                        <div className="chartCard_w m_r24 getHeight">
                          <div className="chartCardTop">
                            <div className="flCenterColumn">
                              <h1 className="commonHeading textAlignCenter">
                                <FormattedMessage id="agent.Last12weeksFeesEarned" />
                              </h1>
                              {/* <h6 className="commonHeadingSmall color6E6E70">as of 29 March 2021, 09:41 PM</h6> */}
                            </div>
                          </div>
                          <div
                            className="chartCardMiddle"
                            style={{ padding: "12px" }}
                          >
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={this.state.toAmountColl1}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <>
                  <div className="section_custom">
                    <div className="sectionInn">
                      <div className="chartCard_w m_r24 getHeight">
                        <div className="chartCardTop">
                          <div className="flCenterColumn">
                            <h1 className="commonHeading textAlignCenter">
                              <FormattedMessage id="agent.RecentTransaction" />
                            </h1>
                          </div>
                        </div>
                        <div className="chartCardMiddle">
                          <div className="recentTrans_w">
                            <table>
                              <thead>
                                <tr>
                                  <th>
                                    <FormattedMessage id="agent.User" />
                                  </th>
                                  <th>Type</th>
                                  <th>Date</th>
                                  <th>
                                    <FormattedMessage id="agent.Amount" />
                                  </th>
                                  <th>
                                    <FormattedMessage id="agent.Fee" />
                                  </th>
                                  <th>Total</th>
                                  <th>
                                    <FormattedMessage id="agent.Currency" />
                                  </th>
                                  <th>Reciver</th>
                                  <th>
                                    <FormattedMessage id="agent.Status" />
                                  </th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Kyla watson</td>
                                  <td>Crypto Recieved</td>
                                  <td>13 Dec 2020 (4:00 PM)</td>
                                  <td className="amountColor">$75.67</td>
                                  <td>1.0000</td>
                                  <td className="cancelled_tr">-100.00</td>
                                  <td className="amountColor">USD</td>
                                  <td className="pending_tr">Kyla watson</td>
                                  <td className="pending_tr">Pending</td>
                                  <td className="actionBtn">
                                    <span class="icon-edit">
                                      <span class="path1"></span>
                                      <span class="path2"></span>
                                      <span class="path3"></span>
                                      <span class="path4"></span>
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Kyla watson</td>
                                  <td>Crypto Recieved</td>
                                  <td>13 Dec 2020 (4:00 PM)</td>
                                  <td className="amountColor">$75.67</td>
                                  <td>1.0000</td>
                                  <td className="cancelled_tr">-100.00</td>
                                  <td className="amountColor">USD</td>
                                  <td className="pending_tr">Kyla watson</td>
                                  <td className="cancelled_tr">Cancelled</td>
                                  <td className="actionBtn">
                                    <span class="icon-edit">
                                      <span class="path1"></span>
                                      <span class="path2"></span>
                                      <span class="path3"></span>
                                      <span class="path4"></span>
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Kyla watson</td>
                                  <td>Crypto Recieved</td>
                                  <td>13 Dec 2020 (4:00 PM)</td>
                                  <td className="amountColor">$75.67</td>
                                  <td>1.0000</td>
                                  <td className="success_tr">+100.00</td>
                                  <td className="amountColor">USD</td>
                                  <td className="pending_tr">Kyla watson</td>
                                  <td className="success_tr">Success</td>
                                  <td className="actionBtn">
                                    <span class="icon-edit">
                                      <span class="path1"></span>
                                      <span class="path2"></span>
                                      <span class="path3"></span>
                                      <span class="path4"></span>
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Kyla watson</td>
                                  <td>Crypto Recieved</td>
                                  <td>13 Dec 2020 (4:00 PM)</td>
                                  <td className="amountColor">$75.67</td>
                                  <td>1.0000</td>
                                  <td className="cancelled_tr">-100.00</td>
                                  <td className="amountColor">USD</td>
                                  <td className="pending_tr">Kyla watson</td>
                                  <td className="cancelled_tr">Cancelled</td>
                                  <td className="actionBtn">
                                    <span class="icon-edit">
                                      <span class="path1"></span>
                                      <span class="path2"></span>
                                      <span class="path3"></span>
                                      <span class="path4"></span>
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>Kyla watson</td>
                                  <td>Crypto Recieved</td>
                                  <td>13 Dec 2020 (4:00 PM)</td>
                                  <td className="amountColor">$75.67</td>
                                  <td>1.0000</td>
                                  <td className="success_tr">+100.00</td>
                                  <td className="amountColor">USD</td>
                                  <td className="pending_tr">Kyla watson</td>
                                  <td className="success_tr">Success</td>
                                  <td className="actionBtn">
                                    <span class="icon-edit">
                                      <span class="path1"></span>
                                      <span class="path2"></span>
                                      <span class="path3"></span>
                                      <span class="path4"></span>
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="cardFooter justify_content_end">
                          <div className="allTic">
                            <h3>All Tickets</h3>
                            <span className="icon-Asset-1"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </IntlProvider>
    );
  }
}

const mapStateToProps = ({ agentReducer, commonReducer }) => {
  const {
    profile,
    profileImage,
    profileImageStatus,
    walletAccount,
    getAllAgentMemberList,
    ticketsData,
  } = agentReducer;
  const { language } = commonReducer;

  return {
    profile,
    profileImage,
    profileImageStatus,
    language,
    walletAccount,
    getAllAgentMemberList,
    ticketsData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (token) => dispatch(getProfile(token)),
    fetchAgentWallet: (token) => dispatch(fetchAgentWallet(token)),
    getAllAgentMemberLists: () => dispatch(getAllAgentMemberLists()),
    getTickets: (token) => dispatch(getTickets(token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
