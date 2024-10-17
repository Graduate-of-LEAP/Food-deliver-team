import { connect } from "mongoose";

export const connectToDataBase = async () => {
  await connect(
    "mongodb+srv://tadashia:6xTsXv8V2VB6808i@fooddeliver.jtmgk.mongodb.net/"
  );
  console.log("Connected mongodb database");
};
