const {exampleModel} = require("../models/Flight");

exports.example = (req, res) => {
    console.log("example")
    res.send("Flight example")
}

exports.getAllFlights=async (req,res,next)=>{
    try {
        const flights= [...exampleModel]

        res.status(200).json({
            status:"success",
            data:flights,
            message:"Flights retreived successfully"
        })
    } catch (error) {
        throw new Error(error)
    }
}
exports.addFlight=(req,res,next)=>{
try {
    console.log(req.body)
    const {title,price} = req.body
    //Check if all the required data are not empty
    if(!title  || !price) return next(new Error("All fields are required "))
    //Check if the type of data for each field is valid
    if(typeof title != "string" ||typeof price != "number" || price<=0)
        return next(new Error("Please enter valid data , Title must be a string and price must be a postive number"))

    let newFlight={title,price};

    //Check for duplicates
    let duplicate=false;
    exampleModel.forEach(el=>{
        if(Object.keys(el).filter(el=>!(["time","date"].includes(el))).every((key)=>newFlight[key]===el[key])) {
            duplicate=true
            return
        }
    })

    if(duplicate) return next(new Error("Flight already exist"));

    newFlight={ time:new Date().toLocaleTimeString(),
        date:new Date().toLocaleDateString(),...newFlight}
     
    //Store new flight to db
    exampleModel.push(newFlight);
    res.status(201).json({
        status:"success",
        data:newFlight,
        message:"New flight successfully added"
    })
} catch (error) {
    next(new Error(error))
}
}

exports.getFlight=(req,res,next)=>{
try {
    const index= req.params.id;
    const flight= exampleModel[index-1];
    if(!flight) return next(new Error("Flight cannot be found"))
    res.status(200).json({
        status:"success",
        data:flight,
        message:"flight retrieved successfully"
    })
} catch (error) {
    next(new Error(error))
}
}

exports.updateFlight=(req,res,next)=>{
try {
    const index= req.params.id;
    const {title,price}=req.body;
    //Check if the flight with the id exist;
    if(!exampleModel[index-1]) return next(new Error("the flight you want to update cannot be found"));

    //Check if all the required data are not empty
    if(!title  || !price) return next(new Error("All fields are required "))

    //Check if the type of data for each field is valid
    if(typeof title != "string" ||typeof price != "number" || price<=0)
        return next(new Error("Please enter valid data , Title must be a string and price must be a postive number"))

    exampleModel[index-1]={title,price,date:exampleModel[index-1].date,time:exampleModel[index-1].time};
    res.status(200).json({
        status:"success",
        data:exampleModel[index-1],
        message:"flight successfully updated"
    })
} catch (error) {
    next(new Error(error))
}
}

exports.deleteFlight=(req,res,next)=>{
try {
    const index= req.params.id;
    if(!exampleModel[index-1]) return next(new Error("Flight cannot be found"));
    exampleModel.splice(index-1,1);
    res.status(204).json({
        status:"success",
        message:"Flight successfully deleted"
    })
} catch (error) {
    next(new Error(error))
}
}
