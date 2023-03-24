import * as React from "react";
import Layout from "../components/Layout";
import { Link } from 'gatsby'

const NotFoundPage = () => (
  <Layout>
    <div className="container fullHeight">
      <div className="nothing">
        <h1 className="big-text">404 NOT FOUND</h1>
        <p>The music you're looking for is in another castle.</p>
        <Link to={"/"} className="no-style-link go-home-button">Back to Home</Link>
        {/* <p>You just hit a route that doesn&#39;t exist... the sadness.</p> */}
      </div>
    </div>
  </Layout>
);

export default NotFoundPage;
