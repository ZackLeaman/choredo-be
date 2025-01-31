const supabase = require("../db/supabaseClient");

exports.getUserProfile = async (req, res) => {
  console.log("GET USER PROFILE");

  const user = req.user;
  try {
    const { data, error } = await supabase
      .from("user_profile")
      .select()
      .eq("user_id", user.id);

    if (error) {
      throw new Error(error);
    }

    return res.status(200).json({
      data:
        data && data.length
          ? {
              level: data[0].level,
              progress: data[0].progress,
              chores_completed: data[0].chores_completed,
              level_up_increase: data[0].level_up_increase,
            }
          : {},
      error: null,
    });
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
};

exports.postUserProfile = async (req, res) => {
  console.log("POST USER PROFILE");

  const user = req.user;
  try {
    const { level, progress, chores_completed, level_up_increase } = req.body;
    let updateProps = {};
    if (level !== undefined) {
      updateProps.level = level;
    }
    if (progress !== undefined) {
      updateProps.progress = progress;
    }
    if (chores_completed !== undefined) {
      updateProps.chores_completed = chores_completed;
    }
    if (level_up_increase !== undefined) {
      updateProps.level_up_increase = level_up_increase;
    }
    const { data, error } = await supabase
      .from("user_profile")
      .upsert(
        {
          user_id: user.id,
          ...updateProps,
        },
        {
          onConflict: ["user_id"],
        }
      )
      .select();

    if (error) {
      throw new Error(error.message);
    }

    console.log(data);
    return res.status(200).json({
      data:
        data && data.length
          ? {
              level: data[0].level,
              progress: data[0].progress,
              chores_completed: data[0].chores_completed,
              level_up_increase: data[0].level_up_increase,
            }
          : {},
      error: null,
    });
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
};
