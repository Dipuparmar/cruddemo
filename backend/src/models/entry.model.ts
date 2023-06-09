import mongoose, { Document, Model, Schema } from "mongoose";

interface IEntry extends Document {
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: number;
  post: string;
  profile?: string;
  pincode: string;
  state: string;
  city: string;
  country: string;
  isDeleted: Boolean;
}

const entrySchema: Schema<IEntry> = new mongoose.Schema<IEntry>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
  pincode: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Entry: Model<IEntry> = mongoose.model<IEntry>("data", entrySchema);

export default Entry;
