# RSS Search Engine

App for a school course that periodically fetches a RSS feed and saves it to a MongoDB database. User can then use a "Google like" interface for searching articles.

## Where to look

Relevant code is in following locations:

- /pages/api/articles.js
- /pages/api/refresh.js
- /pages/index.js

## Running locally

- Need to have Node installed.

1) `npm i`
2) Set .env e.g.
```
RSS_URL=https://feeds.yle.fi/uutiset/v1/majorHeadlines/YLE_UUTISET.rss
DATABASE_URL=*database_url_here*
ADMIN_KEY=any_key
```
- You can get a database URL by registering on https://cloud.mongodb.com/
3) `npm run dev`
4) Call /referesh endpoint
5) You can now use the frontend.
