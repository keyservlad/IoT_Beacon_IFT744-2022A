import axios from "axios";

const beacons = [{
    addr:"Raspberry Pi 1",
    x:800,
    y:600,
},{
    addr:"Raspberry Pi 2",
    x:1600,
    y:600,
}]

const devices = [{
    addr:"5d465as4d6",
    positions:[{
        x:200,
        y:400,
    },{
        x:300,
        y:440,
    }]
}, {
    addr: "5d465as4t8",
    positions:[{
        x: 300,
        y: 300,
    }]
},{
    addr:"5fds46s4t8",
    positions:[{
        x:800,
        y:700
    }]
}]


export const getBeacons = () => {
    return axios.get("http://localhost:8080/getBeacons").then(res=>res.data)
}

export const getDevices = () => {
    return axios.get("http://localhost:8080/getDevices").then(res=>res.data)
}