import React,{useState,useEffect} from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function createData(IP, Ceilcam, Floorcam, Battery,Inner,Mu,Sigma,Outer,Freq,Step,Distance, Azimuth, TransitTime, Accept, Reject, Boids, RandomRot, ObstacleFlag_goal, ObstacleFlag_avoidance, CountTime) {
    return {
      IP,
      Ceilcam,
      Floorcam,
      Battery,
      Inner,
      Mu,
      Sigma,
      Outer,
      Freq,
      Step,
      devicedata: [
        {
          "Distance": Distance,
          "Azimuth": Azimuth,
          "TransitTime": TransitTime,
          "Accept": Accept,
          "Reject": Reject,
          "Boids": Boids,
          "RandomRot": RandomRot,
        },
      ],
      Obstacledata: [
        {
          "ObstacleFlag_goal": ObstacleFlag_goal,
          "ObstacleFlag_avoidance": ObstacleFlag_avoidance,
          "CountTime": CountTime,
        },
      ],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
              {row.IP}
            </TableCell>
            <TableCell align="right">{row.Ceilcam}</TableCell>
            <TableCell align="right">{row.Floorcam}</TableCell>
            <TableCell align="right">{row.Battery}</TableCell>
            <TableCell align="right">{row.Inner}</TableCell>
            <TableCell align="right">{row.Mu}</TableCell>
            <TableCell align="right">{row.Sigma}</TableCell>
            <TableCell align="right">{row.Outer}</TableCell>
            <TableCell align="right">{row.Freq}</TableCell>
            <TableCell align="right">{row.Step}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                    {/* Objectdata */}
                  </Typography>
                  <Table size="small" aria-label="Devicedata">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">Distance</TableCell>
                        <TableCell align="right">Azimuth</TableCell>
                        <TableCell align="right">TransitTime</TableCell>
                        <TableCell align="right">Accept</TableCell>
                        <TableCell align="right">Reject</TableCell>
                        <TableCell align="right">Boids</TableCell>
                        <TableCell align="right">RandomRot</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.devicedata.map((devicedataRow) => (
                        <TableRow key={devicedataRow.Distance}>
                          <TableCell component="th" scope="row" align="right">
                            {devicedataRow.Distance}
                          </TableCell>
                          <TableCell align="right">{devicedataRow.Azimuth}</TableCell>
                          <TableCell align="right">{devicedataRow.TransitTime}</TableCell>
                          <TableCell align="right">{devicedataRow.Accept}</TableCell>
                          <TableCell align="right">{devicedataRow.Reject}</TableCell>
                          <TableCell align="right">{devicedataRow.Boids}</TableCell>
                          <TableCell align="right">{devicedataRow.RandomRot}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>


                  <Table size="small" aria-label="obstacledata">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">ObstacleFlag_goal</TableCell>
                        <TableCell align="right">ObstacleFlag_avoidance</TableCell>
                        <TableCell align="right">CountTime</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.Obstacledata.map((ObstacledataRow) => (
                        <TableRow key={ObstacledataRow.ObstacleFlag_goal}>
                          <TableCell component="th" scope="row" align="right">
                            {ObstacledataRow.ObstacleFlag_goal}
                          </TableCell>
                          <TableCell align="right">{ObstacledataRow.ObstacleFlag_avoidance}</TableCell>
                          <TableCell align="right">{ObstacledataRow.CountTime}</TableCell>

                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
}
Row.propTypes = {
        row: PropTypes.shape({
          calories: PropTypes.number.isRequired,
          carbs: PropTypes.number.isRequired,
          fat: PropTypes.number.isRequired,
          history: PropTypes.arrayOf(
            PropTypes.shape({
              amount: PropTypes.number.isRequired,
              customerId: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
            }),
          ).isRequired,
          name: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          protein: PropTypes.number.isRequired,
        }).isRequired,
};


      
export function CollapsibleTable({reddata}) {

  const [iplist,setIplist]=useState([]);
  useEffect(()=>{
    const ip=Object.keys(reddata).filter((key)=>key.includes("192.168"));
    setIplist(ip);
  },[reddata]);

  const rows = iplist.map((ip)=>(  
      createData(ip, reddata[ip]?.RobotStatus?.CeilCam || 0,reddata[ip]?.RobotStatus?.FloorCam || 0, reddata[ip]?.RobotStatus?.Battery || 0,reddata[ip]?.param?.Inner_Rth || 0,reddata[ip]?.param?.Mu || 0,reddata[ip]?.param?.Sigma || 0,reddata[ip]?.param?.Outer_Rth || 0,reddata[ip]?.param?.MarkerColor || 0,reddata[ip]?.DeviceData?.Step || 0, reddata[ip]?.DeviceData?.Distance || 0, reddata[ip]?.DeviceData?.Azimuth || 0, reddata[ip]?.DeviceData?.TransitTime || 0, reddata[ip]?.DeviceData?.Accept || 0, reddata[ip]?.DeviceData?.Reject || 0, reddata[ip]?.DeviceData?.Boids ||0, reddata[ip]?.DeviceData?.RandomRot || 0,reddata[ip]?.ObstacleData?.ObstacleFlag_goal || 0, reddata[ip]?.ObstacleData?.ObstacleFlag_avoidance || 0, reddata[ip]?.ObstacleData?.CountTime || 0)
    ));



        return (
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>IP</TableCell>
                  <TableCell align="right">Ceilcam</TableCell>
                  <TableCell align="right">Floorcam</TableCell>
                  <TableCell align="right">Battery</TableCell>
                  <TableCell align="right">Inner</TableCell>
                  <TableCell align="right">Mu</TableCell>
                  <TableCell align="right">Sigma</TableCell>
                  <TableCell align="right">Outer</TableCell>
                  <TableCell align="right">Freq</TableCell>
                  <TableCell align="right">Step</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.IP} row={row} />
                ))}
              </TableBody>
            </Table>
            {/* {JSON.stringify(reddata)} */}
          </TableContainer>
          
        );
}