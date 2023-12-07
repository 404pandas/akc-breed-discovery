import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.error("Routing error: " + error);

  return (
    <div>
      <h1>Ruh-roh, Raggy!</h1>
      <p>This page doesn't exist!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default Error;
