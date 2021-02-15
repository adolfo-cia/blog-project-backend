const User = require('../models/user-model.js');

module.exports = {

  getMyProfile: async (req, res) => {
    try {
      const { _id: userId } = req.user;
      const user = await User
        .findById(userId)
        .exec();
      if (user) {
        return res.json(user);
      }
      return res.status(404).send();
    } catch (err) {
      return res.status(500).json(err);
    }
  },

};
