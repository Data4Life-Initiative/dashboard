import React, { useRef, useState } from "react";
import { Collapse, Button, Typography, List, Select, Input } from "antd";
import Icon from "@ant-design/icons";
import { CheckOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { selectLocations, selectInfectionStatus } from "../map/mapSlice";
import {
  addLocationData,
  setCenterData,
  setInfectionStatusData,
} from "../../actions";
import patientStyles from "./patient.module.css";
import businessImg from "./building.svg";
import placeImg from "./new-place.svg";
import homeImg from "./home.svg";
import closeImg from "./close.svg";
import addImg from "./add.svg";

const listItems = [
  {
    key: "actions",
  },
];
let selectValue = "";
const { Panel } = Collapse;
const { Option } = Select;
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
          src={placeImg}
          className={`${patientStyles.businessIcon} ${patientStyles.customMargin10}`}
        />
      )}
    />
  ),
};

const Location = ({ location, id }) => {
  const dispatch = useDispatch();
  return (
    <List.Item
      className={patientStyles.listClickable}
      onClick={() => dispatch(setCenterData(location.latLng))}
    >
      <div className="myAddress">
        <Icon component={() => <div>{locationIcon[location.type]}</div>} />
        {location.address}
      </div>
    </List.Item>
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

  const addPlace = (type) => {
    if (place) {
      const loc = place[0].geometry.location;
      const latLng = { lat: loc.lat(), lng: loc.lng() };
      const newLocation = {
        type,
        address: place[0].name,
        latLng,
      };
      dispatch(addLocationData(newLocation));
      cancel();
    }
  };

  const search = useRef(null);

  const locations = useSelector(selectLocations);
  const infectionStatus = useSelector(selectInfectionStatus);
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
      {/* <CollapsePanel title="Patients mobile number">
                <Input aria-describedby="my-helper-text" />
            </CollapsePanel> */}

      <CollapsePanel title="Locations">
        {
          <List
            dataSource={listItems}
            renderItem={(item) =>
              adding ? (
                <div>
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
                      <input className={patientStyles.searchInput} />
                    </StandaloneSearchBox>

                    <CheckOutlined
                      width="1em"
                      height="1em"
                      onClick={() => addPlace("place")}
                      className={patientStyles.marginRight10px}
                    />

                    {/* <Button
                      type="primary"
                      shape="circle"
                      size="large"
                      icon={<CloseCircleOutlined />}
                      onClick={cancel}
                    /> */}
                  </List.Item>
                  <List.Item key="actions">
                    {/* <Icon
                      component={() => (
                        <img
                          src={closeImg}
                          className={`${patientStyles.businessIcon} ${patientStyles.customMarginTop5}`}
                          onClick={cancel}
                        />
                      )}
                    /> */}

                    {/* {["home", "work", "place"].map((t) => (
                      <Button
                        htmlType="button"
                        key={t}
                        className={`${patientStyles.borderNone} ${patientStyles.noBackground}`}
                        icon={locationIcon[t]}
                        onClick={() => addPlace(t)}
                        disabled={place ? undefined : true}
                      ></Button>
                    ))} */}
                  </List.Item>
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
      <CollapsePanel title="Infection status">
        <Select
          defaultValue=""
          onChange={(value) => dispatch(setInfectionStatusData(value))}
          className={patientStyles.width100Per}
        >
          <Option value="">Select</Option>
          <Option value="1">With Symptoms </Option>
          <Option value="2">Without Symptoms </Option>
        </Select>
      </CollapsePanel>
      <Button
        variant="contained"
        type="primary"
        className={patientStyles.action}
        disabled={locations.length && infectionStatus != "" ? undefined : true}
      >
        Submit
      </Button>
    </div>
  );
};

export default MyPanel;
