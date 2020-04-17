const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Title 1',
    author: 'Mia Erbus',
    url: 'http://miaerbus.com',
    likes: 10,
  },
  {
    title: 'Title 2',
    author: 'Mia Erbus',
    url: 'http://miaerbus.com',
    likes: 20,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
