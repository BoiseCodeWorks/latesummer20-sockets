import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import CarSchema from '../models/Car'
class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Cars = mongoose.model("Car", CarSchema)
}

export const dbContext = new DbContext();
