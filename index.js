import express from "express";
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});

import { PrismaClient } from "./src/generated/prisma/client.js";
const prisma = new PrismaClient();

app.get("/boards", async (req, res) => {
    const boards = await prisma.board.findMany();
    res.json(boards);
})