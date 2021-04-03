const buildRegisterContoller = (registerUser) => async (httpRequest) => {
  const { username, password } = httpRequest.body;
  await registerUser({ username, password });
  return { statusCode: 200, body: {} };
};

export default buildRegisterContoller;
