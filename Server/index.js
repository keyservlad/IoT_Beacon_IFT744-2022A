const express = require("express");
const app = express();
const PORT = 8080;
app.use(express.json())


const beacons = [{
	name:"Raspberry Pi 1",
	x:530,
	y:362,
},{
	name:"Raspberry Pi 2",
	x:480,
	y:650,
}]

const devices = {}

const mapDistance = (rssi,measuredPower,n) => {
	return 10**((measuredPower-rssi)/(10*n));
}

function getTrilateration2(position1, position2) {
}

function getTrilateration3(position1, position2, position3) {
	let xa = position1.x
	let ya = position1.y

	let xb = position2.x
	let yb = position2.y

	let xc = position3.x
	let yc = position3.y

	let ra = position1.d;
	let rb = position2.d;
	let rc = position3.d;

	let S = (xc**2. - xb**2. + yc**2. - yb**2. + rb**2. - rc**2.)/ 2.0
	let T = (xa**2. - xb**2. + ya**2. - yb**2. + rb**2. - ra**2.)/ 2.0
	let y = ((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa)))
	let x = ((y * (ya - yb)) - T) / (xb - xa)

	return {x:x, y:y}
}

function pointIsInPoly(p, polygon) {
	let isInside = false;
	let minX = polygon[0].x, maxX = polygon[0].x;
	let minY = polygon[0].y, maxY = polygon[0].y;
	for (let n = 1; n < polygon.length; n++) {
		let q = polygon[n];
		minX = Math.min(q.x, minX);
		maxX = Math.max(q.x, maxX);
		minY = Math.min(q.y, minY);
		maxY = Math.max(q.y, maxY);
	}

	if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
		return false;
	}

	let i = 0, j = polygon.length - 1;
	for (i, j; i < polygon.length; j = i++) {
		if ( (polygon[i].y > p.y) !== (polygon[j].y > p.y) &&
			p.x < (polygon[j].x - polygon[i].x) * (p.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x ) {
			isInside = !isInside;
		}
	}

	return isInside;
}


app.get('/',(req,res)=>{
    res.status(200).send("Beacon node server.");
})

app.get('/getBeacons',(req,res)=>{
	res.status(200).send(beacons);
})
app.get('/getDevices',(req,res)=>{
	res.status(200).send(devices);
})


app.post('/handleDiscovery/',(req,res)=>{
	const body = req.body;

	const device = {
		mac:"6a5s4d6a5s",
		data:{},
	}
	const beacon = {
		mac:"pi1",
		rssi:"-80",
		pwr:"50",
		moment:Date.now()
	}

	const deviceIdx = devices.findIndex(d=>d.mac=device.mac);
	if(deviceIdx===-1){
		let insert=device;
		insert.beacons=[beacon];
		devices.push(insert)
	} else {
		const beaconIdx = devices[deviceIdx].beacons.findIndex(b=>b.mac===beacon.mac);
		if(beaconIdx===-1){
			devices[deviceIdx].beacons.push(beacon)
		} else {
			devices[deviceIdx].beacons[beaconIdx] = beacon;
		}
	}

	console.log(body);
	res.sendStatus(200);
})


//Add interval to keep calculating devices' positions

app.listen(PORT,()=>console.log(`Listening on http://localhost:${PORT}`))

