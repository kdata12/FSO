const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

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
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String,  genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int
      author: String!
      genres: [String!]!
    ): Book,

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
  
`

const resolvers = {
  Mutation: {
    addBook: (obj, args) => {
      const newBook = {...args, id: uuid()}
      books = books.concat(newBook)

      const authorInDatabase = authors.find(author => author.name === args.author)

      if (!authorInDatabase) {
        const author = {name: args.author, id: uuid(), born: args.born}
        authors = authors.concat(author)
      }
      return newBook
    },
    editAuthor: (obj, args) => {
      let updatedAuthor = authors.find(a => a.name === args.name)
      updatedAuthor = {...updatedAuthor, born: args.setBornTo}
      authors = authors.map(author => author.name !== updatedAuthor.name ? author : updatedAuthor)
      return updatedAuthor
    }
  },

  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (obj, args) => {
      if (!args.author && !args.genre) return books
      //has to work for both arguments
      if (!args.genre && args.author) {
        const byAuthor = books.filter(book => book.author === args.author)
        return byAuthor
      } else if (args.genre && !args.author) {
        const byGenre = books.filter(book => book.genres.includes(args.genre))
        return byGenre
      }
      const byAuthorGenre = books.filter(
        book =>
          book.author === args.author &&
          book.genres.includes(args.genre)
      )
      return byAuthorGenre
    },
    allAuthors: () => authors
  },
  Author: {
    name: (obj) => obj.name,
    bookCount: (obj) => {
      const author = obj

      const authorBooks = books.filter(b => b.author == author.name)
      const bookCount = authorBooks.length
      return bookCount
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})