const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

const studentArray = require("./InitialData")

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here
app.get("/api/student", (req, res) =>{
    // get all the data from studentarray
    // send json response

    res.status(200).json({
        
        studentArray
    })
   

    res.end();
})

app.get("/api/student/:id", (req, res) =>{
    //get all the data from studentarray
    // send json response
    // res.json()
    const index = studentArray.findIndex(element => element.id == req.params.id)
    if(index >= 0){
        const student = studentArray[index];
        res.json({
            status: "sucess",
            student
        })
    }else {
        res.status(400).json({
            status: "fail",
            massage: "Student record not found"
        })

    }

    // console.log(req.params);
    // res.send("OK")
    res.end();
})

app.put("/api/student/:id", (req, res) =>{
    const index = studentArray.findIndex(element => element.id == req.params.id)
    let status = 1;
    console.log(req.body);
    if(index >= 0){
        for(let key in req.body){
            if(req.body.hasOwnProperty(key)){
                value = req.body[key];

            if(key!='id' && key!=='name', key!='currentClass' && key!='division')
                status = 0;
            }
        }
    }
    if(status == 0){
        res.status(400).json(
            {
                massage:"Invalid update"
            }
        )
    }
    else {
        res.status(400).json({
            status: "fail",
            massage: "Student record not found"
        })

    }
    // console.log(req.params);
    // res.send("OK")
    res.end();
})

app.post("/api/student/:id", (req, res) =>{
    
    // var id = studentArray.length;

    const index = studentArray.findIndex(element => element.id == req.params.id)
    if(index >= 0){
        studentArray[index] = req.body;
        res.json({
            massage: "Record uploaded sucessfully"
        })
    }else {
        res.status(400).json({
            status: "fail",
            massage: "Student record not uploaded"
        })
    }
    res.end();
})

app.delete("/api/student/:id", (req, res) =>{

    const index = studentArray.findIndex(element => element.id == req.params.id)
    if(index >= 0){
        studentArray.splice(index, index+1)
        res.status(200).json({
            massage: "Record "+ index+1 +" Deleted sucessfully"
        })
    }else {
        res.status(400).json({
            status: "fail",
            massage: "Student record not found"
        })

    }
    res.end();
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;