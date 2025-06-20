const express = require("express");
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running!`);
});

// set up prisma
const { PrismaClient } = require("./src/generated/prisma/client.js");
const prisma = new PrismaClient();

// allow all cross-origin requests
const cors = require("cors");
app.use(cors());

// allow server to parse json bodies
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

// get array of all boards
app.get("/boards", async (req, res) => {
    const boards = await prisma.board.findMany();
    res.json(boards);
});

// add new board and respond with newly updated boards
app.post("/boards", jsonParser, async (req, res) => {
    const { created, title, author, category, imgSrc, imgAlt } = req.body;

    if (!created || !title || !category || !imgSrc) {
        res.status(400).send("All fields except author required");
        return;
    }

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
    res.status(201).json(boards);
});

// delete board with specified id
app.delete("/boards/:id", async (req, res) => {
    const boardId = Number(req.params.id);

    const cards = await prisma.card.findMany({
        where: {
            boardId: boardId,
        },
    });

    cards.forEach(async (card) => {
        await prisma.comment.deleteMany({
            where: {
                cardId: card.id,
            },
        });
    });

    await prisma.card.deleteMany({
        where: {
            boardId: boardId,
        },
    });

    await prisma.board.delete({
        where: {
            id: boardId,
        },
    });

    const boards = await prisma.board.findMany();
    res.json(boards);
});

// get details of board with specified id
app.get("/boards/:id", async (req, res) => {
    const boardId = Number(req.params.id);

    try {
        const board = await prisma.board.findFirstOrThrow({
            where: {
                id: boardId,
            },
        });

        res.json(board);
    } catch (error) {
        res.status(404).send("Board not found");
    }
});

// get all cards associated with specified board
app.get("/board/cards/:boardId", async (req, res) => {
    const boardId = Number(req.params.boardId);

    const cards = await prisma.card.findMany({
        where: {
            boardId: boardId,
        },
    });
    res.json(cards);
});

// add card to specified board
app.post("/board/cards/:boardId", jsonParser, async (req, res) => {
    const boardId = Number(req.params.boardId);

    const { message, author, imgSrc, imgAlt, upvotes } = req.body;

    if (!message || !imgSrc) {
        res.status(400).send("All fields except author required");
        return;
    }

    await prisma.card.create({
        data: {
            boardId: boardId,
            message: message,
            author: author,
            imgSrc: imgSrc,
            imgAlt: imgAlt,
            upvotes: upvotes,
        },
    });

    const cards = await prisma.card.findMany({
        where: {
            boardId: boardId,
        },
    });
    res.status(201).json(cards);
});

// upvote a card
app.post("/card/upvote/:cardId", async (req, res) => {
    const cardId = Number(req.params.cardId);

    try {
        const { upvotes } = await prisma.card.findFirstOrThrow({
            where: {
                id: cardId,
            },
        });

        await prisma.card.update({
            where: {
                id: cardId,
            },
            data: {
                upvotes: upvotes + 1,
            },
        });

        res.send();
    } catch (error) {
        res.status(404).send("Card not found");
    }
});

// delete a card
app.delete("/card/:id", async (req, res) => {
    const cardId = Number(req.params.id);

    await prisma.comment.deleteMany({
        where: {
            cardId: cardId,
        },
    });

    await prisma.card.delete({
        where: {
            id: cardId,
        },
    });

    res.status(204).send();
});

// toggle a card's pin state
app.post("/card/pin/:id", async (req, res) => {
    const cardId = Number(req.params.id);

    const { pinDate } = await prisma.card.findUnique({
        where: {
            id: cardId,
        },
    });

    if (pinDate) {
        await prisma.card.update({
            where: {
                id: cardId,
            },
            data: {
                pinDate: null,
            },
        });
    } else {
        await prisma.card.update({
            where: {
                id: cardId,
            },
            data: {
                pinDate: new Date(),
            },
        });
    }

    res.status(200).send();
});

// get all comments associated with specified card
app.get("/comments/card/:cardId", async (req, res) => {
    const cardId = Number(req.params.cardId);

    const comments = await prisma.comment.findMany({
        where: {
            cardId: cardId,
        },
    });

    res.json(comments);
});

// add a comment to the specified card
app.post("/comments/card/:cardId", jsonParser, async (req, res) => {
    const cardId = Number(req.params.cardId);

    const { text, author } = req.body;

    if (!text) {
        res.status(400).send("Text required");
        return;
    }

    await prisma.comment.create({
        data: {
            cardId: cardId,
            text: text,
            author: author,
        },
    });

    const comments = await prisma.comment.findMany({
        where: {
            cardId: cardId,
        },
    });

    res.status(201).json(comments);
});
