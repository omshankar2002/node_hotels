const express =  require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');


router.post('/', async(req,res) => {
    try{
      const data = req.body
      const newDish = new MenuItem (data);
      const response = await newDish.save();
      console.log('data saved');
      res.status(200).json(response);
    }catch(err){
      console.log(err);
      res.status(500).json({error : 'internal server error '})
    }
  
  })
  
  //get method to get the perosn
  router.get('/', async(req,res) => {
    try
    {
      const data = await MenuItem.find();
      console.log('Data Fatched');
      res.status(200).json(data);
    }catch(err){
  
      console.log(err);
      res.status(500).json({error : 'internal server error'});
    }
  })

  router.get('/:tasteType', async(req,res) => {
    try{
        const tasteType = req.params.tasteType;
        if(tasteType == 'spicy' || tasteType == 'sweet' || tasteType == 'sour'){
            const response =  await MenuItem.find({taste : tasteType});
            console.log('response fetched');
            res.status(202).json(response);
        }else
        {
            res.status(404).json({error: 'invalid taste'})
        }
    }catch(err) {

        console.log(err);
        res.status(500).json({error : 'Internal server error'});
    }
  })

  router.put('/:id', async(req,res) => {
    try{

      const menuId = req.params.id;
      const updateMenuItems = req.body;

      const response = await MenuItem.findByIdAndUpdate(menuId, updateMenuItems,{
        new:true,
        runValidators : true,
      })

      if(!response) {
        return res.status(404).json({error: 'menuitem are not found'})
      }
      console.log('data updated');
      res.status(200).json(response);

    }catch(err){
      console.log(err);
      res.status(500).json({error : 'internal server error'})

    }
  })

  router.delete('/:id', async(req,res) => {
    try{
      const menuId = req.params.id;
      const response = await MenuItem.findByIdAndDelete(menuId);

      if(!response){
        res.status(404).json({error : 'menuItem not found'});
      }
      console.log('data deleted successfully');
      res.status(200).json({message : 'menuItem deleted successfully'});


    }catch(err){
      console.log(err);
      res.status(500).json({error : 'Internal server error'})

    }
  })
  module.exports = router;