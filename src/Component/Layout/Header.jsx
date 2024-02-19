import { Component } from "react";
import "../../css/header.css";
import IMAGES from "../../Assets/images";
import { Logout, SetLanguage } from "../../services/common/action";
import { Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { getRefreshToken, getProfile } from "../../services/agent/action";
import { withRouter } from "react-router-dom";

class Header extends Component {
  constructor() {
    super();

    this.state = {
      profileImage: null,
      language: localStorage.getItem("lang"),
      marginLeft: window.innerWidth,
      mediaWidth: 1023,
    };
  }

  componentDidMount() {
    this.setState({
      language: localStorage.getItem("lang"),
    });

    let data = {
      client_id: "PUBLIC_CLIENT",
      grant_type: "refresh_token",
      refresh_token: sessionStorage.getItem("refresh_token"),
    };

    this.interval = setInterval(() => {
      this.props.getRefreshToken(data);
    }, 18000);

    this.props.getProfile();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // blobToBase64 = (blob) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(blob);
  //   return new Promise((resolve) => {
  //     reader.onloadend = () => {
  //       resolve(reader.result);
  //     };
  //   });
  // };

  async componentWillReceiveProps(nextProps) {
    if (nextProps.profileImageStatus) {
      var blob = new Blob([nextProps.profileImage], {
        type: "application/octet-stream",
      });

      const value = URL.createObjectURL(blob);
      this.setState({
        profileImage: value,
      });
    }
  }

  handleLanguage(e) {
    localStorage.setItem("lang", e.target.value);
    this.setState({
      language: e.target.value,
    });
    // this.props.language(e.target.value)
    this.props.SetLanguage(e.target.value);
  }

  toggleHandler01(VarVal) {
    this.props.toggleHandler01(VarVal);
  }

  updateDimensions = () => {
    this.setState({ marginLeft: window.innerWidth });
    // console.log("marginTest",this.state.marginLeft)
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const merginLeft = this.state.marginLeft - (313 + 150 + 180 + 20);
    const mediaWidth = this.state.mediaWidth;
    const windowWidth = window.innerWidth;

    // console.log("media width",windowWidth,mediaWidth)
    return (
      <div className="navBar">
        <div className="navBar_Inner">
          <div className="menuBtn" onClick={(e) => this.toggleHandler01(true)}>
            <span>
              {" "}
              <MenuOutlined />
            </span>
          </div>
          <div className="search_w">
            <input type="search" placeholder="Search" />
          </div>
          <div className="lnp lnpAgent">
            <div class="arrow-down"></div>
            {/* <h2 className="langue">English</h2> */}
            <select
              value={this.state.language}
              onChange={(e) => this.handleLanguage(e)}
              className="langOption"
              name="langue"
              style={
                windowWidth > mediaWidth
                  ? { left: `${merginLeft}px` }
                  : { left: "auto", right: "155px" }
              }
            >
              <option value="" disabled={true}>
                {this.state.language == "en"
                  ? "Choose A Language"
                  : "Choisir la langue"}
              </option>
              <option value="en">English</option>
              <option value="fr">French</option>
            </select>
            {/* <div className="hBell dFlexAllCenter">
              <span className="icon-Asset-41 fSize20"></span>
              <div className="notificationMark">4</div>
            </div> */}
            <div className="nameDesig">
              <h3>Agent</h3>
              <h4>Agent</h4>
            </div>
            <div className="profile_wrapperW0">
              <div className="profile_wrapper">
                <Dropdown
                  overlay={
                    <ul class="pDropDown_W">
                      <li
                        onClick={() => {
                          sessionStorage.removeItem("refresh_token");
                          sessionStorage.removeItem("token_expiretime");
                          sessionStorage.removeItem("refresh_token_expiretime");
                          sessionStorage.removeItem("token");
                          sessionStorage.removeItem("user_type");
                          sessionStorage.removeItem("email");
                          localStorage.removeItem("lang");
                          this.props.Logout();
                        }}
                      >
                        <a>
                          <span class="icon-logout"></span>Logout
                        </a>
                      </li>
                    </ul>
                  }
                  placement="topLeft"
                  trigger={["click"]}
                >
                  {this.state.profileImage ? (
                    <img src={this.state.profileImage} alt="profile pic" />
                  ) : (
                    <img src={IMAGES.IMAGEPO1} alt="profile pic" />
                  )}
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ agentReducer }) => {
  const { profileImage, profileImageStatus, agentLoginStatus } = agentReducer;

  return {
    profileImage,
    profileImageStatus,
    agentLoginStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getRefreshToken: (data) => dispatch(getRefreshToken(data)),
  Logout: () => dispatch(Logout()),
  getProfile: () => dispatch(getProfile()),
  SetLanguage: (lang) => dispatch(SetLanguage(lang)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
