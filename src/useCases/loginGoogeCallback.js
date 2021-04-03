export default function buildLoginGoogleCallback(AuthService) {
  return async function loginGoogleCallback(user) {
    return AuthService.generateJWT(user);
  };
}
