import React, { Component } from 'react';
import { Select } from 'antd';
import { Row,Col,Tabs,Tab } from 'react-bootstrap';

const { Option } = Select;


class AgentMember extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gridApi: null,
            isModalVisible: false,
            kycMerchantCategory: null,
            view: false
        };
    }


    handleChange = (e) => {
        this.setState({ kycMerchantCategory: e });
    }

    showModal = () => {
        this.setState({
            isModalVisible: true
        })
    };

    handleOk = () => {
        this.setState({
            isModalVisible: true
        })
    };

    onCloseHandler = () => {
        this.setState({
            isModalVisible: false
        })
    }
    handleCancel = () => {
        this.setState({
            isModalVisible: false
        })
    };
    onTax = () => {
        // this.setState({
        //   view: true
        // })
        this.props.history.push('/taxationOffice')
    }
    sendMoney=()=>{
        this.props.history.push('/Send_Money/Confrom')

    }
    render() {
        return (
            <div className="main_contain responsive_p">
                <div className="merch_m_list_w">

                    <div className="merch_list_card">
                        <div className="section_custom">
                            <div className="sectionInn">
                                <div className="chartCard_w">
                                    <div className="chartCardTop">
                                        <div className="kyccustomformheading">
                                            <h1 className="zeropadding list_top_heading textAlignCenter text-center">
                                                Add a New Agent Member 
                                            </h1>

                                        </div>
                                    </div>
                                    <div className="kyccustomform chartCardMiddle" style={{ padding: "24px" }}>

                                        <div className="sendkycdetailsbox kycDetailsBox">

                                            <div className="kycformBox forBootSHandled">

                                                    <Row>
                                                        <Col style={{display:"flex", alignItems:"center", justifyContent:"flex-start", marginLeft:"1%"}}><label className="formColLabel">Name</label></Col>
                                                        <Col md={8}>
                                                            <div className="formCol width100p">
                                                            <input
                                                                type="text"
                                                                placeholder="Enter valid email"
                                                            />                            
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col style={{display:"flex", alignItems:"center",  justifyContent:"flex-start", marginLeft:"1%"}}><label className="formColLabel">Amount</label></Col>
                                                        <Col md={8}>
                                                            <div className="formCol width100p">
                                                            <input
                                                                type="text"
                                                                placeholder="Enter valid amount"
                                                            />                            
                                                            </div>
                                                        </Col>
                                                    </Row>


                                                    <Row className="mbr20">
                                                        <Col style={{display:"flex", alignItems:"center",  justifyContent:"flex-start", marginLeft:"1%"}}><label className="formColLabel">Currency</label></Col>
                                                        <Col md={8}>
                                                        <div className="formCol width100p">
                                                            <Select
                                                            defaultValue="select_status"
                                                            style={{width:100+"%"}}
                                                            onChange={this.handleChange}
                                                            className="slt"
                                                        >
                                                            <Option value="select_status" disabled>Select Currency</Option>
                                                            <Option value="USD">USD</Option>
                                                            <Option value="GBP">GBP</Option>
                                                            <Option value="EUR">EUR</Option>
                                                        </Select>


                                                        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" style={{position:"absolute", right:"100px", top:"61%"}} xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.7144 1.87667L8.88903 9.60314C8.77901 9.72761 8.64254 9.82753 8.48897 9.89603C8.33541 9.96453 8.16838 10 7.99936 10C7.83033 10 7.66331 9.96453 7.50974 9.89603C7.35617 9.82753 7.2197 9.72761 7.10968 9.60314L0.284286 1.87667C-0.3671 1.13917 0.172956 0 1.17396 0H14.8267C15.8277 0 16.3678 1.13917 15.7144 1.87667Z" fill="#343A40" />
                                                        </svg>
                                                        </div>
                                                        </Col>
                                                    </Row>


                                                    <Row>
                                                        <Col style={{display:"flex", alignItems:"center",  justifyContent:"flex-start", marginLeft:"1%"}}><label className="formColLabel">Note</label></Col>
                                                        <Col md={8}>
                                                            <div className="formCol width100p sendmoneycol">
                                                                <textarea placeholder="Note"></textarea>                        
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                </div>
                                            </div>

                                                </div>

                                                <div>
                                            <div class="custom-d-flex confirm_p_w mTB00 button-container">
                                              
                                                <button class="blackbtn aryousureBTN confirmBtnR">Cancel
</button>
                                                <button class="aryousureBTN confirmBtnR" onClick={this.sendMoney}>Send Money</button>
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
export default AgentMember