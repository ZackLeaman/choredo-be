const supabase = require("../db/supabaseClient");
const { v4: uuidv4 } = require("uuid");
const Chore = require("../models/chore");
const Tag = require("../models/tag");

exports.getPublicChores = async (req, res, next) => {
  console.log("GET PUBLIC CHORES");

  try {
    const { data, error } = await supabase
      .from("chore")
      .select(
        "id, name, description, completed_on, frequency_days, public, username"
      )
      .eq("public", "true");

    // TODO limit and order as params sent and return back
    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({
      data,
      error: null,
    });
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
};

exports.getUserChores = async (req, res, next) => {
  console.log("GET USER CHORES");

  try {
    const { data, error } = await supabase
      .from("chore")
      .select(
        "id, name, description, completed_on, frequency_days, public, username, user_id"
      )
      .eq("user_id", req.user.id);
    // TODO limit and order as params sent and return back
    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({
      data,
      error: null,
    });
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
};

exports.postChore = async (req, res, next) => {
  console.log("POST CHORE", req.body);

  try {
    const {
      name,
      frequency_days,
      completed_on,
      description,
      public: pub,
    } = req.body;
    const { data, error } = await supabase
      .from("chore")
      .insert({
        id: uuidv4(),
        name,
        frequency_days,
        completed_on,
        description,
        public: pub,
        user_id: req.user.id,
        username: req.user.email.split("@")[0],
      })
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({
      data,
      error: null,
    });
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
};

exports.putChore = async (req, res, next) => {
  console.log("PUT CHORE", req.body);

  try {
    const choreId = req.params.choreId;
    const {
      name,
      frequency_days,
      completed_on,
      description,
      public: pub,
    } = req.body;

    const { data, error } = await supabase
      .from("chore")
      .upsert({
        name,
        frequency_days,
        completed_on,
        description,
        public: pub,
      })
      .eq("id", choreId);

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({
      data,
      error: null,
    });
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
};

exports.postCompleteChore = async (req, res, next) => {
  console.log("POST COMPLETE CHORE");

  try {
    const choreId = req.params.choreId;
    const { completed_on } = req.body;

    const { data, error } = await supabase
      .from("chore")
      .update({
        completed_on,
      })
      .eq("id", choreId);

    if (error) {
      throw new Error(error.message);
    }

    // TODO update user progress and level up if needed

    return res.status(200).json({
      data,
      error: null,
    });
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
};

exports.deleteChore = async (req, res, next) => {
  console.log("DELETE CHORE");

  try {
    const choreId = req.params.choreId;

    const { data, error } = await supabase
      .from("chore")
      .delete()
      .eq("id", choreId);

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({
      data,
      error: null,
    });
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
};
