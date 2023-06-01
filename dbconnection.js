import { MongoClient } from "mongodb";
const uri =
  "mongodb+srv://pratik458:Pokemon112233@cluster0.ypwmqzn.mongodb.net/?retryWrites=true&w=majority";
let mongoClient = new MongoClient(uri, { useNewUrlParser: true });

mongoClient.connect((error) => {
  if (!error) {
    console.log("success");
  } else {
    console.log(error);
    process.exit(1);
  }
});

export default mongoClient;
