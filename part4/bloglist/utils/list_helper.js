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
    return []
  }

  return blogs
    .map(({ title, author, likes }) => ({ title, author, likes }))
    .reduce((max, blog) => (max.likes > blog.likes ? max : blog))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
