const beacons = [{
    name:"Raspberry Pi 1",
    x:530,
    y:362,
},{
    name:"Raspberry Pi 2",
    x:480,
    y:650,
}]

const devices = [{
    mac:"5d465as4d6",
    positions:[{
        x:200,
        y:400,
    },{
        x:300,
        y:440,
    }]
}, {
    mac: "5d465as4t8",
    positions:[{
        x: 300,
        y: 300,
    }]
},{
    mac:"5fds46s4t8",
    positions:[{
        x:800,
        y:700
    }]
}]


export const getBeacons = () => {
    return beacons;
}

export const getDevices = () => {
    return devices;
}