import React from "react";
import { connect } from "react-redux";
import {
  getPatientConnections, getSchemaFromAries, getSchemaDetailFromAries,
  sendOffer, getCertificateRequestStatus
} from "../../actions";
import {Button, Collapse, Row, Col, Select, Typography, Form, Input, message} from "antd";
import certificateStyles from "./issue_certificate.module.css";
const Option = Select.Option;
const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class IssueCertificate extends React.Component {
  state = {
    selectedPatient: null,
    selectedSchema: null
  };

  componentDidMount() {
    this.props.getPatientConnections();
    this.props.getSchemaFromAries();
  }

  schemaSelectorHandler = (value) => {
    this.setState({selectedSchema: value} );
    this.props.getSchemaDetailFromAries(value)
  };

  processCertificate = (values) => {
    this.props.sendOffer({
      attributes: values,
      type: this.state.selectedSchema,
      connection_id: this.state.selectedPatient
    });
    console.log(values);
  };

  getCertificateStatus = () => {
    const {aries} = this.props;
    console.log("Here", aries.send_offer_response);
    if(aries.send_offer_response && aries.send_offer_response.thread_id){
      // Check for thread id status
      this.props.getCertificateRequestStatus(aries.send_offer_response.thread_id);
    }
  }

  intervalInstance;
  showStatus = false;

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if( (this.props.aries.send_offer_success !== nextProps.aries.send_offer_success) && nextProps.aries.sending_offer === false){
      if(nextProps.aries.send_offer_success){
        message.success('Submitted request for certificate');
        this.cancelIntervalInstance();
        // Start checking for status
        this.intervalInstance = setInterval(() => this.getCertificateStatus(), 5000);
        this.getCertificateStatus();
        this.showStatus = true;
      }
      else{
        message.error('Error while submitting request')
      }
    }
    return true;
  }

  cancelIntervalInstance = () => {
    if(this.intervalInstance){
      clearInterval(this.intervalInstance);
      this.intervalInstance = null;
    }
  };
  getCertificateIssueStatus = () => {
    const {aries} = this.props;
    if(aries.send_offer_response && aries.send_offer_response.thread_id){
      this.props.getCertificateRequestStatus(aries.send_offer_response.thread_id);
    }
  }

  componentWillUnmount() {
    this.cancelIntervalInstance();
  }

  render() {
    const {selectedPatient, selectedSchema} = this.state;
    const {patient, aries} = this.props;

    console.log(patient, aries);
    return (<div className={certificateStyles.container}>
      <Title
        style={{
          fontWeight: "bold",
          fontSize: "18px",
          textAlign: "center",
          marginBottom: "30px"
        }}
      >
      </Title>
      <Row style={{marginBottom: '30px'}}>
        <Col span={8}>
          Patient Name
        </Col>
        <Col span={16}>
          <Select
            value={selectedPatient}
            onChange={(value) => this.setState({selectedPatient: value} )}
            className={certificateStyles.width100Per}
          >
            {
              (patient.connections || []).map(connection =>  <Option value={connection.ConnectionID || connection.connection_id} >
                {connection.Name || connection.connection_id}</Option>)
            }
          </Select>
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          Certificate Schema
        </Col>
        <Col span={16}>
          <Select
            value={selectedSchema}
            onChange={this.schemaSelectorHandler}
            className={certificateStyles.width100Per}
          >
            {
              (aries.schema || []).map(schema =>  <Option value={schema} >{schema.split(':')[2]}</Option>)
            }
          </Select>
        </Col>
      </Row>

      <Row style={{marginTop: '30px'}}>

        <Col span={24}>
          {
            aries.loading_schema_detail === false && aries.schema_detail.attrNames && selectedSchema &&
            <Form className={certificateStyles.form} name="dynamic_form_item" {...layout} onFinish={this.processCertificate}>
              <h3 style={{textAlign: 'center', marginBottom: '20px'}}>{aries.schema_detail.name}</h3>
              {
                aries.schema_detail.attrNames.map(field => <Form.Item
                  label={field}
                  name={field}
                  key={field}
                  rules={[
                    {
                      required: true,
                      message: "Please input this field",
                    },
                  ]}
                >
                  <Input placeholder="" style={{ width: '100%' }} />
                </Form.Item> )
              }
              <Form.Item {...tailLayout} style={{flex: 'unset'}}>
                <Button htmlType="button" type="danger" onClick={() => {
                  this.setState({selectedSchema: null, selectedPatient: null})
                }} style={{marginRight: '20px'}}
                        disabled={
                          !this.state.selectedPatient || aries.loading_schema || aries.loading_schema_detail || aries.sending_offer || this.showStatus
                        }
                >
                  Cancel
                </Button>

                <Button
                  type="primary"
                  //className={certificateStyles.action}
                  //disabled={locations.length && infectionStatus !== "" ? undefined : true}
                  htmlType="submit"
                  disabled={
                    !this.state.selectedPatient || aries.loading_schema || aries.loading_schema_detail || aries.sending_offer || this.showStatus
                  }
                  loading={aries.sending_offer}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          }
        </Col>
      </Row>
      {
        this.showStatus && selectedSchema &&
        <Row style={{marginTop: '20px', fontSize: '1.2em'}}>
          <Col span={12}>
            Certificate Issue Status:
          </Col>
          <Col span={12}>
            {aries.certificate_request_status && aries.certificate_request_status.length > 0 ?
                (aries.certificate_request_status[0].state || 'Unknown').replace('_', ' ') : 'Unknown'}
          </Col>
        </Row>
      }
    </div>);
  }
}

const mapDispatchToProps = {
  getPatientConnections,
  getSchemaFromAries,
  getSchemaDetailFromAries,
  sendOffer,
  getCertificateRequestStatus
};

const mapStateToProps = (state) => {
  return {
    patient: state.data.patient,
    aries: state.data.aries,
  };
};

export const IssueCertificateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueCertificate);

export default IssueCertificateContainer;
