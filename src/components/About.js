// import React, { useContext, useEffect } from "react";
// import NoteContext from "../context/notes/NoteCotext";

export default function About() {

  /* const context = useContext(NoteContext)
  const { name, Current_Address } = context.state
 
  useEffect(() => {
    context.updateState()
    // eslint-disable-next-line
  },[]) */

  return (
    <div>
      {/* <div className="container my-3">
          My name is {name} and I am from {Current_Address}
      </div> */}
      <div className="container my-3">
        <p>
          How it works Here’s what you need to know before getting started with
          the navbar: Navbars require a wrapping .navbar with .navbar-expand for
          responsive collapsing and color scheme classes. Navbars and their
          contents are fluid by default. Use optional containers to limit their
          horizontal width. Use our spacing and flex utility classes for
          controlling spacing and alignment within navbars. Navbars are
          responsive by default, but you can easily modify them to change that.
          Responsive behavior depends on our Collapse JavaScript plugin. Navbars
          are hidden by default when printing. Force them to be printed by
          adding .d-print to the .navbar. See the display utility class. Ensure
          accessibility by using a nav element or, if using a more generic
          element such as a div, add a role="navigation" to every navbar to
          explicitly identify it as a landmark region for users of assistive
          technologies. Read on for an example and list of supported
          sub-components.
        </p>
      </div>
    </div>
  );
}
