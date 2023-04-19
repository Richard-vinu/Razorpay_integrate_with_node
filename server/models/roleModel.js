import  mongoose from 'mongoose'
const Schema = mongoose.Schema;
// rolename:"hr",
// permissiom:[1,1,1,1]

const roleSchema = new Schema({
  role_name: {
    type: String,
    required: true,
  },
  permission: {
    type: [Number],
    required: true,
  },
});



export default mongoose.model("Role", roleSchema);