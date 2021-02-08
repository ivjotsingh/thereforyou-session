const Token = require("./token");

const jwt = require("jsonwebtoken");

createTokens = async (userName) => {
  //Access Token: Short Lived
  //TODO : Try implementing async function
  let access_token = await jwt.sign(
    { user: userName },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.EXPIRATION_TIME_AT,
    }
  );
  //TODO: Use a diff secret key, use a refresh token on rotational basis
  let refresh_token = jwt.sign({ user: userName }, process.env.JWT_SECRET_RT, {
    expiresIn: process.env.EXPIRATION_TIME_RT,
  });

  let user_exists_with_rt = await Token.findOne({ user: userName });
  //The previous refresh token will become invalid
  if (user_exists_with_rt) {
    user_exists_with_rt.token = refresh_token;
    await user_exists_with_rt.save();
  } else {
    let new_user_with_rt = new Token({
      user: userName,
      token: refresh_token,
    });
    await new_user_with_rt.save();
  }
  return { access_token: access_token, refresh_token: refresh_token };
};
