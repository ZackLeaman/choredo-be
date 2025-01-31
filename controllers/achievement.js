const supabase = require("../db/supabaseClient");

exports.getReward = async (req, res) => {
  console.log("GET REWARD");

  const user = req.user;
  const totalPokemon = 1304;
  const randomPokemonOffset = Math.floor(Math.random() * (totalPokemon + 1));

  try {
    // reach out to get a random pokemon meta data link
    const pokeRes = await fetch(
      `${process.env.POKE_API}?offset=${randomPokemonOffset}&limit=1`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
    if (!pokeRes) {
      throw new Error("no response from POKE API");
    }
    const pokeResJSON = await pokeRes.json();
    if (
      !pokeResJSON.results ||
      !pokeResJSON.results.length ||
      !pokeResJSON.results[0].url
    ) {
      throw new Error("no results response from POKE API");
    }

    // get that pokemon's front sprite
    const pokeDetailRes = await fetch(pokeResJSON.results[0].url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    if (!pokeDetailRes) {
      throw new Error("no response from POKE API for poke details");
    }
    const pokeDetailJSON = await pokeDetailRes.json();
    if (
      !pokeDetailJSON ||
      !pokeDetailJSON.sprites ||
      !pokeDetailJSON.sprites.front_default
    ) {
      throw new Error("no response from POKE API for poke detail sprites");
    }
    const spriteLink = pokeDetailJSON.sprites.front_default;

    // figure out if achievement already exists and if not create it
    const { data: dataAchieve, error: errorAchieve } = await supabase
      .from("achievement")
      .select()
      .eq("location", spriteLink);
    console.log("achievement search response", dataAchieve, errorAchieve);
    let achievementId;
    if (!dataAchieve || !dataAchieve.length) {
      const { data: dataAchieveInsert, error: errorAchieveInsert } =
        await supabase
          .from("achievement")
          .insert({
            location: spriteLink,
          })
          .select();
      console.log(
        "achievement insert response",
        dataAchieveInsert,
        errorAchieveInsert
      );
      achievementId = dataAchieveInsert[0].id;
    }
    if (!achievementId) {
      achievementId = dataAchieve[0].id;
    }

    // create the user_achievement junction
    const { data: dataUserAchieve, error: errorUserAchieve } = await supabase
      .from("user_achievement")
      .insert({
        user_id: user.id,
        achievement_id: achievementId,
      })
      .select();
    console.log(
      "user achievement insert response",
      dataUserAchieve,
      errorUserAchieve
    );

    return res.status(200).json(spriteLink);
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
};

exports.getAchievements = async (req, res) => {
  console.log("GET ACHIEVEMENTS");

  const user = req.user;

  try {
    const { data, error } = await supabase
      .from("user_achievement")
      .select(
        `
          id,
          user_id,
          achievement_id ( id, location )
        `
      )
      .eq("user_id", user.id);

    console.log(data, error);
    return res.status(200).json({
      data: data.map((d) => ({
        id: d.id,
        location: d.achievement_id.location,
      })),
    });
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
};
