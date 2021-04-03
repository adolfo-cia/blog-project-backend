import { User } from '../domain';

export default {
  toPersistence: (user) => ({
    _id: user.getId(),
    username: user.getUsername(),
    password: user.getPassword(),
    googleId: user.getGoogleId(),
  }),

  toDomain: (raw) => {
    const user = User({
      id: raw.id,
      username: raw.username,
      password: raw.password,
      googleId: raw.googleId,
      createdOn: raw.createdAt,
      modifiedOn: raw.updatedAt,
    });
    return user;
  },
};
