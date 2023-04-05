const express = require('express');
const next = require('next');
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the server!' });
  });

  MongoClient.connect(process.env.MONGODB_URI, (err, client) => {
    if (err) throw err;

    const db = client.db('mydb');

    server.get('/api/items', async (req, res) => {
      const items = await db.collection('items').find().toArray();
      res.json({ items });
    });

    server.post('/api/items', express.json(), async (req, res) => {
      const item = req.body;
      await db.collection('items').insertOne(item);
      res.status(201).json({ message: 'Item created!' });
    });

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
});
