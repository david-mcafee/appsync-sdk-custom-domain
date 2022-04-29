import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { graphqlMutation } from "aws-appsync-react";
import { buildSubscription } from "aws-appsync";
import { v4 as uuidv4 } from "uuid";

const CreateTodo = gql`
  mutation createTodo($id: ID!, $name: String!, $description: String!) {
    createTodo(input: { id: $id, name: $name, description: $description }) {
      id
      name
      description
    }
  }
`;

const DeleteTodo = gql`
  mutation deleteTodo($input: DeleteTodoInput!) {
    deleteTodo(input: $input) {
      id
      name
      description
    }
  }
`;

const listTodos = gql`
  query listTodo {
    listTodos {
      items {
        id
        name
        description
      }
      nextToken
    }
  }
`;

const TodoSubscription = gql`
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
    }
  }
`;

const initialState = { name: "", description: "" };

const App = ({ todos, data, createTodo, deleteTodo }) => {
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    data?.subscribeToMore(buildSubscription(TodoSubscription, listTodos));
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return;

      const todo = { ...formState, id: uuidv4() };
      setFormState(initialState);
      await createTodo(todo);
    } catch (err) {
      // listTodos();
      console.log("error creating todo:", err);
    }
  }

  async function removeTodo(todo) {
    try {
      await deleteTodo({ input: { id: todo.id } });
    } catch (err) {
      listTodos();
      console.log("error deleting todo:", err);
    }
  }

  return (
    <div>
      <h1>Todos using Apollo V2 / API Key 🚀</h1>
      <input
        value={formState.name}
        onChange={(event) => setInput("name", event.target.value)}
        placeholder="Name"
      />
      <input
        value={formState.description}
        onChange={(event) => setInput("description", event.target.value)}
        placeholder="Description"
      />
      <button onClick={addTodo}>Add Todo</button>
      {todos.map((todo, index) => (
        // TODO: Update key on docs
        <div key={todo.id ? todo.id : index}>
          <h2>{todo.name}</h2>
          <h3>{todo.description}</h3>
          <button onClick={() => removeTodo(todo)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default compose(
  graphql(listTodos, {
    options: {
      fetchPolicy: "cache-and-network",
    },
    props: (props) => ({
      todos: props.data.listTodos
        ? props.data.listTodos.items.filter(
            (item) =>
              item.name !== typeof string || item.description !== typeof string
          )
        : [],
      data: props.data,
    }),
  }),
  graphqlMutation(CreateTodo, listTodos, "Todo"),
  graphqlMutation(DeleteTodo, listTodos, "Todo")
)(App);
