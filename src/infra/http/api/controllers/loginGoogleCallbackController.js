const buildLoginGoogleCallbackContoller = (loginGoogleCallback) => async (httpRequest) => {
  const { user } = httpRequest.auth;
  const token = await loginGoogleCallback(user);
  return { statusCode: 200, body: token };
};

export default buildLoginGoogleCallbackContoller;
