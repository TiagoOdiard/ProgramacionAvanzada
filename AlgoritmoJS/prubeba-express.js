import express, { json } from "express";

const app = express();
const client = [{}];

app.use(json());

app.post("/addClient", (req, res) => {
  const { name, apellido } = req.body;

  const newClient = {
    name,
    apellido,
  };

  client.push(newClient);
  res.status(201).json(newClient);
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
