import React, { Component } from 'react';
import '../../../css/ag-grid-customization01.css';
import 'antd/dist/antd.css';
import './formfromold.css'
import './addAccount.css'

// import myImage from "../../BIAPAYNPM/src/logos_copy.png";

import { Select, DatePicker, Modal, Switch,Upload, message } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { Radio} from 'antd';
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
// const customFormat = value => `custom format: ${value.format(dateFormat)}`;
const { Option } = Select;
const { Dragger } = Upload;




function handleChange(value) {
    console.log(`selected ${value}`);
  }
function onChange(value) {
    console.log(`selected ${value}`);
  }


class Accounts extends Component{

    constructor(props) {
        super(props);
        this.state = {
          isModalVisible:false,
          valueRadio:1,
          info:false
      
    }

  
    
}

showInfo(){
  // this.setState({ info: true });
}
handleChange(value) {
  console.log(`selected ${value}`);
}
handleChange=(value)=> {
    console.log(`selected ${value}`);
  }
  back=()=>{
      this.props.cancel()
  }
    render(){
    return (
      <>
      <div className="main_contain">
      <div className="merch_m_list_w">
        <div className="merch_list_card" id="merch_list_card">
          <div className="section_custom">
            <div className="sectionInn">
              <div className="chartCard_w">
                <div className="chartCardTop">
                  <div className="flCenterColumn">
                    <h1 className="list_top_heading textAlignCenter">
                    Accounts
                    </h1>
                  </div>
                </div>

           
                <div className="chartCardMiddle">
                    <div className="accountmainBox">
                      <div className="kycformBox">
                        <h3 className="bankDetails pd_16">Bank Details</h3>
                          <div className="accountTable_wrap">
                            <table className="accountTable foroverwrite">
                              <thead>
                                <th>Bank Name</th>
                                <th>Bank Code</th>
                                <th>Branch Code</th>
                                <th>Account Number</th>
                                <th>Key</th>
                                <th>Currency</th>
                                <th>IBAN</th>
                                <th>SWIFT</th>
                                <th></th>
                              </thead>
                              <div className="customspaceD"></div>
                              <tbody>
                                <tr>
                                  <td>
                                    <Select defaultValue="Select Bank" style={{ width: 100+"%" }}
                                     className="tableSelect"
                                        value={"bank"}
                                        onChange={this.handleChange}
                                        
                                        >
                                          <Option value={'1'}>Axis Bank</Option>
                                          <Option value={'1'}>HDFC Bank</Option>
                                          <Option value={'1'}>Kotak Bank</Option>
                                      </Select>
                                  </td>
                                  <td><input type="text" placeholder="Bank Code"/></td>
                                  <td><input type="text" placeholder="Bank Code"/></td>
                                  <td><input type="text" placeholder="Bank Code"/></td>
                                  <td><input type="text" placeholder="Bank Code"/></td>
                                  <td><input type="text" placeholder="Bank Code"/></td>
                                  <td><input type="text" placeholder="Bank Code"/></td>
                                  <td><input type="text" placeholder="Bank Code"/></td>
                                  <td style={{display:"flex"}}>
                                    <button className="rowAddButton">+</button>
                                    <button className="rowdeleteButton">-</button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div className="bankDBTN_wrap">
                              <button className="bankDBTN">Save Bank Details</button>
                            </div>
                          </div>
                      </div>
                    </div>

                    <div className="accountmainBox">
                      <div className="kycformBox">
                        <h3 className="bankDetails pd_16">Mobile Accounts Details</h3>
                          <div className="accountTable_wrap">
                            <table className="accountTable foroverwrite">
                              <thead>
                                <th>Operators</th>
                                <th>Mobile No</th>
                                <th>Country</th>
                                <th></th>
                                <th></th>
                              </thead>
                              <div className="customspaceD"></div>
                              <tbody>
                                <tr>
                                  <td>
                                    <Select defaultValue="Select Operators" style={{ width: 100+"%" }}
                                     className="tableSelect"
                                        value={"Operator"}
                                        onChange={this.handleChange}
                                        
                                        >
                                          <Option value={'1'}>Operator1</Option>
                                          <Option value={'1'}>Operator2</Option>
                                          <Option value={'1'}>Operator3</Option>
                                      </Select>
                                  </td>
                                  <td>
                                    <Select defaultValue="Select Mobile No" style={{ width: 100+"%" }}
                                     className="tableSelect"
                                        value={"Mobile No"}
                                        onChange={this.handleChange}
                                        
                                        >
                                          <Option value={'1'}>9854785412</Option>
                                          <Option value={'1'}>9854785412</Option>
                                          <Option value={'1'}>9854785412</Option>
                                      </Select>
                                  </td>
                                  <td>
                                    <Select defaultValue="Select Country" style={{ width: 100+"%" }}
                                     className="tableSelect"
                                        value={"Country"}
                                        onChange={this.handleChange}
                                        
                                        >
                                          <Option value={'1'}>India</Option>
                                          <Option value={'1'}>USA</Option>
                                          <Option value={'1'}>Sauth Africa</Option>
                                      </Select>
                                  </td>
                                  <td>
                                  <span class="badge badge-pill badge-success">
                                     verified
                                  </span>
                                  <a style={{
                                              textDecoration: "underline",
                                              color: "blue",
                                              fontSize:"11px"
                                            }} >
                                      </a>
                                  </td>
                                  <td style={{display:"flex"}}>
                                    <button className="rowdeleteButton">-</button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <Select defaultValue="Select Operators" style={{ width: 100+"%" }}
                                    className="tableSelect"
                                        value={"Operator"}
                                        onChange={this.handleChange}
                                        
                                        >
                                          <Option value={'1'}>Operator1</Option>
                                          <Option value={'1'}>Operator2</Option>
                                          <Option value={'1'}>Operator3</Option>
                                      </Select>
                                  </td>
                                  <td>
                                    <Select defaultValue="Select Mobile No" style={{ width: 100+"%" }}
                                    className="tableSelect"
                                        value={"Mobile No"}
                                        onChange={this.handleChange}
                                        
                                        >
                                          <Option value={'1'}>9854785412</Option>
                                          <Option value={'1'}>9854785412</Option>
                                          <Option value={'1'}>9854785412</Option>
                                      </Select>
                                  </td>
                                  <td>
                                    <Select defaultValue="Select Country" style={{ width: 100+"%" }}
                                     className="tableSelect"
                                        value={"Country"}
                                        onChange={this.handleChange}
                                        
                                        >
                                          <Option value={'1'}>India</Option>
                                          <Option value={'1'}>USA</Option>
                                          <Option value={'1'}>Sauth Africa</Option>
                                      </Select>
                                  </td>
                                  <td>
                                  <span class="badge badge-pill badge-danger">
                                            Not Verified
                                          </span>
                                  <a style={{
                                              textDecoration: "underline",
                                              color: "blue",
                                              fontSize:"11px"
                                            }} >
                                      </a>
                                  </td>
                                  <td style={{display:"flex"}}>
                                    <button className="rowAddButton">+</button>
                                    <button className="rowdeleteButton">-</button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div className="bankDBTN_wrap">
                              <button className="bankDBTN">Save Mobile Account Details</button>
                            </div>
                          </div>
                      </div>
                    </div>

                    <div className="accountmainBox">
                      <div className="kycformBox">
                        <h3 className="bankDetails pd_16">Credit Card Details</h3>
                          <div className="accountTable_wrap">
                            <table className="accountTable foroverwrite">
                              <thead>
                                <th>Select card type</th>
                                <th>Name</th>
                                <th>Number</th>
                                <th>Card Expiry</th>
                                <th colspan="4">nvoice Address</th>
                              </thead>
                                <thead>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Steet</th>
                                <th>City</th>
                                <th>Country</th>
                                <th></th>
                              </thead>
                              <div className="customspaceD"></div>
                              <tbody>
                                <tr>
                                  <td>
                                    <Select defaultValue="Select Operators" style={{ width: 100+"%" }}
                                     className="tableSelect"
                                        value={"Operator"}
                                        onChange={this.handleChange}
                                        
                                        >
                                          <Option value={'1'}>Operator1</Option>
                                          <Option value={'1'}>Operator2</Option>
                                          <Option value={'1'}>Operator3</Option>
                                      </Select>
                                  </td>
                                  <td>
                                    <input type="text" />
                                  </td>
                                  <td>
                                    <input type="text" />
                                  </td>
                                  <td>
                                  <DatePicker
                                    // selected={this.state.dateOfBirthValue}
                                    maxDate={new Date()}
                                    className="form-control"
                                    name="dateofbirth"
                                    value={""}
                                    onChange={onChange}
                                    // format={dateFormat}
                                    style={{ width: 100 + "%", height: 32 }}
                                    defaultValue={""}
                                    className="tableDatepicker"
                                  />
                                  </td>
                                  <td>
                                    <input type="text" />
                                  </td>
                                  <td>
                                    <input type="text" />
                                  </td>
                                  <td>
                                    <Select defaultValue="Select Mobile No" style={{ width: 100+"%" }}
                                     className="tableSelect"
                                        value={"Mobile No"}
                                        onChange={this.handleChange}
                                        
                                        >
                                          <Option value={'1'}>9854785412</Option>
                                          <Option value={'1'}>9854785412</Option>
                                          <Option value={'1'}>9854785412</Option>
                                      </Select>
                                  </td>
                                  <td style={{display:"flex"}}>
                                    <button className="rowAddButton">+</button>
                                    <button className="rowdeleteButton">-</button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div className="bankDBTN_wrap">
                              <button className="bankDBTN">Save Credit Card Details</button>
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
    </>
    );
}
}
export default Accounts