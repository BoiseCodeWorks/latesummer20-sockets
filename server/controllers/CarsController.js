import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { carsService } from "../services/CarService";
import socketService from "../services/SocketService"
import { BadRequest } from "../utils/Errors";

export class CarsController extends BaseController {
  constructor() {
    super("api/cars");
    this.router = express
      .Router()
      .get("", this.getAll)
      .use(auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id/bid", this.bid)
      .delete("/:id", this.delete);
  }
  async delete(req, res, next) {
    try {
      let car = await carsService.delete(req.params.id)
      socketService.messageRoom("cars", "deleteCar", car)
      res.send(car)
    } catch (error) {
      next(error)
    }
  }
  async getAll(req, res, next) {
    try {
      let cars = await carsService.findAll(req.params.query);
      res.send(cars);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let car = await carsService.create(req.body);
      socketService.messageRoom("cars", "newCar", car)
      res.send(car);
    } catch (error) {
      next(error);
    }
  }
  async bid(req, res, next) {
    try {
      if (!req.body.bid) {
        throw new BadRequest("Please provide the 'bid', amount ");
      }
      let update = await carsService.bid(req.params.id, req.body.bid);
      socketService.messageRoom("cars", "newBid", update)
      res.send(update);
    } catch (error) {
      next(error);
    }
  }
}
