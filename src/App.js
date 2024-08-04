import { useState, useEffect } from 'react'
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import TevelLogo from './world4.ico';
import { LineChart } from '@mui/x-charts/LineChart';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';

var w = window.innerWidth;
var h = window.innerHeight;
const goodcolor = ['#43a047', '#e8f5e9']
const mehcolor = ['#ffd740', '#212121']
const badcolor = ['#e53935', '#ffebee']
const yazumcolor = ['#7c4dff', '#ede7f6']

const ydata100 = [100, 100, 100, 95, 100, 100, 100, 100, 100, 100, 0, 0, 0, 100, 100, 76, 100, 100, 100, 100, 100,
  100, 56, 100];
const ydata350 = [100, 100, 100, 100, 100, 100, 100, 100, 87, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 68, 100,
  100, 100, 100];
const xdata = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'
  , '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']

  function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 5}} justifyContent="center">
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function App() {
  const [value, setValue] = React.useState(0);
  const [siteList, setsiteList] = useState([{}])
  const [lastCheck, setlastCheck] = useState([{}])

  useEffect(() => {
    fetch("http://localhost:5000/").then(
      res => res.json()
    ).then(
      siteList => {
        setsiteList(siteList)
        console.log(siteList)
      }
    )
  }, [])

  useEffect(() => {
    fetch("http://localhost:5000/lastcheck").then(
      res => res.json()
    ).then(
      lastCheck => {
        setlastCheck(lastCheck)
        console.log(lastCheck)
      }
    )
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    let tabs = []
    let tabsinfo = []
    var nsiteList = JSON.stringify(siteList).split('"')
    nsiteList = removeA(nsiteList, ',')
    nsiteList = removeA(nsiteList, '[')
    nsiteList = removeA(nsiteList, ']')

    var adm100color = goodcolor
    var adm350color = yazumcolor
    var vepg100color = goodcolor
    var vepg350color = badcolor
    var ntp1color = goodcolor
    var ntp2color = goodcolor
    var gpscolor = badcolor
    var tabcolor = '#e8f5e9'
    var radioscards = 7
    var radiositems = 9
    console.log(lastCheck.Avital)
    for (let i = 0; i < nsiteList.length; i++) {
      tabs.push(<Tab label={nsiteList.at(i)} {...a11yProps(i)} sx={{fontWeight: 'bold', textTransform: "none", fontSize: 16, color: tabcolor}} />)
      tabsinfo.push(
      <TabPanel value={value} index={i} justifyContent="center">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3} justifyContent="center" sx={{borderRadius: radioscards}}>
          <Grid xs={2.7} justifyContent="center">
              <Item sx={{borderRadius: radiositems}}>
                <Card variant="outlined" sx={{ width: '100%', borderRadius: radioscards}} justifyContent="center">
                  <Box sx={{ p: 2 }}>
                    <Typography gutterBottom variant="h5" component="div" fontWeight='bold'>
                      MME admin state
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      connectivity to MME - admin state
                    </Typography>
                  </Box>
                  <Divider />
                  <Stack direction="row" justifyContent="center">
                  <Box sx={{ p: 2, width: '100%', backgroundColor: adm100color.at(0), borderRadius: 2}} justifyContent='center'>
                  <Typography variant="h5" component="div" justifyContent='center' color={adm100color.at(1)} fontWeight='bold'>
                      100
                  </Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box sx={{ p: 2, width: '100%', backgroundColor:  adm350color.at(0), borderRadius: 2 }} justifyContent='center'>
                  <Typography variant="h5" component="div" justifyContent='center' color={adm350color.at(1)} fontWeight='bold'>
                      350
                  </Typography>
                  </Box>
                  </Stack>
                </Card>
              </Item>
            </Grid>
            <Grid xs={2.7}>
              <Item sx={{borderRadius: radiositems}}>
                <Card variant="outlined" sx={{ width: '100%', borderRadius: radioscards}}>
                  <Box sx={{ p: 2 }}>
                    <Typography gutterBottom variant="h5" component="div" fontWeight='bold'>
                      vEPG 100
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      ping to vEPG - success rate
                    </Typography>
                  </Box>
                      <Divider />
                      <Box sx={{ p: 2, backgroundColor: vepg100color.at(0), borderRadius: 2}}>
                    <Typography variant="h5" color={vepg100color.at(1)} fontWeight='bold'>
                      100%
                    </Typography>
                    </Box>
                </Card>
              </Item>
            </Grid>
            <Grid xs={2.7}>
              <Item sx={{borderRadius: radiositems}}>
                <Card variant="outlined" sx={{ width: '100%', borderRadius: radioscards}}>
                  <Box sx={{ p: 2 }}>
                    <Typography gutterBottom variant="h5" component="div" fontWeight='bold'>
                      vEPG 350
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      ping to vEPG - success rate
                    </Typography>
                  </Box>
                      <Divider />
                  <Box sx={{ p: 2, backgroundColor: vepg350color.at(0), borderRadius: 2}}>
                    <Typography variant="h5" color={vepg350color.at(1)} fontWeight='bold'>
                      0%
                    </Typography>
                  </Box>
                </Card>
              </Item>
            </Grid>
            <Grid xs={2.7}>
              <Item sx={{borderRadius: radiositems}}>
                <Card variant="outlined" sx={{ width: '100%', borderRadius: radioscards}}>
                  <Box sx={{ p: 2 }}>
                    <Typography gutterBottom variant="h5" component="div" fontWeight='bold'>
                      NTP & GPS
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      connectivity to time provider
                    </Typography>
                  </Box>
                      <Divider />
                  <Box sx={{ }}>
                    <Stack direction="row" justifyContent="center">
                      <Box sx={{ p: 2, width: '100%', backgroundColor: ntp1color.at(0), borderRadius: 2}} justifyContent='center'>
                        <Typography variant="h6" component="div" justifyContent='center' color={ntp1color.at(1)} fontWeight='bold'>
                            NTP 1
                        </Typography>
                      </Box>
                      <Divider orientation="vertical" flexItem />
                      <Box sx={{ p: 2, width: '100%', backgroundColor: ntp2color.at(0), borderRadius: 2 }} justifyContent='center'>
                        <Typography variant="h6" component="div" justifyContent='center' color={ntp2color.at(1)} fontWeight='bold'>
                            NTP 2
                        </Typography>
                      </Box>
                      <Divider orientation="vertical" flexItem />
                      <Box sx={{ p: 2, width: '100%', backgroundColor: gpscolor.at(0), borderRadius: 2 }} justifyContent='center'>
                        <Typography variant="h6" component="div" justifyContent='center' color={gpscolor.at(1)} fontWeight='bold'>
                            GPS
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Card>
              </Item>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{paddingTop: 10, width: '100%'}} width={w-300} height={h-500}>
        <LineChart
        grid={{ horizontal: true }}
        justifyContent="center"
        width={w-300}
        height={h-500}
        sx={{ width: '100%'}}
        series={[{ data: ydata100, label: "100", color: "#64b5f6"}, { data: ydata350 , label: "350", color: "#f06292"}]}
        xAxis={[{ scaleType: 'point', data: xdata }]}/>
        </Box>
      </TabPanel>
    )
    }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Box sx={{ flexGrow: 1, p: 1}}>
      <AppBar position="static"  sx={{borderRadius: 10}}>
        <Toolbar>
          <IconButton
            edge="start"
            sx={{ mr: 2}}
          >
            <img src ={TevelLogo} height={60} width={60}/>
          </IconButton>

          <Typography variant="h3" component="div" sx={{ flexGrow: 1 , letterSpacing: 6, fontWeight: 'bold', fontFamily: "cursive" }}>
            Tevel
          </Typography>

        </Toolbar>
      </AppBar>
    </Box>

    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: h/1.08}}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="vertical tabs"
        indicatorColor='primary'
        textColor='primary'
        sx={{ borderRight: 3, borderColor: 'divider', fontWeight: 'bold'}}
      >
      {tabs}
      </Tabs>
      {tabsinfo}
    </Box>
    </ThemeProvider>
  );
}