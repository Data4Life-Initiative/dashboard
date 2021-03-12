import React, { useRef, useState } from "react";
import moment from "moment";
import {
  Collapse,
  Button,
  Typography,
  List,
  Select,
  DatePicker,
  Row,
  Col,
} from "antd";
import Icon from "@ant-design/icons";
import { CheckOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLocations,
  selectInfectionStatus,
  selectTimeStamp,
} from "../map/mapSlice";
import {
  addLocationData,
  setCenterData,
  setInfectionStatusData,
  addPatientStart,
  deleteLocation,
  setTimeStampData,
} from "../../actions";
import patientStyles from "./patient.module.css";
import businessImg from "./building.svg";
import placeImg from "./new-place.svg";
import homeImg from "./home.svg";
import addImg from "./add.svg";
import axios from "axios";
import QRCode from "qrcode";
import { createQrEndpoint, qrBaseURl, apiKey, pollPatientInfoUrl,websocketEndpoint } from "../../constants/url_constant";
import { getPresentProofRecord } from "../../apis/aries";
import { prop } from "rambda";

const listItems = [
  {
    key: "actions",
  },
];
const { Panel } = Collapse;
const Option = Select.Option;
const CollapsePanel = (props) => {
  return (
    <Collapse>
      <Panel key={props.title} header={props.title}>
        <div>{props.children}</div>
      </Panel>
    </Collapse>
  );
};
const locationIcon = {
  home: (
    <Icon
      component={() => (
        <img
          alt=""
          src={homeImg}
          className={`${patientStyles.businessIcon} ${patientStyles.customMargin10}`}
        />
      )}
    />
  ),
  work: (
    <Icon
      component={() => (
        <img
          alt=""
          src={businessImg}
          className={`${patientStyles.businessIcon} ${patientStyles.customMargin10}`}
        />
      )}
    />
  ),
  place: (
    <Icon
      component={() => (
        <img
          alt=""
          src={placeImg}
          className={`${patientStyles.businessIcon} ${patientStyles.customMargin10}`}
        />
      )}
    />
  ),
};

const Location = ({ location, id }) => {
  const dispatch = useDispatch();
  const getDateFromTimestamp = moment(location.timestamp).format(
    "YYYY-MM-DD hh:mm:ss A"
  );

  return (
    <div>
      <List.Item
        className={`${patientStyles.padding5} ${patientStyles.listClickable}`}
        actions={[
          <CloseCircleOutlined
            className={patientStyles.closeIcon}
            onClick={() =>
              dispatch(
                deleteLocation({
                  address: location.address,
                  timestamp: location.timestamp,
                })
              )
            }
          />,
        ]}
      >
        <div
          className={patientStyles.myAddress}
          onClick={() => dispatch(setCenterData(location.latLng))}
        >
          <Icon component={() => <div>{locationIcon[location.type]}</div>} />
          <span>{location.address}</span>
          <div className={patientStyles.myTimeStamp}>
            {getDateFromTimestamp}
          </div>
        </div>
      </List.Item>
    </div>
  );
};

const MyPanel = (props) => {
  const dispatch = useDispatch();

  const [adding, setAdding] = useState(null);
  const [place, setPlace] = useState(null);

  const cancel = () => {
    setAdding(null);
    setPlace(null);
  };

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > moment().endOf("day");
  };

  const disabledDateTime = () => {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  };

  const handleKeyPress = (e) => {
    let key = e.which || e.charCode;
    if (key === 13) {
      addPlace("place");
    }
  };

  const addPlace = (type) => {
    if (!timeStampSelect) return;
    if (place) {
      const loc = place[0].geometry.location;
      const latLng = { lat: loc.lat(), lng: loc.lng() };
      const timestamp = timeStampSelect.utc().valueOf();
      const newLocation = {
        type,
        address: place[0].name,
        latLng,
        timestamp,
      };
      dispatch(addLocationData(newLocation));
      cancel();
    }
  };

  const addPatient = () => {
    dispatch(
      addPatientStart({
        coords: locations.map((o) => {
          return {
            lat: o.latLng.lat,
            long: o.latLng.lng,
            timestamp: o.timestamp, // Math.floor(new Date().getTime() / 1000),
          };
        }),
        infection_status: infectionStatus,
        ...props.patientInfo,
      })
    );
  };

  const search = useRef(null);

  const locations = useSelector(selectLocations);
  const infectionStatus = useSelector(selectInfectionStatus);
  const timeStampSelect = useSelector(selectTimeStamp);

  const { Title } = Typography;

  return (
    <div className={patientStyles.container}>
      <Title
        style={{
          fontWeight: "bold",
          fontSize: "18px",
          textAlign: "center",
        }}
      >
        ADD NEW PATIENTS
      </Title>
      <div className={patientStyles.qr}>
        <div className="qr-hold-container">
          <img id="tick" src="/tick.png"  hidden={!Object.keys(props.patientInfo).length}/>
          <img
            src={props.qrInfo.qrURL}
            alt="QR Code"
            className={patientStyles.qrImage}
          />
        </div>
      </div>
      <Row className={patientStyles.patientDetail}>
        <Col span={8}>Patient Name</Col>
        <Col span={16}>
          <input
            className={patientStyles.searchInput}
            value={props.patientInfo.Name}
            readOnly={true}
            placeholder="Patient Name"
          />
        </Col>
      </Row>
      <Row className={patientStyles.patientDetail}>
        <Col span={8}>Patient Email</Col>
        <Col span={16}>
          <input
            className={patientStyles.searchInput}
            value={props.patientInfo.Email}
            readOnly={true}
            placeholder="Patient email"
          />
        </Col>
      </Row>
      <Row className={patientStyles.patientDetail}>
        <Col span={8}>Patient mobile number</Col>
        <Col span={16}>
          <input
            className={patientStyles.searchInput}
            value={props.patientInfo["Mobile number"]}
            readOnly={true}
            placeholder="Patient mobile number"
          />
        </Col>
      </Row>
      <CollapsePanel title="Infection status">
        <Select
          value={infectionStatus}
          onChange={(value) => dispatch(setInfectionStatusData(value))}
          className={patientStyles.width100Per}
        >
          <Option value="">Select</Option>
          <Option value="infected_with_symptom">With Symptoms </Option>
          <Option value="infected_without_symptom">Without Symptoms </Option>
          <Option value="infected_status_unknown">Status Unknown</Option>
        </Select>
      </CollapsePanel>
      <CollapsePanel title="Locations">
        {
          <List
            dataSource={listItems}
            renderItem={(item) =>
              adding ? (
                <div className={patientStyles.marginBottom20}>
                  <List.Item
                    key="search"
                    className={patientStyles.googleSearchInput}
                  >
                    <StandaloneSearchBox
                      onLoad={(ref) => (search.current = ref)}
                      onPlacesChanged={() =>
                        setPlace(search.current.getPlaces())
                      }
                    >
                      <input
                        className={patientStyles.searchInput}
                        onKeyPress={(e) => handleKeyPress(e)}
                      />
                    </StandaloneSearchBox>
                  </List.Item>

                  <DatePicker
                    className={patientStyles.dateTimestamp}
                    format="YYYY-MM-DD HH:mm:ss"
                    disabledDate={disabledDate}
                    disabledTime={disabledDateTime}
                    onChange={(value, dateString) =>
                      dispatch(setTimeStampData(value))
                    }
                    name="txtTimeStamp"
                    showTime={{
                      defaultValue: moment("00:00:00", "HH:mm:ss"),
                    }}
                  />
                  <CheckOutlined
                    width="1em"
                    height="1em"
                    onClick={() => addPlace("place")}
                    className={patientStyles.tickIcon}
                  />
                </div>
              ) : (
                <List.Item
                  onClick={() => setAdding({ query: "", type: "place" })}
                  key="add"
                >
                  <div>
                    <Icon
                      component={() => (
                        <img
                          alt=""
                          src={addImg}
                          className={`${patientStyles.businessIcon} ${patientStyles.customMargin10}`}
                        />
                      )}
                    />
                    Add location
                  </div>
                </List.Item>
              )
            }
          >
            {locations &&
              locations.map((l, i) => <Location location={l} key={i} />)}
          </List>
        }
      </CollapsePanel>

      <Button
        variant="contained"
        type="primary"
        className={patientStyles.action}
        disabled={
          props.patientInfo.Name && infectionStatus !== "" ? false : true
        }
        onClick={addPatient}
      >
        Submit
      </Button>
    </div>
  );
};

let count = 0;
let infoInit = "";

class Patient extends React.Component {
  constructor() {
    super();
    this.state = {
      patientInfo: {},
      qrID: '',
      qrURL: '',
      setTimeoutID: ''
    };
  }
  componentDidMount() {
    const axiosConfig = {
      headers: {
        Authorization: apiKey
      },
    };
    const pollPatientInfo= async (id) => {
      const url =
        pollPatientInfoUrl + id + "&state=verified";
      const response = await window.fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            apiKey,
        },
      });
      if (response.status == 200) {
        let result = await response.json()
        if (result.results.length > 0) {
          result = result.results[0]
          this.setState({
            patientInfo: {
              [result.presentation_proposal_dict.presentation_proposal
                .attributes[0].name]:
                result.presentation_proposal_dict.presentation_proposal
                  .attributes[0].value,
              [result.presentation_proposal_dict.presentation_proposal
                .attributes[1].name]:
                result.presentation_proposal_dict.presentation_proposal
                  .attributes[1].value,
              [result.presentation_proposal_dict.presentation_proposal
                .attributes[2].name]:
                result.presentation_proposal_dict.presentation_proposal
                  .attributes[2].value,
            },
          });
          return;
        }
      }
  
      const timeOutID = setTimeout(
        () => pollPatientInfo(id)
      , 5000);
      this.setState({setTimeoutID: timeOutID})
    }
    const setQRInfo = (id, url) => this.setState({ qrURL: url, qrID: id })
    axios.post(createQrEndpoint,'',axiosConfig).then((response)=>{
      const newQR =  qrBaseURl+ response.data.qr_id
      QRCode.toDataURL(newQR, function (error, url) {
        if (error) throw error
        setQRInfo(response.data.qr_id, url)
        pollPatientInfo(response.data.qr_id)
      });
    }).catch((err) => {
      this.setState({qrID: '', qrURL: ''})
    })
    

    /*
        this.websocketClient.onopen = (e) => {
            setTimeout(()=>{
                this.websocketClient.send(JSON.stringify({
                    'thread_id': "e8a47caa-4590-46dd-8cfa-1437b60afde1"
                }));
            }, 2000);
        };

         */
  }
  //81887817-778c-4b14-8d4c-a56c0f004f68"
componentWillUnmount() {
  clearTimeout(this.state.setTimeoutID)
}

  

  render() {
    const { patientInfo } = this.state;
    return <MyPanel patientInfo={patientInfo} qrInfo = {{qrURL: this.state.qrURL, qrID: this.state.qrID}} />;
  }
}
export default Patient;
