import React from "react";
import { connect } from "react-redux";
import {
  getPatientConnections, getSchemaFromAries, getSchemaDetailFromAries,
  sendOffer
} from "../../actions";
import {Button, Collapse, Row, Col, Select, Typography, Form, Input, message} from "antd";
import certificateStyles from "./issue_certificate.module.css";
import {values} from "rambda";
const { Panel } = Collapse;
const Option = Select.Option;
const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
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
    if(aries.send_offer_response && aries.send_offer_response.thread_id){
      // Check for thread id status
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
        this.intervalInstance = setTimeout(() => this.getCertificateStatus, 5000);
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
      return 'Unknown';
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
        ISSUE Certificates
      </Title>
      <Row style={{marginBottom: '30px'}}>
        <Col span={8}>
          Patient
        </Col>
        <Col span={16}>
          <Select
            value={selectedPatient}
            onChange={(value) => this.setState({selectedPatient: value} )}
            className={certificateStyles.width100Per}
          >
            {
              (patient.connections || []).map(connection =>  <Option value={connection.connection_id} >{connection.connection_id}</Option>)
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
              (aries.schema || []).map(schema =>  <Option value={schema} >{schema}</Option>)
            }
          </Select>
        </Col>
      </Row>

      <Row style={{marginTop: '30px'}}>

        <Col span={24}>
          {
            aries.loading_schema_detail === false && aries.schema_detail.attrNames &&
            <Form className={certificateStyles.form} name="dynamic_form_item" {...layout} onFinish={this.processCertificate}>
              <h3>{aries.schema_detail.name}</h3>
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
              <Form.Item>
                <Button
                  type="primary"
                  className={certificateStyles.action}
                  //disabled={locations.length && infectionStatus !== "" ? undefined : true}
                  htmlType="submit"
                  disabled={
                    !this.state.selectedPatient || aries.loading_schema || aries.loading_schema_detail || aries.sending_offer
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
        this.showStatus &&
        <Row>
          <Col span={12}>
            Certificate Issue Status:
          </Col>
          <Col span={12}>
            {this.getCertificateIssueStatus()}
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
  sendOffer
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
