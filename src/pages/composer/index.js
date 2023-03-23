import * as React from "react";

import Layout from "../../components/Layout";
import ComposerRoll from "../../components/ComposerRoll";

export default class ComposerIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <section className="section section--gradient">
          <div className="container">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="section">
                  <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                    Composers
                  </h2>
                  <ComposerRoll />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/blog-index.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: "0.5rem 0 0 #f40, -0.5rem 0 0 #f40",
              backgroundColor: "rgba(20, 20, 20, 1)",
              color: "white",
              padding: "2rem",
              textAlign: "center"
            }}
          >
            Composers
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <ComposerRoll />
            </div>
          </div>
        </section> */}
      </Layout>
    );
  }
}