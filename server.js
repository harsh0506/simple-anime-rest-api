const express = require('express');
const dbcollection = require("./models/animedb")
const app = express();
app.use(express.json())
app.get("/",async (req, res) => {
    try{
        const userdata = await dbcollection.find()
        res.send(userdata);
    }
    catch(err){

    }
})
app.post('', async (req, res) => {
    try {
        const adata = new dbcollection(req.body);
        const asave = await adata.save();
        res.status(201).send(asave);
    } catch (err) {
        res.send(err)
    }
})
app.patch('/:id',async(req,res)=>{
    try{
        const _id = req.params.id;
        const userdata = await dbcollection.findByIdAndUpdate(_id)
        res.send (userdata)
    }catch(err){

    }

})
app.delete('/:id',async(req,res)=>{
    try{
        const _id = req.params.id;
        const userdata = await dbcollection.findByIdAndDelete(_id,req.body)
    }catch(err){

    }
})
app.listen(3000, () => {
    console.log("listening at port 3000")
})