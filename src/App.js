import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


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
       <AppScaffold {...this.props}/>
    </>);
  }
}

function AppScaffold(props){
  const [value, setValue] = React.useState(0);
  //let history = props.history;

  const handleChange = (event, newValue) => {
    //history.push(newValue);
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
      <TabPanel value={value} index={0}></TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
    </div>
  );
}

export default App;

/*
// <MicroFrontEnd
//   id="left-home"
//   name="DrugDetail"
//   host={drugDetailHost}
//   targetContainer="dh-home-left"
//   history={history}
// />
        // <MicroFrontEnd
        //   id="right-home"
        //   name="DrugDetail"
        //   host={drugDetailHost}
        //   targetContainer="dh-home-right"
        //   history={history}
        //   data={{
        //     html:
        //       "<h4>This is data passed via props</h4><div>but not in a good way.. Have to work on this</div>"
        //   }}
        // />


*/
