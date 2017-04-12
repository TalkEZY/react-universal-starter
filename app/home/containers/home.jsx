/** @flow */
import React from "react";
import { Link } from "react-router-dom";
import Container from "backpack-ui/dist/components/container";

export default function Home() {
  return (
    <Container>
      <h1>Home Page</h1>
      <Link to="/universal">Universal</Link>
    </Container>
  );
}
