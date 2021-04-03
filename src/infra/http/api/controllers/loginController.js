const buildLoginContoller = (loginUser) => async (httpRequest) => {
  const { username, password } = httpRequest.body;
  const token = await loginUser({ username, password });
  return { statusCode: 200, body: token };
};

export default buildLoginContoller;
