import React, { Component } from "react";
import "../../css/dashboard.css";
import Highcharts from "highcharts";
import variablePie from "highcharts/modules/variable-pie.js";
import HighchartsReact from "highcharts-react-official";

import ReactHighcharts from "react-highcharts";
import HighchartsMore from "highcharts/highcharts-more";

import highcharts3d from "highcharts/highcharts-3d";
import CountUp from "react-countup";
import $ from 'jquery'
import { connect } from "react-redux";
import {
  summary,
  getCurrency,
  RevenueMerchant,
  AmountCollectedLastThirtyDays
} from "../../services/admin/action";
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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDivHeight: null,
      users: null,
      clients: null,
      merchants: null,
      tickets: null,
      currency: [],
      intialdateRevenueMerchant: "",
      finaldateRevenueMerchant: "",
      revenueMerchantSelectedCurrency: "XAF",
      merchantRevenueData: [],
      merchantRevenueKey: [],
      toatalRevenueMerchant:null,
      firstone:"active",
      secondone:"",
      thirdone:"",
      fourthone:"",
      fifthone:"",
      amountCollectedKey:[],
      amountCollectedValue:[],

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
                y: 20,
                sliced: true,
                color: "#757575",
              },
              {
                name: "PAYOUT",
                y: 20,
                sliced: true,
                color: "#ADAEB0",
              },
              {
                name: "TRANSFER",
                y: 80,
                sliced: true,
                color: "#FE514E",
              },
              {
                name: "OTHERS",
                y: 80,
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
            name: "Deposit",
            color: "#4CBEEF",
            marker: {
              enabled: false,
              radius: 4,
            },
            dataLabels: {
              enabled: false,
            },
            data: [
              5000, 10000, 15000, 1000, 20000, 50000, 80000, 40000, 12000,
              13000, 18000, 49000,
            ],
          },
          {
            name: "Payout",
            color: "#FFBE41",
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
          {
            name: "Transfer",
            color: "#93F035",
            marker: {
              enabled: false,
              radius: 4,
            },
            dataLabels: {
              enabled: false,
            },
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
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
            color: "#423939",
            data: [25000, 35000, 30000, 28000, 26000],
          },
          {
            color: "#716D6C",
            data: [32000, 35000, 28000, 35000, 31000],
          },
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

  sendDates = (e) => {
    console.log("PrevMonthStartDate");
    if (e == "5") {
      var curDateMonth = new Date();
      var prvDateMonth = new Date(
        curDateMonth.getFullYear(),
        curDateMonth.getMonth(),
        0
      );
      //console.log(prvDateMonth,"sajhjh")
      var PrevMonthEndDate = new Date(
        prvDateMonth.getTime() - prvDateMonth.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      var current;
      if (curDateMonth.getMonth() == 0) {
        current = new Date(curDateMonth.getFullYear() - 1, 11, 1);
      } else {
        current = new Date(
          curDateMonth.getFullYear(),
          curDateMonth.getMonth() - 1,
          1
        );
      }

      var dateString = new Date(
        current.getTime() - current.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      var PrevMonthStartDate = dateString;
      // this.props.onSelectDate(PrevMonthStartDate, PrevMonthEndDate);

      this.props.RevenueMerchant(
        sessionStorage.getItem("token"),
        PrevMonthStartDate,
        PrevMonthEndDate,
        this.state.revenueMerchantSelectedCurrency
      );
      this.setState({
        intialdateRevenueMerchant: PrevMonthStartDate,
        finaldateRevenueMerchant: PrevMonthEndDate,
      });
     

      // console.log(PrevMonthStartDate, "PrevMonthStartDate");
    }this.setState({fifthone:"active",firstone:"",secondone:"",thirdone:"",fourthone:""})

    if (e == "4") {
      var curDateMonth = new Date();
      var FirstDayOfCurrentMonth = new Date(
        curDateMonth.getFullYear(),
        curDateMonth.getMonth(),
        1
      );
      var FirstDayOfCurrentMonth = new Date(
        FirstDayOfCurrentMonth.getTime() -
          FirstDayOfCurrentMonth.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      var d = new Date();
      var Today = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];
      // this.props.onSelectDate(FirstDayOfCurrentMonth, Today);
      this.props.RevenueMerchant(
        sessionStorage.getItem("token"),
        FirstDayOfCurrentMonth,
        Today,
        this.state.revenueMerchantSelectedCurrency
      );
      this.setState({
        intialdateRevenueMerchant: FirstDayOfCurrentMonth,
        finaldateRevenueMerchant: Today,
      });

      this.setState({fifthone:"",firstone:"",secondone:"",thirdone:"",fourthone:"active"})
    }
   

    

    if (e == "2") {
      d = new Date();
      var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1);
      var start = new Date(d.setDate(diff));
      var thisWeekFirstDay = new Date(
        start.getTime() - start.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      day = new Date();
      var thisWeekLastDay = new Date(
        day.getTime() - day.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      //     var curr = new Date; // get current date
      //    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
      //    var last = first + 6; // last day is the first day + 6

      //     var firstday = new Date(curr.setDate(first));
      //     var lastday = new Date(curr.setDate(last));
      //     var thisWeekFirstDay=new Date(firstday.getTime() - (firstday.getTimezoneOffset() * 60000 ))
      //     .toISOString()
      //     .split("T")[0];

      //     var thisWeekLastDay=new Date(lastday.getTime() - (lastday.getTimezoneOffset() * 60000 ))
      //     .toISOString()
      //     .split("T")[0];

      // this.props.onSelectDate(thisWeekFirstDay, thisWeekLastDay);

      this.props.RevenueMerchant(
        sessionStorage.getItem("token"),
        thisWeekFirstDay,
        thisWeekLastDay,
        this.state.revenueMerchantSelectedCurrency
      );
      this.setState({
        intialdateRevenueMerchant: thisWeekFirstDay,
        finaldateRevenueMerchant: thisWeekLastDay,
      });
      this.setState({fifthone:"",firstone:"",secondone:"active",thirdone:"",fourthone:""})

    }

    if (e == "3") {
      var last7dayStart = this.Last7Days();
      day = new Date();
      var last7dayEnd = new Date(
        day.getTime() - day.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      this.props.RevenueMerchant(
        sessionStorage.getItem("token"),
        last7dayStart,
        last7dayEnd,
        this.state.revenueMerchantSelectedCurrency
      );
      this.setState({
        intialdateRevenueMerchant: last7dayStart,
        finaldateRevenueMerchant: last7dayEnd,
      });

      // this.props.onSelectDate(last7dayStart, last7dayEnd);
      this.setState({fifthone:"",firstone:"",secondone:"",thirdone:"active",fourthone:""})

    }

    if (e == "1") {
      day = new Date();
      var Today = new Date(day.getTime() - day.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];
      // this.props.onSelectDate(Today, Today);
      this.props.RevenueMerchant(
        sessionStorage.getItem("token"),
        Today,
        Today,
        this.state.revenueMerchantSelectedCurrency
      );
      this.setState({
        intialdateRevenueMerchant: Today,
        finaldateRevenueMerchant: Today,
      });
      this.setState({fifthone:"",firstone:"active",secondone:"",thirdone:"",fourthone:""})

    }
  };

  formatDate = (date) => {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    date = yyyy + "-" + mm + "-" + dd;
    return date;
  };

  Last7Days = () => {
    var result = [];
    for (var i = 0; i < 7; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      result.push(this.formatDate(d));
    }

    return result[result.length - 1];
  };

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

    var day = new Date();
    var Today = new Date(day.getTime() - day.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];

    this.props.summary(sessionStorage.getItem("token"));
    this.props.getCurrency(sessionStorage.getItem("token"));
    this.props.RevenueMerchant(
      sessionStorage.getItem("token"),
      Today,
      Today,
      "XAF"
    );

    this.props.AmountCollectedLastThirtyDays(sessionStorage.getItem("token"),"XAF")
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.summaryStatus) {
      console.log(nextProps.summaryData, "data123sdas");

      this.setState({
        users: nextProps.summaryData.numberOfUsers,
        clients: nextProps.summaryData.numberOfClients,
        merchants: nextProps.summaryData.numberOfMerchants,
        tickets: nextProps.summaryData.numberOfTickets,
      });
    }
    if (nextProps.currencyStatus) {
      this.setState({
        currency: nextProps.currencyList.currency,
      });
    }

    if (nextProps.merchantRevenueStatus) {
      var getGraphDatamethodValues = [];
      var getGraphDatamethodLabels = [];
      var Grosstotal=0

      if (nextProps.merchantRevenueList && Object.keys(nextProps.merchantRevenueList).length !== 0) {
        getGraphDatamethodValues = Object.values(nextProps.merchantRevenueList);

        getGraphDatamethodValues.map((value)=>{

          Grosstotal=Grosstotal+value

        })

        getGraphDatamethodLabels = Object.keys(nextProps.merchantRevenueList);

        this.setState({
          merchantRevenueKey: getGraphDatamethodLabels,
          merchantRevenueData: getGraphDatamethodValues,
          toatalRevenueMerchant:Grosstotal
        });
      } else {
        this.setState({ merchantRevenueKey: [], merchantRevenueData: [] ,toatalRevenueMerchant:0});
      }
    }

    if(nextProps.amountCollectedStatus)
    {

      var getAmountCollectedValues = [];
      var getAmountCollectedLabels = [];

      if (nextProps.amountCollectedData.merchantLineChartDTO.transactionsForLastThirtyDays && Object.keys(nextProps.amountCollectedData.merchantLineChartDTO.transactionsForLastThirtyDays).length !== 0) {

        getAmountCollectedValues = Object.values(nextProps.amountCollectedData.merchantLineChartDTO.transactionsForLastThirtyDays);
        getAmountCollectedLabels = Object.keys(nextProps.amountCollectedData.merchantLineChartDTO.transactionsForLastThirtyDays);

        this.setState({
          amountCollectedKey: getAmountCollectedLabels,
          amountCollectedValue: getAmountCollectedValues,
        });
      } else {
        this.setState({ amountCollectedKey: [], amountCollectedValue: [] });
      }

    }
  }

  handleChangeRevenueMerchant = (value) => {
    this.setState({ revenueMerchantSelectedCurrency: value });

    this.props.RevenueMerchant(
      sessionStorage.getItem("token"),
      this.state.intialdateRevenueMerchant,
      this.state.finaldateRevenueMerchant,
      value
    );
  };

  handleChangeAmountCollectedLastThirtyDays=(value)=>{

    this.props.AmountCollectedLastThirtyDays(sessionStorage.getItem("token"),value)

  }

  render() {
    const merchantRevenue = {
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
            data: this.state.merchantRevenueData,
          },
        ],
      },
    };



    const amountCollected={
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
          categories: this.state.amountCollectedKey,
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
            name: "Transaction amount",
            color: "red",
            marker: {
              enabled: false,
              radius: 4,
            },
            dataLabels: {
              enabled: false,
            },
            data: this.state.amountCollectedValue,
          },

          {
            name: "Deposit",
            color: "#4CBEEF",
            marker: {
              enabled: false,
              radius: 4,
            },
            dataLabels: {
              enabled: false,
            },
            data: [
              5000, 10000, 15000, 1000, 20000, 50000, 80000, 40000, 12000,
              13000, 18000, 49000,
            ],
          },
          {
            name: "Payout",
            color: "#FFBE41",
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
          {
            name: "Transfer",
            color: "#93F035",
            marker: {
              enabled: false,
              radius: 4,
            },
            dataLabels: {
              enabled: false,
            },
            data: [5000,5000, 0,100, 5000, 20000,200, 0, 20000, 49000, 0, 20000],
          },
        ],
      },
    }
    return (
      <div className="main_contain">
        <div className="dashboard_wraps">
          <div className="dashCards section_custom">
            <div className="custom_row">
              <div className="custom_col width3">
                <div className="dcard">
                  <div className="icNa">
                    <div className="width50p">
                      <div className="radiusUsed">
                        <span className="icon-Asset-2"></span>
                      </div>
                    </div>
                    <div className="cardrightVal width50p">
                      <h2>200</h2>
                      <h6>Total Agents</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="custom_col width3">
                <div className="dcard">
                  <div className="icNa">
                    <div className="width50p">
                      <div className="radiusUsed">
                        <span className="icon-Asset-34"></span>
                      </div>
                    </div>
                    <div className="cardrightVal width50p">
                      <h2>
                        <CountUp end={this.state.clients} duration={5} />
                      </h2>
                      <h6>Total Agent Member</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="custom_col width3">
                <div className="dcard">
                  <div className="icNa">
                    <div className="width50p">
                      {/* <div className="radiusUsed">
                        <span className="icon-Asset-4"></span>
                      </div> */}
                    </div>
                    <div className="cardrightVal width50p">
                      <h2>
                        <CountUp end={this.state.merchants} duration={5} />
                      </h2>
                      <h6>Total Plans</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="custom_col width3">
                <div className="dcard">
                  <div className="icNa">
                    <div className="width50">
                      {/* <div className="radiusUsed">
                        <span className="icon-Asset-50"></span>
                      </div> */}
                    </div>
                    <div className="cardrightVal width50p">
                      <h2>
                        <CountUp end={this.state.users} duration={5} />
                      </h2>
                      <h6>Liquidity Balance</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="custom_col width3">
                <div className="dcard">
                  <div className="icNa">
                    <div className="width50p">
                      {/* <div className="radiusUsed">
                        <span className="icon-Asset-26"></span>
                      </div> */}
                    </div>
                    <div className="cardrightVal width50p">
                      <h2>
                        <CountUp end={this.state.tickets} duration={5} />
                      </h2>
                      <h6>Total Tickets</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="custom_col width3">
                <div className="dcard">
                  <div className="icNa">
                    <div className="width50p">
                      {/* <div className="radiusUsed">
                        <span className="icon-Asset-26"></span>
                      </div> */}
                    </div>
                    <div className="cardrightVal width50p">
                      <h2>
                        <CountUp end={this.state.tickets} duration={5} />
                      </h2>
                      <h6>Total Clients</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section_custom">
            <div className="sectionInn chartCardColumn">
              <div className="chartCard_w width50p m_r24 getHeight"  style={{marginTop:"5%"}}>
                <div className="chartCardTop">
                  <div>
                    <h1 className="commonHeading">Transcations per Agent</h1>
                    {/* <h6 className="commonHeadingSmall color6E6E70 changeSiz">
                      Total Amount Collected
                    </h6> */}
                  </div>
                  <div className="hSelect">
                    <div className="antdSelect">
                      <Select
                        defaultValue="XAF"
                        style={{ width: 114, height: 40 }}
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
                      <li className="active">Today</li>
                      <li>This Week</li>
                      <li>7 Days</li>
                      <li>This Month</li>
                      <li>Last Month</li>
                    </ul>
                  </div>
                  <div className="hichchartIn0">
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={this.state.chartMerchant}
                    />
                  </div>
                </div>
              </div>
              <div className="chartCard_w width50p getHeight"  style={{marginTop:"5%"}}>
                <div className="chartCardTop">
                  <div>
                    <h1 className="commonHeading"> Transcations per Number</h1>
                    {/* <h6 className="commonHeadingSmall color6E6E70 changeSiz">
                      Total Amount Collected
                    </h6> */}
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
                  <div className="chartTabs" style={{ paddingBottom: "24px" }}>
                    <ul>
                      <li className="active">Today</li>
                      <li>This Week</li>
                      <li>7 Days</li>
                      <li>This Month</li>
                      <li>Last Month</li>
                    </ul>
                  </div>
                  <div className="hichchartIn0">
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={this.state.chartMerchant}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section_custom" >
            <div className="sectionInn chartCardColumn">
              <div className="chartCard_w width50p m_r24 getHeight">
                <div className="chartCardTop">
                  <h1 className="commonHeading">Transcatipn % of Assets</h1>
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
                      <li className="active">Today</li>
                      <li>This Week</li>
                      <li>7 Days</li>
                      <li>This Month</li>
                      <li>Last Month</li>
                    </ul>
                  </div>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.options}
                  />
                </div>
                <div className="cardFooter">
                  <span>Total Amount</span>
                  <span>$ 00.00</span>
                  <span>Total Transactions</span>
                  <span>$ 00</span>
                </div>
              </div>
              <div className="chartCard_w width50p m_r24 getHeight">
                <div className="chartCardTop">
                  <h1 className="commonHeading">Transcatipn % of Category</h1>
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
                      <li className="active">Today</li>
                      <li>This Week</li>
                      <li>7 Days</li>
                      <li>This Month</li>
                      <li>Last Month</li>
                    </ul>
                  </div>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.options}
                  />
                </div>
                <div className="cardFooter">
                  <span>Total Amount</span>
                  <span>$ 00.00</span>
                  <span>Total Transactions</span>
                  <span>$ 00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="section_custom" >
            <div className="sectionInn chartCardColumn">
              <div className="chartCard_w width50p m_r24 getHeight">
                <div className="chartCardTop">
                  <h1 className="commonHeading">Amount Collected</h1>
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
                      <li className="active">Today</li>
                      <li>This Week</li>
                      <li>7 Days</li>
                      <li>This Month</li>
                      <li>Last Month</li>
                    </ul>
                  </div>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.options}
                  />
                </div>
                <div className="cardFooter">
                  <span>Total Amount</span>
                  <span>$ 00.00</span>
                  <span>Total Transactions</span>
                  <span>$ 00</span>
                </div>
              </div>
              <div className="chartCard_w width50p">
                <div className="chartCardTop">
                  <h1 className="commonHeading">Recent Tickets</h1>
                </div>
                <div className="chartCardMiddle">
                  <table className="dashTable">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Subject</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2020/12/22</td>
                        <td>New Tickets</td>
                        <td>
                          Open <span className="icon-Asset-49 stylingTA"></span>
                        </td>
                      </tr>
                      <tr>
                        <td>2020/12/22</td>
                        <td>New Tickets</td>
                        <td>
                          Open <span className="icon-Asset-49 stylingTA"></span>
                        </td>
                      </tr>
                      <tr>
                        <td>2020/12/22</td>
                        <td>New Tickets</td>
                        <td>
                          Open <span className="icon-Asset-49 stylingTA"></span>
                        </td>
                      </tr>
                      <tr>
                        <td>2020/12/22</td>
                        <td>New Tickets</td>
                        <td>
                          Open <span className="icon-Asset-49 stylingTA"></span>
                        </td>
                      </tr>
                      <tr>
                        <td>2020/12/22</td>
                        <td>New Tickets</td>
                        <td>
                          Open <span className="icon-Asset-49 stylingTA"></span>
                        </td>
                      </tr>
                      <tr>
                        <td>2020/12/22</td>
                        <td>New Tickets</td>
                        <td>
                          Open <span className="icon-Asset-49 stylingTA"></span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="cardFooter justify_content_end">
                    <div className="allTic">
                      <h3>All Tickets</h3>
                      <span className="icon-Asset-1"></span>
                    </div>
                  </div>
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
                      Last 30 Days Transcations
                    </h1>
                    {/* <h6 className="commonHeadingSmall color6E6E70">
                      as of 29 March 2021, 09:41 PM
                    </h6> */}
                  </div>
                  <div className="hSelect">
                    <div className="antdSelect">
                      <Select
                        defaultValue="XAF"
                        style={{ width: 114, height: 32 }}
                        onChange={this.handleChangeAmountCollectedLastThirtyDays}
                      >
                        {/* <Option value="EN">XAF</Option>
                        <Option value="FR">Dollarr</Option> */}

                        {this.state.currency.length > 0
                          ? this.state.currency.map((curr) => {
                              return (
                                <Option value={curr.code}>{curr.name}</Option>
                              );
                            })
                          : ""}
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="chartCardMiddle" style={{ padding: "12px" }}>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={amountCollected.toAmountColl}
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
                      Last 12 weeks Fees Earned
                    </h1>
                    {/* <h6 className="commonHeadingSmall color6E6E70">
                      as of 29 March 2021, 09:41 PM
                    </h6> */}
                  </div>
                  <div className="hSelect">
                    <div className="antdSelect">
                      <Select
                        defaultValue="XAF"
                        style={{ width: 114, height: 32 }}
                        onChange={this.handleChangeAmountCollectedLastThirtyDays}
                      >
                        {/* <Option value="EN">XAF</Option>
                        <Option value="FR">Dollarr</Option> */}

                        {this.state.currency.length > 0
                          ? this.state.currency.map((curr) => {
                              return (
                                <Option value={curr.code}>{curr.name}</Option>
                              );
                            })
                          : ""}
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="chartCardMiddle" style={{ padding: "12px" }}>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={amountCollected.toAmountColl}
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
                      Recent Transaction
                    </h1>
                  </div>
                </div>
                <div className="chartCardMiddle">
                  <div className="recentTrans_w">
                    <table>
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Type</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Fee</th>
                          <th>Total</th>
                          <th>Currency</th>
                          <th>Reciver</th>
                          <th>Status</th>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ adminReducer }) => {
  const { summaryStatus, summaryData } = adminReducer;
  const { currencyStatus, currencyList } = adminReducer;
  const { merchantRevenueStatus, merchantRevenueList } = adminReducer;
  const { amountCollectedStatus, amountCollectedData } = adminReducer;

  
  return {
    summaryStatus,
    summaryData,
    currencyStatus,
    currencyList,
    merchantRevenueStatus,
    merchantRevenueList,
    amountCollectedStatus,
    amountCollectedData
  };
};

const mapDispatchToProps = (dispatch) => ({
  summary: (token) => dispatch(summary(token)),
  getCurrency: (token) => dispatch(getCurrency(token)),
  RevenueMerchant: (token, fromDate, toData, currency) =>
    dispatch(RevenueMerchant(token, fromDate, toData, currency)),
    AmountCollectedLastThirtyDays:(token,currency)=>dispatch(AmountCollectedLastThirtyDays(token,currency))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
