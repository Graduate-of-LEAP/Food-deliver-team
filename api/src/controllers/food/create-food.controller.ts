import { RequestHandler } from "express";
import { foodModel } from "../../models/food.schema";

export const createFood: RequestHandler = async (req, res) => {
  console.log(req.body);

  try {
    // console.log("WHERE IS CREATE PRODUCTs REQ.BODY", req.body);
    const {
      category,
      foodName,
      price,
      orts,
      images,
      quantity,
      saledCount,
      salePercent,
      averageRating,
      reviewCount,
    } = req.body;

    const product = await foodModel.create({
      category: category,
      foodName: foodName,
      price: price,
      orts: orts,
      images: images,
      quantity: quantity,
      saledCount: saledCount,
      salePercent: salePercent,
      averageRating: averageRating,
      reviewCount: reviewCount,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.send(product);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ ErrorMessage: " Error happenned to create PRODUCT" });
  }
};
