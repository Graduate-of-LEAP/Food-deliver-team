import { connect } from "mongoose";

export const connectToDataBase = async () => {
  await connect(
    "mongodb+srv://myagmartsognnaranbaatar:QSzeO382fq88Pv8J@cluster0.2mlwk.mongodb.net/food?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Connected mongodb database");
};
