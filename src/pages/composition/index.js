import * as React from "react";

import Layout from "../../components/Layout";
import CompositionRoll from "../../components/CompositionRoll";

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
                    Compositions
                  </h2>
                  <CompositionRoll />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}