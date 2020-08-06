import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import Car from "../models/Car";

class CarsService {
  async delete(id) {
    let car = await dbContext.Cars.findByIdAndDelete(id)
    if (!car) {
      throw new BadRequest("invalid Id")
    }
    return car
  }
  async findAll(query = {}) {
    let cars = await dbContext.Cars.find(query).populate(
      "creator",
      "name picture"
    );
    return cars;
  }
  async findById(id) {
    let value = await dbContext.Cars.findById(id);
    if (!value) {
      throw new BadRequest("Invalid Id");
    }
    return value;
  }
  async create(body) {
    let car = await dbContext.Cars.create(body);
    return car;
  }
  async bid(id, bid) {
    let car = await this.findById(id);
    // @ts-ignore
    if (car.price > bid) {
      throw new BadRequest("Bid must be higher");
    }
    // @ts-ignore
    car.price = bid;
    await car.save();
    return car;
  }
}

export const carsService = new CarsService();
