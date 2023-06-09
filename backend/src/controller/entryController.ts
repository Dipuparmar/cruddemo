import Entry from "../models/entry.model";

import express, { Request, Response } from "express";
const app = express();

// app.get("/", () => {
//   console.log("hello from server");
// });
app.use(express.json());

export const getAllEntry = async (req: Request, res: Response) => {
  const page: number = (req.query.page as number | any) * 1 || 1;
  const limit: number = (req.query.limit as number | any) * 1 || 10;
  const skip: number = (page - 1) * limit;

  let query = Entry.find({isDeleted:false});

  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    const numEntry: number = await Entry.countDocuments();
    console.log("---------------------->",numEntry)
    if (skip >= numEntry) {
      return res.status(400).json({
        status: "fail",
        data: {
          data: "page not found",
        },
      });
    }
  }

  const data = await query;

  res.status(200).json({
    status: "success",
    results: await Entry.countDocuments({isDeleted:false}),
    data: {
      data,
    },
  });
};

export const postAllEntry = async (req: Request, res: Response) => {
  try {
    const data = await Entry.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (err: any) {
    res.status(400).json({
      status: "fail",
      err: err.message,
    });
  }
};

export const patchAllEntry = async (req: Request, res: Response) => {
  try {
    const data = await Entry.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  } catch (err: any) {
    res.status(400).json({
      status: "fail",
      err: err.message,
    });
  }
};

export const deleteAllEntry = async (req: Request, res: Response) => {
  try {
    await Entry.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    res.status(204).json({
      status: "success",
      data: {
        data: null,
      },
    });
  } catch (err: any) {
    res.status(400).json({
      data: {
        status: "fail",
        data: err.message,
      },
    });
  }
};
