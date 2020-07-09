const Blog = require('../models/blog-model.js');

module.exports = {

  getBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find({}).limit(10).exec();
      res.json(blogs);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createBlog: async (req, res) => {
    const { _id, username } = req.user;
    const { name, description } = req.body;
    try {
      await Blog.create({
        name,
        description,
        'owner.id': _id,
        'owner.name': username,
      });
      res.status(201).send();
    } catch (err) {
      res.status(500).json(err);
    }
  },

  editBlog: async (req, res) => {
    const { _id: userId } = req.user;
    const { description } = req.body;
    const { blogId } = req.params;
    try {
      const blog = await Blog.findById(blogId).exec();
      if (blog) {
        if (blog.owner.id.toString() !== userId.toString()) {
          return res.status(401).send();
        }
        blog.description = description;
        await blog.save();
        return res.status(204).send();
      }
      return res.status(404).send();
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  getMyBlogs: async (req, res) => {
    const { _id: userId } = req.user;
    try {
      const blogs = await Blog.find({ 'owner.id': userId }).exec();
      res.json(blogs);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getSubscribedBlogs: async (req, res) => {
    const { subscribedBlogs } = req.user;
    try {
      const blogs = await Blog.find({ _id: { $in: subscribedBlogs } }).exec();
      res.json(blogs);
    } catch (err) {
      res.status(500).json(err);
    }
  },

};
