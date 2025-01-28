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
      let user = users.find((user) => user.id === parseInt(id));
      if (!user) return null;

      user = { ...user, ...updateUserDto };
      users = users.map((u) => (u.id === parseInt(id) ? user : u));
      return user;
    },

    deleteUser: (_, { id }) => {
      const initialLength = users.length;
      users = users.filter((user) => user.id !== parseInt(id));
      return users.length < initialLength;
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
      let expense = expenses.find((exp) => exp.id === parseInt(id));
      if (!expense) return null;

      expense = { ...expense, ...updateExpenseDto };
      expenses = expenses.map((exp) =>
        exp.id === parseInt(id) ? expense : exp
      );
      return expense;
    },

    deleteExpense: (_, { id }) => {
      const initialLength = expenses.length;
      expenses = expenses.filter((expense) => expense.id !== parseInt(id));
      return expenses.length < initialLength;
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

console.log(url);
