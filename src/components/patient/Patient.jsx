import React, { useRef, useState } from "react";
import moment from "moment";
import { Collapse, Button, Typography, List, Select, DatePicker } from "antd";
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

const MyPanel = () => {
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
      // addPlace("place");
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
        <img
          src="/qr_image.png"
          alt="QR Code"
          className={patientStyles.qrImage}
        ></img>
      </div>
      <CollapsePanel title="Infection status">
        <Select
          value={infectionStatus}
          onChange={(value) => dispatch(setInfectionStatusData(value))}
          className={patientStyles.width100Per}
        >
          <Option value="">Select</Option>
          <Option value="infected_with_symptom">With Symptoms </Option>
          <Option value="infected_without_symptom">Without Symptoms </Option>
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
        disabled={locations.length && infectionStatus !== "" ? undefined : true}
        onClick={addPatient}
      >
        Submit
      </Button>
    </div>
  );
};

export default MyPanel;
