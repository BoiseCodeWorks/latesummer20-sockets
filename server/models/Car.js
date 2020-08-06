import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Car = new Schema(
  {
    price: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    imgUrl: { type: String, required: true },
    tags: [{ type: String }],
    creatorEmail: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Car.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true
});

export default Car;
