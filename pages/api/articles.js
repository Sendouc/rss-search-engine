import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  let input = req.query.input;

  // Validate input
  if (typeof input !== "string") {
    return res.status(400).end();
  }

  // Normalize input
  input = input.toLowerCase();

  const uri = process.env.DATABASE_URL;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect(async () => {
    const collection = client.db("prod").collection("articles");
    const articles = (await collection.find().toArray())[0].data;

    await client.close();

    const filteredArticles = articles.filter((article) => {
      const parts = article.title.toLowerCase().split(" ");

      return parts.includes(input);
    });

    // If user's result returns no articles let's serve them random articles instead
    if (filteredArticles.length === 0) {
      return res
        .status(200)
        .json({ articles: shuffle(articles).slice(0, 5), found: false });
    }

    res
      .status(200)
      .json({ articles: filteredArticles.slice(0, 5), found: true });
  });
}

// https://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
