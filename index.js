const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://phantomphreak96:A!^*(zd1@cluster0.kgiyyj1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/api", async (req, res) => {
  try {
    await client.connect();
    database = client.db("CryptoShadow");
    const CustomerDetails = database.collection("CustomerDetails");
    const query = await CustomerDetails.find({}).toArray();
    res.status(200).json(query);
  } catch {
    console.log("Error , database not connected");
  } finally {
    await client.close();
  }
});

app.post("/api/newUser", async (req, res) => {
  try {
    await client.connect();
    database = client.db("CryptoShadow");
    const { emailId, balance, coins } = req.body;

    const CustomerDetails = database.collection("CustomerDetails");
    let query = await CustomerDetails.findOne({ emailId: emailId });
    if (!query) {
      await CustomerDetails.insertOne({
        emailId: emailId,
        balance: balance,
        coins: coins,
      });
    }
    query = await CustomerDetails.findOne({ emailId: emailId });
    res.status(200).json(query);
  } catch (error) {
    console.log("Error ", error);
  } finally {
    await client.close();
  }
});

app.post("/api/updateData", async (req, res) => {
  try {
    await client.connect();
    database = client.db("CryptoShadow");
    const { emailId, balance, coins} = req.body;
    console.log(req.body);
    const CustomerDetails = database.collection("CustomerDetails");
    await CustomerDetails.updateOne(
      { emailId: emailId },
      { $set: { balance: balance, coins: coins } }
    );
    const query = await CustomerDetails.findOne({emailId : emailId});
    res
      .status(200)
      .json({ message: "Data updated successfully", query});
  } catch (e) {
    console.log("Failed to update data due to ", e);
    res.status(500).json({ message: "Data not updated due to an error" });
  } finally {
    client.close();
  }
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
