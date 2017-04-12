/** @flow */
import React from "react";
import { StyleRoot } from "radium";
import asset from "../shared/containers/asset";
import Layout from "../layouts/default";

export type UniversalProps = {
  markup: string,
  header: string,
  footer: string,
  query: Object,
};

export default function Universal({
  markup,
  header,
  footer,
  query,
}: UniversalProps) {
  return (
    <Layout
      header={header}
      footer={footer}
      javascript={asset("universal.js")}
      css={asset("universal.css")}
      query={query}
      meta={{
        title: "Universal Page",
        description: "Rendered universally",
        url: "/universal",
        image: "",
      }}
    >
      <StyleRoot>
        <div
          id="app"
          dangerouslySetInnerHTML={{ __html: markup }}
        />
      </StyleRoot>
    </Layout>
  );
}
