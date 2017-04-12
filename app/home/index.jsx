/** @flow */

import React from "react";
import { StyleRoot } from "radium";
import asset from "../shared/containers/asset";
import Layout from "../layouts/default";

export type HomeProps = {
  markup: string,
  header: string,
  footer: string,
  query: Object,
};

export default function Home({
    markup,
    header,
    footer,
    query,
}: HomeProps) {
  return (
    <Layout
      header={header}
      footer={footer}
      javascript={asset("home.js")}
      css={asset("home.css")}
      query={query}
      meta={{
        title: "Home",
        description: "A home page",
        url: "/",
        image: "",
      }}
    >
      <StyleRoot>
        <div id="app">{markup}</div>
      </StyleRoot>
    </Layout>
  );
}
