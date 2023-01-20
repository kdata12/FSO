import { gql } from "@apollo/client";

export const ALL_AUTHOR = gql`
    query  {
        allAuthors {
        name
        born
        bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query AllBooks {
        allBooks {
        title
        author
        published
        }
    }
`

export const ADD_BOOK = gql`
    mutation addBook ($title: String!, $author: String!, $genres: [String!]!, $published: Int) {
        addBook(title: $title, author: $author, genres: $genres, published: $published) {
        author
        published
        title
    }
  }
`

export const EDIT_BIRTHYEAR = gql`
    mutation EditAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
        name
        born
        bookCount
        }
    }
`

