import UserMongo from '../infra/db/mongoose/models/user-model';
import UserMapper from '../mappers/UserMapper';

export default function buildUserRepo() {
  const getUserByUsername = async (username) => {
    const user = await UserMongo.findOne({ username }).exec();
    if (!user) {
      return null;
    }
    return UserMapper.toDomain(user);
  };

  const getUserById = async (id) => {
    const user = await UserMongo.findById(id).exec();
    if (!user) {
      return undefined;
    }
    return UserMapper.toDomain(user);
  };

  const getUserByGoogleId = async (googleId) => {
    const user = await UserMongo.findOne({ googleId }).exec();
    if (!user) {
      return undefined;
    }
    return UserMapper.toDomain(user);
  };

  const exists = async (username) => {
    const user = await getUserByUsername(username);
    if (user) {
      return true;
    } return false;
  };

  const create = async (user) => UserMongo.create({ ...UserMapper.toPersistence(user) });

  return Object.freeze({
    getUserByUsername, getUserById, getUserByGoogleId, exists, create,
  });
}
