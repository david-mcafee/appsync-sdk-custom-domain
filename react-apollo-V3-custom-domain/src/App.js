import React, { useState, useEffect } from 'react';
import { gql, useSubscription } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

const initialState = { name: '', description: '' };

const Todos = () => {
	const [formState, setFormState] = useState(initialState);
	const [todos, setTodos] = useState([]);

	function setInput(key, value) {
		setFormState({ ...formState, [key]: value });
	}

	const LIST_TODOS = gql`
		query listTodos {
			listTodos {
				items {
					id
					name
					description
				}
			}
		}
	`;

	const {
		loading: listLoading,
		data: listData,
		error: listError,
	} = useQuery(LIST_TODOS);

	useEffect(() => {
		if (listData) {
			setTodos(listData?.listTodos?.items);
		}
	}, [listData]);

	const CREATE_TODO = gql`
		mutation createTodo($input: CreateTodoInput!) {
			createTodo(input: $input) {
				id
				name
				description
			}
		}
	`;

	// Other testing options: use `data`, `loading`, in addition to `error`.
	// Can also use refetch if not using a subscription:
	// const [addTodoMutateFunction] = useMutation(CREATE_TODO, {
	//   refetchQueries: [LIST_TODOS, "listTodos"],
	// });
	const [addTodoMutateFunction, { error: createError }] =
		useMutation(CREATE_TODO);

	if (createError) {
		console.error(createError);
	}

	async function addTodo() {
		try {
			if (!formState.name || !formState.description) return;
			const todoId = uuidv4();
			const todo = { id: todoId, ...formState };
			setFormState(initialState);
			addTodoMutateFunction({ variables: { input: { ...todo } } });
		} catch (err) {
			console.log('error creating todo:', err);
		}
	}

	const DELETE_TODO = gql`
		mutation deleteTodo($input: DeleteTodoInput!) {
			deleteTodo(input: $input) {
				id
				name
				description
			}
		}
	`;

	const [deleteTodoMutateFunction] = useMutation(DELETE_TODO, {
		refetchQueries: [LIST_TODOS, 'listTodos'],
	});

	async function removeTodo(id) {
		try {
			deleteTodoMutateFunction({ variables: { input: { id } } });
		} catch (err) {
			console.log('error deleting todo:', err);
		}
	}

	const CREATE_TODO_SUBSCRIPTION = gql`
		subscription OnCreateTodo {
			onCreateTodo {
				id
				name
				description
			}
		}
	`;

	const { data: createSubData, error: createSubError } = useSubscription(
		CREATE_TODO_SUBSCRIPTION
	);

	// Only add Todo from subscription if it does not already exist in state
	if (
		createSubData &&
		todos.filter((todo) => todo.id === createSubData?.onCreateTodo?.id)
			.length === 0
	) {
		console.log('subscription data');
		console.log(createSubData);
		setTodos([...todos, createSubData?.onCreateTodo]);
	} else if (createSubError) {
		console.error(createSubError);
	}

	let status = '';

	if (listLoading) {
		status = 'Loading todos...';
	} else if (listError) {
		status = 'Error loading todos!';
	}

	return (
		<div>
			<input
				onChange={(event) => setInput('name', event.target.value)}
				value={formState.name}
				placeholder="Name"
			/>
			<input
				onChange={(event) => setInput('description', event.target.value)}
				value={formState.description}
				placeholder="Description"
			/>
			<button onClick={addTodo}>Add Todo</button>

			<h2>{status}</h2>

			{todos.map((todo, index) => (
				// Update key in README to not use index
				<div key={todo.id ? todo.id : index}>
					<h2>{todo.name}</h2>
					<h3>{todo.description}</h3>
					<button onClick={() => removeTodo(todo.id)}>Delete</button>
				</div>
			))}
		</div>
	);
};

const App = () => {
	return (
		<div>
			<h1>Todos using Apollo V3 / API Key 🚀</h1>
			<Todos />
		</div>
	);
};

export default App;
