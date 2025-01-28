export const typeDefs = `#graphql
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    expenses: [Expense!]!
  }

  type Expense {
    id: ID!
    category: String!
    productName: String!
    quantity: Float!
    price: Float!
    user: User!
  }

  type Query {
    getUsers: [User!]!
    getUser(id: ID!): User
    getExpenses: [Expense!]!
    getExpense(id: ID!): Expense
  }

  input CreateUser {
    firstName: String!
    lastName: String!
  } 

  input UpdateUser {
    firstName: String
    lastName: String
  } 

  input CreateExpense {
    category: String!
    productName: String!
    quantity: Float!
    price: Float!
    userId: ID!
  }

  input UpdateExpense {
    category: String
    productName: String
    quantity: Float
    price: Float
    userId: ID
  }

  type Mutation {
    deleteUser(id: ID!): Boolean!
    createUser(createUserDto: CreateUser!): User!
    updateUser(id: ID!, updateUserDto: UpdateUser!): User!

    createExpense(createExpenseDto: CreateExpense!): Expense!
    updateExpense(id: ID!, updateExpenseDto: UpdateExpense!): Expense!
    deleteExpense(id: ID!): Boolean!
  }
`;
