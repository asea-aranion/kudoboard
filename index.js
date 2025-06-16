import express from "express";
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

import { PrismaClient } from "./src/generated/prisma/client.js";
const prisma = new PrismaClient();

import cors from "cors";

import bodyParser from "body-parser";

app.use(cors());

const urlParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

// get array of all boards
app.get("/boards", async (req, res) => {
    const boards = await prisma.board.findMany();
    res.json(boards);
});

// add new board and respond with newly updated boards
app.post("/boards", jsonParser, async (req, res) => {
    const { created, title, author, category, imgSrc, imgAlt } = req.body;

    await prisma.board.create({
        data: {
            created,
            title,
            author,
            category,
            imgSrc,
            imgAlt,
        },
    });

    const boards = await prisma.board.findMany();
    res.json(boards);
});

// delete board with specified id
app.delete("/boards/:id", async (req, res) => {
    // await prisma.card.deleteMany({
    //     where: {
    //          boardId: id
    //     }
    // })

    const boardId = Number(req.params.id);

    await prisma.board.delete({
        where: {
            id: boardId,
        },
    });

    const boards = await prisma.board.findMany();
    res.json(boards);
});
