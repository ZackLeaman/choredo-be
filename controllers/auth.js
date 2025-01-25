const jwt = require("jsonwebtoken");
const supabase = require("../db/supabaseClient");
// const User = require("../models/user");

exports.postUser = async (req, res, next) => {
  console.log("POST USER", req.body);

  if (!req.body.email || !req.body.password) {
    return res.status(422).json({ error: "Invalid body parameters" });
  }

  const { email, password } = req.body;

  try {
    // Authenticate user with Supabase using the provided credentials
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // const user = data.user;
    // // If login is successful, generate your own JWT token
    // const accessToken = jwt.sign(
    //   { id: user.id, email: user.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" } // Set an expiration for the token (optional)
    // );

    // Send the JWT token back to the frontend
    console.log("User Logged In Successfully", data);
    res.status(200).json({ data: data });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.putUser = async (req, res, next) => {
  console.log("PUT USER", req.body);

  if (!req.body.email || !req.body.password) {
    return res.status(422).json({ error: "Invalid body parameters" });
  }

  const { email, password } = req.body;

  try {
    const {
      error,
      data: { user },
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log("Signup error:", error);
      return res.status(400).json({ error: error.message });
    }

    console.log("Signup success:", user);
    return res.status(200).json(user);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.postForgotPassword = async (req, res) => {
  console.log("POST FORGOT PASSWORD", req.body);

  if (!req.body.email) {
    return res.status(422).json({ error: "Invalid body parameters" });
  }

  const { email } = req.body;

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/update-password",
    });

    if (error) {
      console.log("Forgot password error:", error);
      return res.status(400).json({ error: error.message });
    }

    console.log("Password reset email sent successfully");
    return res
      .status(200)
      .json({ message: "Password reset email sent successfully" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.postUpdatePassword = async (req, res) => {
  console.log("POST UPDATE PASSWORD", req.body);

  if (!req.body.password || !req.body.confirm || !req.body.accessToken) {
    return res.status(422).json({ error: "Invalid body parameters" });
  }
  if (req.body.password !== req.body.confirm) {
    return res.status(422).json({ error: "Invalid password mismatch" });
  }

  const { password, accessToken, refreshToken } = req.body;

  try {
    // const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    // const { data, error } = await supabase.auth.verifyOtp({
    //   token_hash: token,
    //   type: "email",
    // });

    // const {
    //   data: { user },
    //   error,
    // } = await supabase.auth.setSession({
    //   access_token: accessToken,
    //   refresh_token: refreshToken,
    // });

    // const {
    //   data: { user: updatedUser },
    //   error: updateError,
    // } = await supabase.auth.updateUser({ password });

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(accessToken);

    const {
      data: { user: updatedUser },
      error: updateError,
    } = await supabase.auth.admin.updateUserById(user.id, {
      password,
    });

    if (error || updateError) {
      console.log("Forgot password error:", error, updateError);
      return res
        .status(400)
        .json({ error: error ? error.message : updateError.message });
    }

    // console.log("OTP Verify", data);

    // const { error: updateError } = await supabase.auth.updateUser({ password });

    // if (updateError) {
    //   console.log("Forgot password error:", error);
    //   return res.status(400).json({ error: error.message });
    // }

    console.log("Password updated successfully", updatedUser);
    return res
      .status(200)
      .json({ message: "Password updated successfully", updatedUser });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// https://ttktvycwmgivocpoavoh.supabase.co/auth/v1/verify?token=9e90f6e3dc8b41b0b1c4f127edd49eee3ee4cd89565bba4d08473914&type=recovery&redirect_to=http://localhost:5173/update-password
// https://ttktvycwmgivocpoavoh.supabase.co/auth/v1/verify?token=f034b2803043459de6319908b71889a2334077dabcb166306f9ea82a&type=recovery&redirect_to=http://localhost:5173/update-password
// https://ttktvycwmgivocpoavoh.supabase.co/auth/v1/verify?token=67c8e4eee19469fff76caba4abc1fb2cd933f5abdaf6a64a7b5324c0&type=recovery&redirect_to=http://localhost:5173/update-password
