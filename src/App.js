import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MicroFrontEnd from "./mfe-component/MicroFrontEnd";
import { useHistory, useLocation, useParams } from "react-router-dom";
const drugDetailHost = process.env.REACT_APP_DRUG_DETAIL;

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  useEffect(() => {
    return () => {
      console.log("Drug Detail unmounting");
    };
  });

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const getActiveMfe = (rendered, activeTab) => {
  if (!rendered) return null;
  switch (activeTab) {
    case 0:
      return (
        <MicroFrontEnd
          id="left-home"
          key="left-home"
          target="left-home"
          mfeHost={{
            name: "DrugDetail",
            host: drugDetailHost,
            path: process.env.REACT_APP_DRUG_DETAIL_PATH
          }}
        />
      );
    case 1:
      return (
        <MicroFrontEnd
          id="right-home"
          key="right-home"
          target="right-home"
          mfeHost={{
            name: "DrugDetail",
            host: drugDetailHost,
            path: process.env.REACT_APP_DRUG_DETAIL_PATH
          }}
        />
      );
    default:
      return null;
  }
};

const WrappedTabPanels = React.memo(
  ({ activeTab, rendered }) => {
    return (
      <>
        <TabPanel value={activeTab} index={0} key={0}>
          This is the left tab
          <div id="left-home" />
          {getActiveMfe(rendered, activeTab)}
        </TabPanel>
        <TabPanel value={activeTab} index={1} key={1}>
          This is the right tab
          <div id="right-home" />
          {getActiveMfe(rendered, activeTab)}
        </TabPanel>
      </>
    );
  },
  (prevProps, nextProps) => {
    console.log("here");
  }
);

const App = props => {
  const { tab } = useParams();
  const [activeTab, setActiveTab] = React.useState(tab ? parseInt(tab) : 0);
  const [rendered, setRendered] = React.useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setRendered(true);
  }, [rendered]);
  const handleChange = (event, newValue) => {
    setRendered(false);
    setActiveTab(newValue);
    history.push(location.pathname.replace(/(\/[\d])$/, "") + `/${newValue}`);
  };

  return (
    <div id="dh-home" key="1">
      <AppBar position="static">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Drug Summary" />
          <Tab label="Drug Detail" />
        </Tabs>
      </AppBar>
      <WrappedTabPanels activeTab={activeTab} rendered={rendered} />
    </div>
  );
};

export default App;
