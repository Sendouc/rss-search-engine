import { MongoClient } from "mongodb";
import Parser from "rss-parser";
const parser = new Parser();

export default async function handler(req, res) {
  if (req.query.key !== process.env.ADMIN_KEY) {
    return res.status(401).end();
  }

  const uri = process.env.DATABASE_URL;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const articles = await getRSSData();

  client.connect(async () => {
    const collection = client.db("prod").collection("articles");
    await collection.insertOne({ date: new Date(), data: articles });

    console.log("Inserted articles");

    await client.close();
  });

  res.status(200).end();
}

async function getRSSData() {
  let feed = await parser.parseURL(process.env.RSS_URL);

  return feed.items.map((item) => ({ title: item.title, link: item.link }));
}
