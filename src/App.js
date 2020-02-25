import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MicroFrontEnd from "./mfe-component/MicroFrontEnd";
const dmxHomeHost = "http://localhost:3012/";

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

class App extends React.Component {
  render() {
    return (
      <>
        <AppScaffold {...this.props} />
      </>
    );
  }
}

const getActiveMfe = (rendered, activeTab) => {
  if (!rendered) return null;
  switch (activeTab) {
    case 0:
      return (
        <MicroFrontEnd
          id="left-home"
          target="left-home"
          mfeHost={{
            name: "DrugDetail",
            host: dmxHomeHost
          }}
        />
      );
    case 1:
      return (
        <MicroFrontEnd
          id="right-home"
          target="right-home"
          mfeHost={{
            name: "DrugDetail",
            host: dmxHomeHost
          }}
        />
      );
    default:
      return null;
  }
};

function AppScaffold(props) {
  const [activeTab, setActiveTab] = React.useState(0);
  const [rendered, setRendered] = React.useState(false);

  useEffect(() => {
    setRendered(true);
  }, [rendered]);

  const handleChange = (event, newValue) => {
    //history.push(newValue);
    setRendered(false);
    setActiveTab(newValue);
  };

  return (
    <div id="dh-home">
      (
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
      <TabPanel value={activeTab} index={0}>
        This is the left tab
        <div id="left-home" />
        {getActiveMfe(rendered, activeTab)}
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        This is the right tab
        <div id="right-home" />
        {getActiveMfe(rendered, activeTab)}
      </TabPanel>
      )
    </div>
  );
}

export default App;
