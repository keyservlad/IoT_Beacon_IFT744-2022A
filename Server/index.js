const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send("Beacon node server.");
})


app.post('/handleDiscovery/',(req,res)=>{
	const body = req.body;
	console.log(body);
	res.sendStatus(200);
})

app.listen(PORT,()=>console.log(`Listening on http://localhost:${PORT}`))

