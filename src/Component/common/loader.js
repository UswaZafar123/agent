import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "../../Assets/css/loader.css"
class PageLoader extends Component {
  state = {};
  render() {
    const { loading } = this.props;

    if (!loading) return null;

    return (
      <div className={loading ? "parentDisable" : ""} width="100%">
        <div className="overlay-box">
        <Loader
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} 
      />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({commonReducer}) =>({ loading: commonReducer.isLoading });

export default connect(mapStateToProps,null)(PageLoader);