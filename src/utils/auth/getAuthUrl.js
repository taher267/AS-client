const { VITE_GOOGLE_CLIENT_ID } = import.meta.env;

const getGoogleUrl = ({ redirect_uri = "http://localhost:5173/signup" }) => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
  //   const redirect_uri =
  //     process.env.NODE_ENV === "development"
  //       ? process.env.GOOGLE_OAUTH_REDIRECT_URL_LOCAL
  //       : process.env.GOOGLE_OAUTH_REDIRECT_URL_LIVE;
  const options = {
    redirect_uri,
    client_id: VITE_GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
    ].join(" "),
  };
  const qs = new URLSearchParams(options);
  // console.log(JSON.stringify(qs));
  return `${rootUrl}?${qs.toString()}`;
};

export default getGoogleUrl;
