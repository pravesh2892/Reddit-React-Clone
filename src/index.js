import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./chakra/theme";
import { Layout } from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <BrowserRouter>
    <ChakraProvider theme={theme}>
    <Layout>
    <App />
    </Layout>
    </ChakraProvider>
    </BrowserRouter>
  );
