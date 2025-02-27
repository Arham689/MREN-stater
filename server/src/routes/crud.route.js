import express, { Router } from 'express'
import Table from '../models/table.model.js';
const route = express.Router();

route.get('/crud', async (req, res) => {

    try {

        const data = await Table.find()
            .populate("className")
            .populate("medium")
            .populate("subjects")
            .exec();

        res.status(200).json({
            data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ meassage: "internal error at createing " })
    }
})

route.post('/crud', async (req, res) => {
    // try {
    //     const {className , medium } = req.body    
    //     await Table.create({className , medium })

    //     res.send("succfully created").status(201)

    // } catch (error) {
    //     console.log(error)
    //     res.status(500).json({meassage : "internal error at createing "})
    // }

    try {
        const { className, medium, subjects, bookName } = req.body;

        const tableEntry = new Table({
            className,
            medium,
            subjects,
            bookName
        });

        await tableEntry.save();
        res.status(201).json({ message: "Entry created successfully", data: tableEntry });
    } catch (error) {
        res.status(500).json({ message: "Error creating entry", error });
    }


})

route.put('/crud/:id', async (req, res) => {
    try {
        const { className, medium, subjects, bookName } = req.body;
        const updatedTable = await Table.findByIdAndUpdate(
            req.params.id,
            { className, medium, subjects, bookName },
            { new: true }
        );
        if (!updatedTable) {
            return res.status(404).json({ message: "Table entry not found" });
        }
        res.json(updatedTable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

route.delete('/crud/:id', async (req, res) => {
    try {
        const deletedTable = await Table.findByIdAndDelete(req.params.id);
        if (!deletedTable) {
            return res.status(404).json({ message: "Table entry not found" });
        }
        res.json({ message: "Entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default route;