import express from "express";
import cors from "cors";
import exp from "constants";
import { PrismaClient } from "@prisma/client";
import { parse } from "path";

const app = express();
// create new prisma client
const prisma = new PrismaClient();


app.use(express.json());
app.use(cors());


// define endpoint
app.get("/api/notes", async (req, res) => {
    const notes = await prisma.note.findMany();

  res.json(notes);
});

// create endpoint
app.post("/api/notes", async (req, res) => {
    const { title, content } = req.body;

    if(!title || !content){
      return res
      .status(400)
      .send("Please provide title and content");
    }

    try{
      const note = await prisma.note.create({
        data: {
            title,
            content
        }
    });

    res.json(note);
    }
    catch (error){
      res.status(500).send("Something went wrong");
    }
    
})

app.put("/api/notes/:id", async (req, res) => {
  const {title, content} = req.body;
  const id = parseInt(req.params.id);

  if(!title || !content){
    return res.status(400).send("Please provide title and content");
  }

  if(!id || isNaN(id)){
    return res.status(400).send("Note ID must be a valid number");
  }

  try{
    const updatedNote = await prisma.note.update({
      where: {id},
      data: {title, content}
    });
    res.json(updatedNote);
  }
  catch(error){
    res.status(500).send("Something went wrong");
  }
})

// add delete endpoint
app.delete("/api/notes/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if(!id || isNaN(id)){
    return res
      .status(400)
      .send("Note ID must be a valid number");
  }

  try{
    await prisma.note.delete({
      where: { id }
    });
    res.status(204).send();
  } catch(error){
      res.status(500).send("Something went wrong");
  }
});

// starts server on port 3000
app.listen(3000, () => {
  console.log("Server has started on port 3000");
});