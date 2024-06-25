const express =  require('express');
const router = express.Router();
const Person  = require('./../models/Person');

router.post('/', async(req,res) => {
    try {
        
      const data = req.body // assuming the request body contains the person data
  
      //create a new Perosn document using the Mongoose model
      const newPerson = new Person(data);
      
      //save the perosn data 
      const response =  await newPerson.save();
      console.log('Data saved');
      res.status(200).json(response);
    }catch(err) {
       console.log(err);
       res.status(500).json({error : 'internal server error '});
    }
  })

  //get method to get the perosn
router.get('/', async(req,res) => {
    try
    {
      const data = await Person.find();
      console.log('Data Fatched');
      res.status(200).json(data);
    }catch(err){
  
      console.log(err);
      res.status(500).json({error : 'internal server error'});
    }
  })
  
router.get('/:workType', async (req,res) => {

    try{
    const workType = req.params.workType; //extract the work type from data
    if (workType == 'chef' || workType == 'manager' || workType == 'waiter'){
  
      const response = await Person.find({work: workType});
      console.log('response fetched');
      res.status(202).json(response);
  
    }else{
      res.status(404).json({error : 'invalid work type'})
    }
  
    }catch(err) {
  
      console.log(err);
      res.status(500).json({error : 'Internal server Error'});
    }
  })

  router.put('/:id', async(req,res) => {
    try {
        const personId = req.params.id;
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
            new: true, // return the updated document
            runValidators : true, //Run mongoose validation

        })

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log("data updated");
        res.status(200).json(response);

    }catch(err){

        console.log(err);
        res.status(500).json({error : 'Internal server error'});
    }
  })

  router.delete('/:id', async(req,res) => {
    try{

      const personId = req.params.id;

      const response = await Person.findByIdAndDelete(personId);

      if(!response){
        return res.status(404).json({error: 'Person not found'});
      }
      console.log('data deleted successfully');
      res.status(200).json({message : 'Person deleted successfully'});
    }catch(err){
      console.log(err);
      res.status(500).json({error : 'Internal server error '});
    }

  })

  module.exports = router;
