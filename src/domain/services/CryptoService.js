import bcrypt from 'bcrypt';

export default Object.freeze({
  hashPassword: async (password) => {
    try {
      return await bcrypt.hash(password, 10);
    } catch (err) {
      throw new Error('Error while hashing password');
    }
  },
  isValidPassword: async (unHashedPassword, hashedPassword) => bcrypt
    .compare(unHashedPassword, hashedPassword),
});
