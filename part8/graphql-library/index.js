require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
// const jwt = require('jsonwebtoken')

// const JWT_SECRET = process.env.JWT_SECRET

mongoose.set('useFindAndModify', false)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true)

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => Book.find({}),
    // returnedBooks = []
    // books.forEach((b) => {
    //   // allBooks have two optional parameters: author and genre
    //   // first, check for the book's author
    //   if (b.author === args.author) {
    //     // push to array returnedBooks only if book is not already in it
    //     returnedBooks.indexOf(b) === -1 && returnedBooks.push(b)
    //   }
    //   // second, check for each genre of the book
    //   b.genres.forEach((g) => {
    //     if (g === args.genre) {
    //       // push to array returnedBooks only if book is not already in it
    //       returnedBooks.indexOf(b) === -1 && returnedBooks.push(b)
    //     }
    //   })
    // })
    // // just for testing: if no books are found, display all the books
    // if (returnedBooks.length === 0) return books
    // return returnedBooks
    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: (root) =>
      Book.find({}).reduce(
        (sum, book) => (book.author === root.name ? sum + 1 : sum),
        0
      ),
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: { $in: [args.author] } })

      if (author) {
        const book = new Book({ ...args, author })
        return book.save()
      }

      let newAuthor = new Author({
        name: args.author,
        born: null,
        bookCount: 1,
      })
      newAuthor.save()

      const book = new Book({ ...args, newAuthor })
      return book.save()
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: { $in: [args.name] } })

      if (!author) {
        return null
      }
      author.born = args.setBornTo
      return author.save()
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
