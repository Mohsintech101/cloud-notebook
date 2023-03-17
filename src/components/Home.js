import React from "react";
import AddNotes from "./AddNotes";
import Notes from "./Notes";

function Home({ ChangeAlert }) {
  return (
    <>
      <AddNotes ChangeAlert={ChangeAlert} />
      <Notes ChangeAlert={ChangeAlert} />
    </>
  );
}

export default Home;
