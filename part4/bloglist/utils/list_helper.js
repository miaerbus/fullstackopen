const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes)
  const reducer = (sum, item) => sum + item

  return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs === undefined || blogs.length == 0) {
    return {}
  }

  return blogs
    .map(({ title, author, likes }) => ({ title, author, likes }))
    .reduce((max, blog) => (max.likes > blog.likes ? max : blog))
}

// TODO:
const mostBlogs = (blogs) => {
  return _.chain(blogs)
    .countBy((item) => item._id)
    .pairs()
    .sortBy((item) => item[1])
    .reverse()
    .map((item) => _.findWhere(blogs, { _id: parseInt(item[0]) }))
    .value()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
