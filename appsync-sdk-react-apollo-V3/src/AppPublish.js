// import React, { useState, useEffect } from "react";
import React, { useState } from "react";
// import { gql, useSubscription } from "@apollo/client";
import { gql } from "@apollo/client";
// import { useMutation, useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
// import { v4 as uuidv4 } from "uuid";

const initialState = { name: "" };

const Publishs = () => {
  const [formState, setFormState] = useState(initialState);
  const [publishs, setPublishs] = useState([]);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  // const LIST_PUBLISHS = gql`
  //   query listPublishs {
  //     listPublishs {
  //       items {
  //         id
  //         name
  //         description
  //       }
  //     }
  //   }
  // `;

  // const {
  //   loading: listLoading,
  //   data: listData,
  //   error: listError,
  // } = useQuery(LIST_PUBLISHS);

  // useEffect(() => {
  //   if (listData) {
  //     setPublishs(listData?.listPublishs?.items);
  //   }
  // }, [listData]);

  // const CREATE_PUBLISH = gql`
  //   mutation createPublish($input: CreatePublishInput!) {
  //     createPublish(input: $input) {
  //       id
  //       name
  //       description
  //     }
  //   }
  // `;

  //   const CREATE_PUBLISH = gql`
  // mutation Publish {
  // 	publish(data:"{\"name\":\"value\"}", name:"custom") {
  // 		data
  // 		name
  // 	}
  // }
  //   `;
  const CREATE_PUBLISH = gql`
      	mutation Publish {
  		publish(data:"{\"name\":\"value\"}", name:"custom") {
  			data
  			name
  		}
  	}
  `;

  // Other testing options: use `data`, `loading`, in addition to `error`.
  // Can also use refetch if not using a subscription:
  // const [addPublishMutateFunction] = useMutation(CREATE_PUBLISH, {
  //   refetchQueries: [LIST_PUBLISHS, "listPublishs"],
  // });
  const [addPublishMutateFunction, { error: createPublishError }] =
    useMutation(CREATE_PUBLISH);

  if (createPublishError) {
    console.log(createPublishError);
  }

  async function addPublish() {
    try {
      if (!formState.name) return;
      // const publishId = uuidv4();
      const publish = { name: formState.name };
      setFormState(initialState);
      addPublishMutateFunction({ variables: { input: { ...publish } } });
    } catch (err) {
      console.log("error creating publish:", err);
    }
  }

  // const DELETE_PUBLISH = gql`
  //   mutation deletePublish($input: DeletePublishInput!) {
  //     deletePublish(input: $input) {
  //       id
  //       name
  //       description
  //     }
  //   }
  // `;

  // const [deletePublishMutateFunction] = useMutation(DELETE_PUBLISH, {
  //   refetchQueries: [LIST_PUBLISHS, "listPublishs"],
  // });

  // async function removePublish(id) {
  //   try {
  //     deletePublishMutateFunction({ variables: { input: { id } } });
  //   } catch (err) {
  //     console.log("error deleting publish:", err);
  //   }
  // }

  // const CREATE_PUBLISH_SUBSCRIPTION = gql`
  //   subscription OnCreatePublish {
  //     onCreatePublish {
  //       id
  //       name
  //       description
  //     }
  //   }
  // `;

  // const { data: createSubData, error: createSubError } = useSubscription(
  //   CREATE_PUBLISH_SUBSCRIPTION
  // );

  // Only add Publish from subscription if it does not already exist in state
  // if (
  //   createSubData &&
  //   publishs.filter(
  //     (publish) => publish.id === createSubData?.onCreatePublish?.id
  //   ).length === 0
  // ) {
  //   console.log("subscription data");
  //   console.log(createSubData);
  //   setPublishs([...publishs, createSubData?.onCreatePublish]);
  // } else if (createSubError) {
  //   console.error(createSubError);
  // }

  // let status = "";

  // if (listLoading) {
  //   status = "Loading publishs...";
  // } else if (listError) {
  //   status = "Error loading publishs!";
  // }

  return (
    <div>
      <input
        onChange={(event) => setInput("name", event.target.value)}
        value={formState.name}
        placeholder="Name"
      />
      <button onClick={addPublish}>Add Publish</button>

      {/* <h2>{status}</h2> */}

      {publishs.map((publish, index) => (
        // Update key in README to not use index
        <div key={publish.id ? publish.id : index}>
          <h2>{publish.name}</h2>
          <h3>{publish.description}</h3>
          {/* <button onClick={() => removePublish(publish.id)}>Delete</button> */}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Publishs using Apollo V3 / API Key 🚀</h1>
      <Publishs />
    </div>
  );
};

export default App;
