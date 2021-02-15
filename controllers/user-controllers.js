const User = require('../models/user-model.js');

module.exports = {

  getUser: async (req, res) => {
    try {
      const { username } = req.params;
      const user = await User
        .findOne(
          { username },
          {
            username: 1,
            createdAt: 1,
            votedPosts: 1,
            votedComments: 1,
          },
        )
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
