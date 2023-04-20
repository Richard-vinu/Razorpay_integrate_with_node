import { MongoClient } from "mongodb";

// Replace the URI string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://admin:admin1234@cluster3.bli4t.mongodb.net/Panshul?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const collection = client.db("Panshul").collection("subAdmin");

  collection.insertOne(
    { email: "admin@gmail.com", password: "admin@123" },
    (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Document inserted successfully");
      client.close();
    }
  );
});
