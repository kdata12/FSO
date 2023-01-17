const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')

let persons = [
    {
        name: "Arto Hellas",
        phone: "040-123543",
        street: "Tapiolankatu 5 A",
        city: "Espoo",
        id: "3d594650-3436-11e9-bc57-8b80ba54c431"
    },
    {
        name: "Matti Luukkainen",
        phone: "040-432342",
        street: "Malminkaari 10 A",
        city: "Helsinki",
        id: '3d599470-3436-11e9-bc57-8b80ba54c431'
    },
    {
        name: "Venla Ruuska",
        street: "Nallemäentie 22 C",
        city: "Helsinki",
        id: '3d599471-3436-11e9-bc57-8b80ba54c431'
    },
]

const typeDefs = gql`
    type Address {
        street: String!
        city: String! 
    }

    type Person {
        name: String!
        phone: String
        address: Address! 
        id: ID!
        contact: Contact!
    }

    type Contact {
        name: String!
        phone: String
    }

  type Query {
    personCount: Int!   
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  enum YesNo {
      YES
      NO
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
  }

`

const resolvers = {
    Mutation: {
        addPerson: (obj, args) => {
            let duplicateUserExists = persons.find(p => p.name === args.name)
            
            if (duplicateUserExists) {
                throw new UserInputError('Name must be unique', {
                    invalidArgs: args.name,
                })
            }
            const person = { ...args, id: uuid() }
            persons = persons.concat(person)
            return person
        }
    },

    Query: {
        personCount: () => persons.length,
        allPersons: (obj, args) => {
            if (!args.phone) {
                return persons
            }
            const byPhone = (person) => args.phone === 'YES' ? person.phone : !person.phone
            
            return persons.filter(byPhone)
        },
        findPerson: (obj, args) =>
            persons.find(p => p.name === args.name)
    },

    Person: {
        //all other fields are defaulted i.e. name, phone, address
        name: (obj) => obj.name,
        phone: (obj) => obj.phone,
        id: (obj) => obj.id,
        contact: (obj) => {
            return {
                name: obj.name,
                phone: obj.phone
            }
        },
        address: (obj) => {
            return {
                city: obj.city,
                street: obj.street,
            }
        }
    },

    Address: {
        city: (obj) => obj.city,
        street: (obj) => obj.street
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
