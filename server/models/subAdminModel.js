import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const Schema = mongoose.Schema;

const subAdminSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roleId: {
    type: ObjectId,
    ref: "Role",
    required: "roleId is required",
    trim: true,
  },
});

export default mongoose.model("subAdmin", subAdminSchema);
