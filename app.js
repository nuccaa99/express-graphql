import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { expenses, users } from "./data.js";

const resolvers = {
  Query: {
    getUsers: () => {
      return users;
    },
    getUser: (_, { id }) => {
      return users.find((user) => user.id === parseInt(id));
    },
    getExpenses: () => {
      return expenses;
    },
    getExpense: (_, { id }) => {
      return expenses.find((expense) => expense.id === parseInt(id));
    },
  },

  Mutation: {
    createUser: (_, { createUserDto }) => {
      const newUser = {
        id: users.length + 1,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
      };
      users.push(newUser);
      return newUser;
    },

    updateUser: (_, { id, updateUserDto }) => {
      const userIndex = users.findIndex((user) => user.id === parseInt(id));
      if (userIndex === -1) return null;

      const updatedUser = { ...users[userIndex], ...updateUserDto };
      users[userIndex] = updatedUser;
      return updatedUser;
    },

    deleteUser: (_, { id }) => {
      const index = users.findIndex((user) => user.id === parseInt(id));
      if (index === -1) return false;

      users.splice(index, 1);
      return true;
    },

    createExpense: (_, { createExpenseDto }) => {
      const newExpense = {
        id: expenses.length + 1,
        category: createExpenseDto.category,
        productName: createExpenseDto.productName,
        quantity: createExpenseDto.quantity,
        price: createExpenseDto.price,
        userId: createExpenseDto.userId,
      };
      expenses.push(newExpense);
      return newExpense;
    },

    updateExpense: (_, { id, updateExpenseDto }) => {
      const expenseIndex = expenses.findIndex((exp) => exp.id === parseInt(id));
      if (expenseIndex === -1) return null;

      const updatedExpense = { ...expenses[expenseIndex], ...updateExpenseDto };
      expenses[expenseIndex] = updatedExpense;
      return updatedExpense;
    },

    deleteExpense: (_, { id }) => {
      const index = expenses.findIndex(
        (expense) => expense.id === parseInt(id)
      );
      if (index === -1) return false;

      expenses.splice(index, 1);
      return true;
    },
  },

  User: {
    expenses: (user) => {
      return expenses.filter((expense) => expense.userId === user.id);
    },
  },

  Expense: {
    user: (expense) => {
      return users.find((user) => user.id === expense.userId);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);

console.log(`Server ready at ${url}`);
