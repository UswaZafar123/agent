import React, { Component } from 'react';
import '../../../css/ag-grid-customization01.css';
import 'antd/dist/antd.css';
import './formfromold.css'
import './addAccount.css'

import qrCode from "../../../Assets/images/qr-code.svg";

import { Select, DatePicker, Modal, Switch,Upload, message } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { Radio} from 'antd';
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
// const customFormat = value => `custom format: ${value.format(dateFormat)}`;
const { Option } = Select;
const { Dragger } = Upload;

function onChange(date, dateString) {
    console.log(date, dateString);
  }


function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
class QRCode extends Component{

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
      console.log("infoParvat",this.state.info)
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
                    QR Code
                    </h1>
                  </div>
                </div>

           
                <div className="chartCardMiddle addSome">
                  <div className="containerBiaN_form">
                    <div className="containerBiaN_f_row">
                      <div className="containerBiaN_f_col width30percent textAlignRight">
                          <label>Shop</label>
                      </div>
                      <div className="containerBiaN_f_col width70percent">
                        <div className="selectAntBiaN">
                          <Select defaultValue="Select Currency" style={{ width: 100+"%" }}
                          value={"shop"}
                          onChange={this.handleChange}
                          
                          >
                            <Option value={'1'}>shop1</Option>
                            <Option value={'1'}>shop2</Option>
                            <Option value={'1'}>shop3</Option>
                          </Select>
                          <span className="icon-arrow-input01 selectArrNB"></span>
                        </div>
                      </div>
                    </div>
                    <div className="containerBiaN_f_row">
                      <div className="containerBiaN_f_col width30percent textAlignRight">
                          <label>POS</label>
                      </div>
                      <div className="containerBiaN_f_col width70percent">
                        <div className="selectAntBiaN">
                          <Select defaultValue="Select Currency" style={{ width: 100+"%" }}
                          value={"POS"}
                          onChange={this.handleChange}
                          
                          >
                            <Option value={'1'}>POS1</Option>
                            <Option value={'1'}>POS2</Option>
                            <Option value={'1'}>POS3</Option>
                          </Select>
                          <span className="icon-arrow-input01 selectArrNB"></span>
                        </div>
                      </div>
                    </div>

                    <div className="qrCode">
                      <img src={qrCode } />
                    </div>
                   
                  </div>

                  

                  
                 

                  {/* <div className="containerBiaN_form">
                    <div className="containerBiaN_f_row">
                    <div className="containerBiaN_f_col width30percent textAlignRight">
                      </div>
                      <div className="containerBiaN_f_col width100percent">
                          <div className="submitBTNBN_wrapper">
                            <button className="submitBTNBN cancelBTN" onClick={this.back}>Cancel</button>
                            <button className="submitBTNBN" onClick={this.showInfo}>Save</button>
                            
                            
                          </div>
                      </div>
                      
                    </div>
                  </div> */}


                  

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
export default QRCode