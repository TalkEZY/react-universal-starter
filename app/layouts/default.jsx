/** @flow */
import React from "react";
import Helmet from "react-helmet";
import type { Children } from "react";
import asset from "../shared/containers/asset";

export type LayoutProps = {
  children?: Children,
  header: string,
  footer: string,
  javascript: Children,
  css: Children,
  query: Object,
  meta: {
    title: string,
    description: string,
    url: string,
    image: string,
  },
}

const commonJs = () => `
  window.lp = window.lp || {};
  /*
  window._trackJs = {
    token: "your-track-js-token",
    application: "your-track-js-app"
  };
  */

    // Setup for analytics
  window.lp.analytics = window.lp.analytics || {
    dataLayer: []
  };
  window.dataLayer = window.lp.analytics.dataLayer[0];
`;

const markup = html => `${html}`;

const inlineHtml = name => ({ html }) => (
  <div
    className={`Global-${name}`}
    dangerouslySetInnerHTML={{ __html: markup(html) }}
  />
);

const LPHeader = inlineHtml("header");
const LPFooter = inlineHtml("footer");

export default function Layout({
  children,
  header,
  footer,
  javascript,
  css,
  query,
  meta,
}: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
        <script dangerouslySetInnerHTML={{ __html: commonJs() }} />
        <Helmet
          title={meta.title}
          link={[
            { rel: "canonical", href: meta.url },
            { rel: "stylesheet", href: "http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" },
          ]}
          meta={[
            { charset: "utf-8" },
            { name: "title", content: meta.title },
            { name: "fb:app_id", content: "111111111" },
            { viewport: "title", content: "width=device-width, initial-scale=1" },
            { name: "description", content: meta.description },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:site", content: "@foo" },
            { itemprop: "name", content: meta.title },
            { itemprop: "description", content: meta.description },
            { itemprop: "image", content: meta.image },
            { property: "og:title", content: meta.title },
            { property: "og:description", content: meta.description },
            { property: "og:image", content: meta.image },
            { property: "og:url", content: meta.url },
            { property: "twitter:title", content: meta.title },
            { property: "twitter:description", content: meta.description },
            { property: "twitter:image", content: meta.image },
          ]}
        />

        {asset("common.css")}
        {css}
      </head>
      <body>
        <div className="content-wrapper navigation-wrapper">
          {!query.hideHeader &&
            <LPHeader html={header} />
          }

          <section id="main" role="main" tabIndex="0">
            {children}
          </section>
        </div>

        {!query.hideFooter &&
          <LPFooter html={footer} />
        }

        {asset("common.js")}

        {javascript}
      </body>
    </html>
  );
}
