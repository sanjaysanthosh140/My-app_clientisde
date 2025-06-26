import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8383/graphql",
  cache: new InMemoryCache(),
  credentials: 'include',
  headers: {
    Authorization: `${localStorage.getItem("token")}` || "",
  },
});
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  //</StrictMode>,
);
