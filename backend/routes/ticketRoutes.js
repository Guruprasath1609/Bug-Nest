const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const Tickets = require("../models/Tickets");

// @route POST/api/users/ticket/create-ticket
// @desc Create a new ticket
// @ PRIVATE

router.post("/create-ticket", protect, async (req, res) => {
  const { title, description, bugsFoundAt, status, id } = req.body;
  try {
    const ticket = new Tickets({
      title,
      description,
      bugsFoundAt,
      status,
      user: id,
    });
    const savedTicket = await ticket.save();
    return res.status(201).json(savedTicket);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// @route GET/api/users/ticket/fetch-tickets
// @desc Get all the tickets created by the user
// @PRIVATE

router.get("/fetch-tickets", protect, async (req, res) => {
  const userId = req.user.id;
  try {
    const tickets = await Tickets.find({ user: userId });
    return res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Data not fetched" });
  }
});

module.exports = router;

// @route GET/api/users/ticket/fetchAssignedTickets
// @desc Get all assigned tickets of a particular user from the database
// @access PRIVATE

router.get("/fetchAssignedTickets", protect, async (req, res) => {
  const email = req.user.email;

  try {
    if (email == "roman@123.com") {
      const tickets = await Tickets.find({ assignTo: "User-1" });
      
      return res.status(200).json(tickets);
    }
    if (email == "Randy@123.com") {
      const tickets = await Tickets.find({ assignTo: "User-2" });
     
      return res.status(200).json(tickets);
    }
    if (email == "John@123.com") {
      const tickets = await Tickets.find({ assignTo: "User-3" });
      
      return res.status(200).json(tickets);
    }
    if (email == "Peter@123.com") {
      const tickets = await Tickets.find({ assignTo: "User-4" });
      
      return res.status(200).json(tickets);
    }
    if (email == "Michael@123.com") {
      const tickets = await Tickets.find({ assignTo: "User-5" });
      
      return res.status(200).json(tickets);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Error" });
  }
});

// @route GET/api/admin/get-tickets
// @desc Get all tickets in the database
// @access PRIVATE

router.get("/get-tickets", protect, admin, async (req, res) => {
  const userId = req.user.id;
  try {
    const tickets = await Tickets.find({});
    return res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Error" });
  }
});

// @route PUT/api/admin/update-ticket
// @desc Update ticket
// @access PRIVATE

router.put("/update-ticket", protect, admin, async (req, res) => {
  const { priority, status, assignTo, ticketId } = req.body;
  try {
    const updateTicket = await Tickets.findById({ _id: ticketId });
    if (updateTicket) {
      if (priority !== undefined) {
        updateTicket.priority = priority;
      }
      if (status !== undefined) {
        updateTicket.status = status;
      }
      if (assignTo !== undefined) updateTicket.assignTo = assignTo;
      await updateTicket.save();
      return res.status(200).json({ message: "Success" });
    } else {
      console.log("No ticket found");
    }
  } catch (error) {
    console.error(error);
  }
});

// @route GET/api/admin
// @desc Get tickets on optional query parameters
// @access PRIVATE
router.get("/", async (req, res) => {
  try {
    const { status, priority, assignTo } = req.query;
    let query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (assignTo) query.assignTo = { $in: assignTo.split(",") };
    const tickets = await Tickets.find(query);
    res.json(tickets);
  } catch (error) {
    console.error(error);
  }
});
