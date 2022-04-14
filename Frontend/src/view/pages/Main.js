import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Box} from "@mui/material";
import {GrBeacon} from "react-icons/gr";
import {MdDeviceHub} from "react-icons/md";
import {getBeacons,getDevices} from "../../interface/interface";

const certainty = [
    "#fff",
    "#6fd994",
    "#f1aa58",
    "#f00",
]

const nameStyle =(idx) => ({
    paddingLeft:1,
    paddingRight:1,
    marginTop:-0.5,
    fontWeight:"bold",
    fontSize:"0.8rem",
    textAlign:"center",
    border:"2px solid black",
    backgroundColor:certainty[idx],
    borderRadius:2
})

const beaconStyle = {
    padding:10,
    backgroundColor:"#FFEAA7",
    outline:"3px solid black",
    borderRadius:18
}

const deviceStyle =()=> ({
    paddingBottom:3,
    color:"white",
    backgroundColor:"#ff5b5b",
    border:"2px solid black",
    borderRadius:100
})

const containerStyle =(x,y)=> ({
    position:"absolute",
    top:x+"%",
    left:y+"%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
})

const drawBeacon = (x,y,name) => {
    return(
        <Box sx={containerStyle(x,y)}>
            <GrBeacon size={"2.8rem"} style={beaconStyle}/>
            <Box sx={nameStyle(0)}>{name}</Box>
        </Box>
    )
}


const drawDevice = (x,y,name,certainty) => {
    console.log(x,y)
    return(
        <Box sx={containerStyle(x,y)}>
            <MdDeviceHub size={"2rem"} style={deviceStyle()}/>
            <Box sx={nameStyle(certainty)}>{name}</Box>
        </Box>
    )
}

export function Main (){

    let scaleFactor = window.innerHeight/100;

    const [beacons,setBeacons] = useState([]);
    const [devices,setDevices] = useState([]);

    useEffect(()=>{
        setBeacons(getBeacons());
        setDevices(getDevices);
        const interval = setInterval(() => {
            setDevices(getDevices);
            console.log('This will run every 1 second!')
        }, 1000);
        return () => clearInterval(interval);
    },[])

    return (
        <Box className={"bg"}>
            {beacons.map(beacon=>(drawBeacon(beacon.x/scaleFactor,beacon.y/scaleFactor,beacon.name)))}
            {devices.map(device=> (
                device.positions.map(pos=> drawDevice(pos.x / scaleFactor, pos.y / scaleFactor, device.mac,device.positions.length))
            ))}
        </Box>
    );
}