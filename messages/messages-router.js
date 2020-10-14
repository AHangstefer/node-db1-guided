const express = require("express")
const db = require("../data/config")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        //translates to SELECT * FROM messages;
        const messages = await db.select("*").from("messages")
        res.json(messages)
    } catch (err) {
        next(err)
    }

})

router.get("/:id", async (req, res, next) => {
    try {
        //translates to 'SELECT' * FROM messages WHERE id = ? LIMIT 1
        const message = await db
            .select("*")
            .from("messages")
            .where("id", req.params.id)
            .limit(1)

        res.json(message)
    } catch (err){
        next(err)
    }

})

router.post("/", async (req, res, next) => {
    try{
        const payload = {
            title: req.body.title,
            contents: req.body.contents
        }
        if(!payload.title || !payload.contents) {
            return res.status(404).json({
                message: "Need a title and content"
            })
        }
        // INSERT INTO messages (title, contents) VALUES (?, ?):
        const [id] =  await db.insert(payload).into("messages")
        const message = await db
            .select("*") // shortcut is .first("*") for this
            .from("messages")
            .where("id", id)

        res.status(201).json(message)

    } 
    catch (err) {
        next(err)
    }

})

router.put("/:id", async (req, res, next) => {
    try{
        const payload = {
            title: req.body.title,
            contents: req.body.contents
        }
        if(!payload.title || !payload.contents) {
            return res.status(404).json({
                message: "Need a title and content"
            })
        }

        // translate to 'UPDATE' messages SET title = ? AND contents = ? WHERE id = ?

        await db("messages").where("id", req.params.id).update(payload)
        // return the updated resource 
        const message = await db
        .select("*") // shortcut is .first("*") for this
        .from("messages")
        .where("id", req.params.id)

        res.json(message)

    } 
    catch (err) {
        next(err)
    }

})

router.delete("/:id", async (req, res, next) => {
    try{
       // translate to DELETE FROM messages WHERE id = ?
       await db("messages").where("id", req.params.id).del()

       res.status(204).end()

    } 

    catch (err) {
        next(err)
    }

})

module.exports = router