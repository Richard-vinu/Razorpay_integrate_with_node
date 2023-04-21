import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://admin:admin1234@cluster3.bli4t.mongodb.net/Panshul?retryWrites=true&w=majority";
const collectionName = "subadmins";

const [email, password] = process.argv.slice(2);
// console.log(process.argv.slice(1,2));

// Validate that both email and password are provided
if (!email || !password) {
  console.error(
    "Please provide both email and password as command-line arguments."
  );
  process.exit(1);
}

// Replace the email and password values as desired.
const document = { email, password };

(async () => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const collection = client.db().collection(collectionName);
    const result = await collection.insertOne(document);
    console.log(`Inserted document with _id: ${result.insertedId}`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
})();
