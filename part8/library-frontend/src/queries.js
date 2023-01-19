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

