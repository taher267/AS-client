const {
  MODE,
  VITE_PUBLIC_CLIENT_URL_LOCAL,
  VITE_PUBLIC_CLIENT_URL_LIVE,
  VITE_GOOGLE_CLIENT_ID,
} = import.meta.env;

const getGoogleUrlForIdToken = ({
  route = "",
  uri = MODE === "development"
    ? VITE_PUBLIC_CLIENT_URL_LOCAL
    : VITE_PUBLIC_CLIENT_URL_LIVE,
}) => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

  const options = {
    redirect_uri: `${uri}${route}`,
    client_id: VITE_GOOGLE_CLIENT_ID,
    access_type: "online",
    response_type: "token id_token",
    prompt: "consent",
    nonce: "n-0S6_WzA2Mj",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
    ].join(" "),
  };
  // console.log(options)
  const qs = new URLSearchParams(options);
  //   console.log(JSON.stringify(qs));
  return `${rootUrl}?${qs.toString()}`;
};

export default getGoogleUrlForIdToken;

