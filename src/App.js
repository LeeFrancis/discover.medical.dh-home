import React, { useEffect } from "react";
import MicroFrontEnd from "./mfe";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const drugDetailHost = "http://localhost:3012";

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

function App(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="dh-home">
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Drug Summary" />
          <Tab label="Drug Detail" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <MicroFrontEnd
          id="left-home"
          name="DrugDetail"
          host={drugDetailHost}
          targetContainer="dh-home-left"
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MicroFrontEnd
          id="right-home"
          name="DrugDetail"
          host={drugDetailHost}
          targetContainer="dh-home-right"
        />
      </TabPanel>
    </div>
  );
}

export default App;
