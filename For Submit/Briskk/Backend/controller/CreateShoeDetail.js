const shoeDetail = require("../Models/ShoesCollection");

const CreateShoeDetail = async(req,res) => {
        try{
            const {name,brand,description,price,image} = req.body;
            // Validation
            if (!name || !brand || !description || !price || !image) {
                return res.status(400).json({
                    message: "Please enter all details",
                    success: false });
                }

            const response = await shoeDetail.create({name,brand,description,price,image});

            res.status(200).json({
                success:true,
                data:response,
                message:'Shoe Detail Created Successfully'
            });

        }catch(err){
            console.log(err);
            res.status(500).json({
                success:false,
                data:"internal server error",
                message:err.message,
            })
        }
}

module.exports = {CreateShoeDetail};