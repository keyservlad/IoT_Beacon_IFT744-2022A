const express = require("express");
const app = express();
const PORT = 8080;

// The following distances between PIs are to be replaced by the actual distance after placing
d1_1 = d2_2 =d3_3 =d4_4 =d5_5 = 0 //distance from Pi to itself
d1_2 = d2_1 = 10 //distance between PIs 1 and 2
d1_3 = d3_1 = 12 //distance between PIs 1 and 3
d1_4 = d4_1 = 15 //distance between PIs 1 and 4
d1_5 = d5_1 = 17 //distance between PIs 1 and 5
d2_3 = d3_2 = 10 //distance between PIs 2 and 3
d2_4 = d4_2 = 12 //distance between PIs 2 and 4
d2_5 = d5_2 = 15 //distance between PIs 2 and 5
d3_4 = d4_3 = 10 //distance between PIs 3 and 4
d3_5 = d5_3 = 12 //distance between PIs 3 and 5
d4_5 = d5_4 = 10 //distance between PIs 4 and 5

app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send("Beacon node server.");
})



app.post('/handleDiscovery/',(req,res)=>{
	const body = req.body;
	console.log(body);
	res.sendStatus(200);
})

//function to find possible locations of a beacon, takes as input the distance of a specific beacon from all the 5 PIs
possiblePoints = function(dPi1,dPi2,dPi3,dPi4,dPi5){

	const distanceArray = [dPi1,dPi2,dPi3,dPi4,dPi5]; // Array used to store the distance of the specific beacon from all the 5 PIs in order to sort them
	distanceArray.sort(function(a,b){return a-b});

	shortest_d_Pi1 =  distanceArray[0]; //Shortest distance to a PI
	shortest_d_Pi2 =  distanceArray[1]; //2nd Shortest distance to a PI

	distanceBetweenPIs = "d"+  shortest_d_Pi1.charAt(shortest_d_Pi1.length-1)+"_"+shortest_d_Pi2.charA(shortest_d_Pi2.length-1); //string concatenation to create
	// the name of the variable representing the distance between the two PIs

	//Calculation of the possible coordinates of the possible locations
	possiblePosition_x = (Math.pow(shortest_d_Pi1,2) - Math.pow(shortest_d_Pi2,2)+ Math.pow( this.valueOf(distanceBetweenPIs.toString()),2))/(2*distanceBetweenPIs) ;
	possiblePosition_y_pos =Math.sqrt(Math.pow(shortest_d_Pi1,2)-Math.pow(possiblePosition_x,2));
	possiblePosition_y_neg =possiblePosition_y_pos*(-1);

	//string to represent the JSON that includes the information of the possible locations
	possibleLocations = "{possibleLocation1: (" + possiblePosition_x + "," + possiblePosition_y_pos + "),possibleLocation2: (" + possiblePosition_x + "," + possiblePosition_y_pos + ")}";


	return possibleLocations;

};


app.listen(PORT,()=>console.log(`Listening on http://localhost:${PORT}`))

