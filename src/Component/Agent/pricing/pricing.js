import React, { Component } from "react";
import { Select } from "antd";
// import './merchantNewStyle.css';
import {
  getSubscribedPlan,
  getFeatured,
  getMerchantShops,
  addSubscription,
} from "./../../../services/actions";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import URL from "./../../../Assets/config";
import axios from "axios";
import { toastr } from "react-redux-toastr";
const { Option } = Select;


class Pricing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      finalPos: null,
      getSubscriptionListData: [],
      finalPlan: null,
      shops: [],
      posList: [],
      gridApi: null,
      isModalVisible: false,
      kycMerchantCategory: null,
      view: false,
      popup: false,
      featuredList: null,
      selectedPlan: null,
    };
  }

  componentDidMount() {
    let token = sessionStorage.getItem("token");
    this.props.getSubscribedPlan(token);
    this.props.getFeatured(token);

    const merchant_id = sessionStorage.getItem("id");

    this.props.getMerchantShops(merchant_id, token);
  }

//   componentWillReceiveProps(nextprops) {
//     if (nextprops.getFeaturedStatus) {
//       var final = [];
//       nextprops.getFeaturedListData.SubscriptionPlanList.length > 0 &&
//         nextprops.getFeaturedListData.SubscriptionPlanList.map((data) => {
//           if (data.feeUserType.name == "Merchant") {
//             final.push(data);
//           }
//         });

//       this.setState({ featuredList: final });
//     }

//     if (
//       nextprops.getMerchantShopDetails &&
//       nextprops.getMerchantShopDetails.shops
//     ) {
//       this.setState({ shops: nextprops.getMerchantShopDetails.shops });
//     }

//     if (nextprops.subscribedPlanStatus) {
//       let getSubscriptionListData =
//         nextprops.subscribedPlanDetails.merchantSubscriptionList;
//       this.setState({
//         getSubscriptionListData,
//       });
//     }
//   }

  save = (e, id) => {
    this.setState({
      popup: true,
      finalPlan: parseInt(id),
      finalPos: null,
    });
  };
  test = () => {
    this.props.history.push("/pricing_list/Test");
  };
  close = () => {
    this.setState({
      popup: false,
    });
  };
  handleChange = (e) => {
    this.setState({ kycMerchantCategory: e });
  };

  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  handleOk = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  onCloseHandler = () => {
    this.setState({
      isModalVisible: false,
    });
  };
  handleCancel = () => {
    this.setState({
      isModalVisible: false,
    });
  };
  onTax = () => {
    // this.setState({
    //   view: true
    // })
    this.props.history.push("/taxationOffice");
  };
  onClose=()=>{

    this.setState({
      popup:false
    })
  }
  back = () => {
    this.props.history.push("/Shops_Points_Sales");
  };

  viewMore = (plan) => {
    this.setState({ selectedPlan: plan });
    this.props.history.push({ pathname: "/pricing_list/Test", state: plan });
  };

  populatePOS = (e) => {
    const token = sessionStorage.getItem("token");
    var self = this;
    const config = {
      method: "GET",
      url: URL.merchant.SHOP_POS + "/" + e.target.value + "/pos",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    axios(config)
      .then((res) => {
        if (res.status === 200) {
          toastr.success(res.data.message);
          this.setState({ posList: res.data.posMerchants });
        } else if (res.status === 206) {
          toastr.warning(res.data.message);
        }
      })
      .catch((error) => {
        toastr.warning("error");
      });
  };

  setpos = (e) => {
    this.setState({
      finalPos: parseInt(e.target.value),
    });
  };

  buyPlan = () => {
    if (this.state.finalPos == null) {
      toastr.warning("please select point of sales");
    } else {
      var payload = {
        subscriptionPlanId: this.state.finalPlan,
        posId: this.state.finalPos,
      };

      this.props.addSubscription(sessionStorage.getItem("token"), payload);

      this.setState({
        popup: false,
      });
    }
  };

  render() {
    return (
      <div className="main_contain m_p_parent">
        <div className="merch_m_list_w">
          <div className="merch_list_card">
            <div className="section_custom">
              <div className="sectionInn">
                <div className="chartCard_w">
                  <div className="chartCardTop">
                    <div className="kyccustomformheading">
                      <h1 className="zeropadding list_top_heading textAlignCenter text-center">
                        Pricing List
                      </h1>
                    </div>
                  </div>
                  <div className="pricingcardsection">
                  <div className="rpd_container">
                    <h4 className="rplan_heading">Requested Plan Details</h4>
                    {this.state.getSubscriptionListData.length > 0 &&
                      this.state.getSubscriptionListData.map((plan) => {
                        return (
                          
                          <div className="row" style={{width:"initiate"}}>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="card mb-3 card-body-up">
                                <div className="card-body">
                                  <div className="currentPlan">
                                    <div className="row">
                                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="infoDiv">
                                          <label>Requested Plan Name :</label>
                                          <span>
                                            {
                                              plan.subscriptionPlanid
                                                .subscriptionName
                                            }
                                          </span>
                                        </div>
                                      </div>
                                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="infoDiv">
                                          <label>Requested Date :</label>
                                          <span>
                                            {plan.subscriptionStartdate}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="infoDiv">
                                          <label>POS :</label>
                                          <span>{plan.merchantPOS.name}</span>
                                        </div>
                                      </div>

                                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="infoDiv">
                                          <label>End Date :</label>
                                          <span>
                                            {plan.subscriptionEnddate}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="infoDiv">
                                          <label>Status</label>
                                          {new Date() <
                                            new Date(
                                              plan.subscriptionEnddate
                                            ) && (
                                            <span className="badge badge-pill badge-success">
                                              Active
                                            </span>
                                          )}
                                          {new Date() >
                                            new Date(
                                              plan.subscriptionEnddate
                                            ) && (
                                            <span className="badge badge-pill badge-danger">
                                              Expired
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                        );
                      })}
                      </div>
                      <div className="pricingCardcontainer"></div>
                    {this.state.featuredList != null &&
                      this.state.featuredList.map((list) => {
                        return (
                          <div className="pricingcard">
                            <div className="pricingcardheading">
                              <h5>{list.subscriptionName}</h5>
                              <div className="pricingcardheadingprice">
                                <h2>{list.subscriptionAmount}</h2>
                                <span>$</span>
                              </div>
                              <p>{list.subscriptionDays} Days</p>
                            </div>
                            <div className="pricingcardlist">
                              <ul>
                                <li>
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12.6505 1.94878C9.47885 -0.779949 4.67839 -0.419592 1.94966 2.75206C-0.779072 5.92372 -0.418716 10.7242 2.75294 13.4529C5.92459 16.1816 10.7251 15.8213 13.4538 12.6496C16.1825 9.47797 15.8222 4.67751 12.6505 1.94878ZM9.53337 10.0467L7.76351 8.52398L6.24081 10.2938C6.13985 10.4112 5.9964 10.4836 5.84203 10.4952C5.68766 10.5068 5.53502 10.4566 5.41767 10.3556C5.30032 10.2547 5.22788 10.1112 5.21629 9.95687C5.2047 9.8025 5.25491 9.64985 5.35587 9.5325L6.87858 7.76263L5.10871 6.23993C4.99136 6.13897 4.91893 5.99553 4.90734 5.84116C4.89575 5.68679 4.94596 5.53414 5.04692 5.41679C5.14788 5.29944 5.29133 5.227 5.44569 5.21542C5.60006 5.20383 5.75271 5.25404 5.87006 5.355L7.63993 6.8777L9.16263 5.10784C9.26359 4.99049 9.40703 4.91805 9.5614 4.90646C9.71577 4.89487 9.86842 4.94508 9.98577 5.04604C10.1031 5.14701 10.1756 5.29045 10.1871 5.44482C10.1987 5.59919 10.1485 5.75184 10.0476 5.86919L8.52486 7.63905L10.2947 9.16175C10.4121 9.26271 10.4845 9.40616 10.4961 9.56053C10.5077 9.7149 10.4575 9.86755 10.3565 9.98489C10.2556 10.1022 10.1121 10.1747 9.95774 10.1863C9.80337 10.1979 9.65072 10.1476 9.53337 10.0467Z"
                                      fill="#4C4D4E"
                                    />
                                  </svg>
                                  <span>
                                    {list.featureOne
                                      ? list.featureOne
                                      : "no feature added"}
                                  </span>
                                </li>
                                <li>
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12.6505 1.94878C9.47885 -0.779949 4.67839 -0.419592 1.94966 2.75206C-0.779072 5.92372 -0.418716 10.7242 2.75294 13.4529C5.92459 16.1816 10.7251 15.8213 13.4538 12.6496C16.1825 9.47797 15.8222 4.67751 12.6505 1.94878ZM9.53337 10.0467L7.76351 8.52398L6.24081 10.2938C6.13985 10.4112 5.9964 10.4836 5.84203 10.4952C5.68766 10.5068 5.53502 10.4566 5.41767 10.3556C5.30032 10.2547 5.22788 10.1112 5.21629 9.95687C5.2047 9.8025 5.25491 9.64985 5.35587 9.5325L6.87858 7.76263L5.10871 6.23993C4.99136 6.13897 4.91893 5.99553 4.90734 5.84116C4.89575 5.68679 4.94596 5.53414 5.04692 5.41679C5.14788 5.29944 5.29133 5.227 5.44569 5.21542C5.60006 5.20383 5.75271 5.25404 5.87006 5.355L7.63993 6.8777L9.16263 5.10784C9.26359 4.99049 9.40703 4.91805 9.5614 4.90646C9.71577 4.89487 9.86842 4.94508 9.98577 5.04604C10.1031 5.14701 10.1756 5.29045 10.1871 5.44482C10.1987 5.59919 10.1485 5.75184 10.0476 5.86919L8.52486 7.63905L10.2947 9.16175C10.4121 9.26271 10.4845 9.40616 10.4961 9.56053C10.5077 9.7149 10.4575 9.86755 10.3565 9.98489C10.2556 10.1022 10.1121 10.1747 9.95774 10.1863C9.80337 10.1979 9.65072 10.1476 9.53337 10.0467Z"
                                      fill="#4C4D4E"
                                    />
                                  </svg>
                                  <span>
                                    {list.featureTwo
                                      ? list.featureTwo
                                      : "no feature added"}
                                  </span>{" "}
                                </li>
                                <li>
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12.6505 1.94878C9.47885 -0.779949 4.67839 -0.419592 1.94966 2.75206C-0.779072 5.92372 -0.418716 10.7242 2.75294 13.4529C5.92459 16.1816 10.7251 15.8213 13.4538 12.6496C16.1825 9.47797 15.8222 4.67751 12.6505 1.94878ZM9.53337 10.0467L7.76351 8.52398L6.24081 10.2938C6.13985 10.4112 5.9964 10.4836 5.84203 10.4952C5.68766 10.5068 5.53502 10.4566 5.41767 10.3556C5.30032 10.2547 5.22788 10.1112 5.21629 9.95687C5.2047 9.8025 5.25491 9.64985 5.35587 9.5325L6.87858 7.76263L5.10871 6.23993C4.99136 6.13897 4.91893 5.99553 4.90734 5.84116C4.89575 5.68679 4.94596 5.53414 5.04692 5.41679C5.14788 5.29944 5.29133 5.227 5.44569 5.21542C5.60006 5.20383 5.75271 5.25404 5.87006 5.355L7.63993 6.8777L9.16263 5.10784C9.26359 4.99049 9.40703 4.91805 9.5614 4.90646C9.71577 4.89487 9.86842 4.94508 9.98577 5.04604C10.1031 5.14701 10.1756 5.29045 10.1871 5.44482C10.1987 5.59919 10.1485 5.75184 10.0476 5.86919L8.52486 7.63905L10.2947 9.16175C10.4121 9.26271 10.4845 9.40616 10.4961 9.56053C10.5077 9.7149 10.4575 9.86755 10.3565 9.98489C10.2556 10.1022 10.1121 10.1747 9.95774 10.1863C9.80337 10.1979 9.65072 10.1476 9.53337 10.0467Z"
                                      fill="#4C4D4E"
                                    />
                                  </svg>
                                  <span>
                                    {list.featureThree
                                      ? list.featureThree
                                      : "no feature added"}
                                  </span>{" "}
                                </li>
                                <li>
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12.6505 1.94878C9.47885 -0.779949 4.67839 -0.419592 1.94966 2.75206C-0.779072 5.92372 -0.418716 10.7242 2.75294 13.4529C5.92459 16.1816 10.7251 15.8213 13.4538 12.6496C16.1825 9.47797 15.8222 4.67751 12.6505 1.94878ZM9.53337 10.0467L7.76351 8.52398L6.24081 10.2938C6.13985 10.4112 5.9964 10.4836 5.84203 10.4952C5.68766 10.5068 5.53502 10.4566 5.41767 10.3556C5.30032 10.2547 5.22788 10.1112 5.21629 9.95687C5.2047 9.8025 5.25491 9.64985 5.35587 9.5325L6.87858 7.76263L5.10871 6.23993C4.99136 6.13897 4.91893 5.99553 4.90734 5.84116C4.89575 5.68679 4.94596 5.53414 5.04692 5.41679C5.14788 5.29944 5.29133 5.227 5.44569 5.21542C5.60006 5.20383 5.75271 5.25404 5.87006 5.355L7.63993 6.8777L9.16263 5.10784C9.26359 4.99049 9.40703 4.91805 9.5614 4.90646C9.71577 4.89487 9.86842 4.94508 9.98577 5.04604C10.1031 5.14701 10.1756 5.29045 10.1871 5.44482C10.1987 5.59919 10.1485 5.75184 10.0476 5.86919L8.52486 7.63905L10.2947 9.16175C10.4121 9.26271 10.4845 9.40616 10.4961 9.56053C10.5077 9.7149 10.4575 9.86755 10.3565 9.98489C10.2556 10.1022 10.1121 10.1747 9.95774 10.1863C9.80337 10.1979 9.65072 10.1476 9.53337 10.0467Z"
                                      fill="#4C4D4E"
                                    />
                                  </svg>
                                  <span>
                                    {list.featureFour
                                      ? list.featureFour
                                      : "no feature added"}
                                  </span>{" "}
                                </li>
                              </ul>
                            </div>
                            <div className="pricingcardbutton">
                              <button
                                className="pricingcardbuy-button"
                                onClick={(e) => this.save(e, list.id)}
                              >
                                Buy
                              </button>
                              <button
                                className="pricingcardview-button"
                                onClick={() => {
                                  this.viewMore(list);
                                }}
                              >
                                View More
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              {this.state.popup == true ? (
                <div className="custommodal custommodal-fadein modal_w">
                  <div className="custommodal-dailog">
                    <div className="custommodal-content">
                      <div className="custommodal-content-pricingheader">
                        <h5>Select Point of Sale</h5>

                        <svg
                          onClick={this.close}
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.6505 1.94878C9.47885 -0.779949 4.67839 -0.419592 1.94966 2.75206C-0.779072 5.92372 -0.418716 10.7242 2.75294 13.4529C5.92459 16.1816 10.7251 15.8213 13.4538 12.6496C16.1825 9.47797 15.8222 4.67751 12.6505 1.94878ZM9.53337 10.0467L7.76351 8.52398L6.24081 10.2938C6.13985 10.4112 5.9964 10.4836 5.84203 10.4952C5.68766 10.5068 5.53502 10.4566 5.41767 10.3556C5.30032 10.2547 5.22788 10.1112 5.21629 9.95687C5.2047 9.8025 5.25491 9.64985 5.35587 9.5325L6.87858 7.76263L5.10871 6.23993C4.99136 6.13897 4.91893 5.99553 4.90734 5.84116C4.89575 5.68679 4.94596 5.53414 5.04692 5.41679C5.14788 5.29944 5.29133 5.227 5.44569 5.21542C5.60006 5.20383 5.75271 5.25404 5.87006 5.355L7.63993 6.8777L9.16263 5.10784C9.26359 4.99049 9.40703 4.91805 9.5614 4.90646C9.71577 4.89487 9.86842 4.94508 9.98577 5.04604C10.1031 5.14701 10.1756 5.29045 10.1871 5.44482C10.1987 5.59919 10.1485 5.75184 10.0476 5.86919L8.52486 7.63905L10.2947 9.16175C10.4121 9.26271 10.4845 9.40616 10.4961 9.56053C10.5077 9.7149 10.4575 9.86755 10.3565 9.98489C10.2556 10.1022 10.1121 10.1747 9.95774 10.1863C9.80337 10.1979 9.65072 10.1476 9.53337 10.0467Z"
                            fill="white"
                          />
                        </svg>
                      </div>

                      <div className="custommodal-modal_w_in-pricing modal_w_in">
                        <h4>Please Select Shop and POS</h4>
                        <div className="custommodal-modal_w_in-pricing-row">
                          <div className="sendmoneycol formCol">
                            <label className="formColLabel">Shop Name</label>
                            <select onChange={this.populatePOS}>
                              <option>Select Shop</option>
                              {this.state.shops.length > 0 &&
                                this.state.shops.map((data) => {
                                  return (
                                    <option value={data.shopId}>
                                      {data.name}
                                    </option>
                                  );
                                })}
                            </select>

                            <svg
                              width="16"
                              height="10"
                              viewBox="0 0 16 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.7144 1.87667L8.88903 9.60314C8.77901 9.72761 8.64254 9.82753 8.48897 9.89603C8.33541 9.96453 8.16838 10 7.99936 10C7.83033 10 7.66331 9.96453 7.50974 9.89603C7.35617 9.82753 7.2197 9.72761 7.10968 9.60314L0.284286 1.87667C-0.3671 1.13917 0.172956 0 1.17396 0H14.8267C15.8277 0 16.3678 1.13917 15.7144 1.87667Z"
                                fill="#343A40"
                              />
                            </svg>
                          </div>
                          <div className="sendmoneycol formCol">
                            <label className="formColLabel">POS Name</label>
                            <select onChange={this.setpos}>
                              <option>Select POS</option>
                              {this.state.posList.length > 0 &&
                                this.state.posList.map((data) => {
                                  return (
                                    <option value={data.id}>{data.name}</option>
                                  );
                                })}
                            </select>

                            <svg
                              width="16"
                              height="10"
                              viewBox="0 0 16 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.7144 1.87667L8.88903 9.60314C8.77901 9.72761 8.64254 9.82753 8.48897 9.89603C8.33541 9.96453 8.16838 10 7.99936 10C7.83033 10 7.66331 9.96453 7.50974 9.89603C7.35617 9.82753 7.2197 9.72761 7.10968 9.60314L0.284286 1.87667C-0.3671 1.13917 0.172956 0 1.17396 0H14.8267C15.8277 0 16.3678 1.13917 15.7144 1.87667Z"
                                fill="#343A40"
                              />
                            </svg>
                          </div>
                          <div className="custommodal-footer-pricing-row">
                            <button className="pos-close-btn" onClick={this.onClose}>Close</button>
                            <button
                              className="pos-buy-btn"
                              onClick={this.buyPlan}
                            >
                              Buy
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ merchantReducer }) => {
  const { getMerchantShopDetails } = merchantReducer;
  const {
    getShopDetails,
    getFeaturedListData,
    getFeaturedStatus,
    subscribedPlanDetails,
    subscribedPlanStatus,
  } = merchantReducer;
  return {
    getMerchantShopDetails: getMerchantShopDetails,
    getShopDetails: getShopDetails,
    getFeaturedListData: getFeaturedListData,
    getFeaturedStatus: getFeaturedStatus,
    subscribedPlanDetails,
    subscribedPlanStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSubscribedPlan: (token) => dispatch(getSubscribedPlan(token)),
  getFeatured: (token) => dispatch(getFeatured(token)),
  getMerchantShops: (id, token) => dispatch(getMerchantShops(id, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pricing);
