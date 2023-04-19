import roleModel from '../models/roleModel.js'

const createRole = async (req, res) => {
  try {

    const result = await roleModel.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error in registering");
  }
};


export {createRole}