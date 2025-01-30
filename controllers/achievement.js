exports.getReward = async (req, res) => {
  console.log("GET REWARD");

  const totalPokemon = 1304;
  const randomPokemonOffset = Math.floor(Math.random() * (totalPokemon + 1));

  try {
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

    return res.status(200).json(pokeDetailJSON.sprites.front_default);
  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json({ data: null, error: "Internal Server Error" });
  }
};
