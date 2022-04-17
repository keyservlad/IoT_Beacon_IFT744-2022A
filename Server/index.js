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

const devices = []            

const mapDistance = (rssi,measuredPower,n) => {
	return 10**((measuredPower-rssi)/(10*n));
}

function getTrilateration2(beacon1, beacon2) {
	const xa = beacon1.x
	const ya = beacon1.y

	const xb = beacon2.x
	const yb = beacon2.y

	const r1 = beacon1.d;
	const r2 = beacon2.d;


	const u = Math.sqrt((xb-xa)**2+(yb-ya)**2);

	const xt = r1**2-r2**2+u**2;
	const yt1 = Math.sqrt(r1**2-x1**2);
	const yt2 = - yt1;


	const x1 = xt(xb-xa)/u-yt1(yb-ya)/u+xa;
	const y1 = xt(yb-ya)/u-yt1(xb-xa)/u+xa;

	const x2 = xt(xb-xa)/u-yt2(yb-ya)/u+xa;
	const y2 = xt(yb-ya)/u-yt2(xb-xa)/u+ya;
	

	return [{x:x1,y:y1},{x:x2,y:y2}];
}

function getTrilateration3(beacon1, beacon2, beacon3) {
	let xa = beacon1.x
	let ya = beacon1.y

	let xb = beacon2.x
	let yb = beacon2.y

	let xc = beacon3.x
	let yc = beacon3.y

	let ra = beacon1.d;
	let rb = beacon2.d;
	let rc = beacon3.d;

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

setInterval(()=>{

}, 250);

//Add interval to keep calculating devices' positions



app.listen(PORT,()=>console.log(`Listening on http://localhost:${PORT}`))
