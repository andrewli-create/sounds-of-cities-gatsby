import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

// eslint-disable-next-line
export const CompositionTemplate = ({
  post,
  content,
  contentComponent,
  composer,
  title,
  instrumentation,
  youTubeLink,
  spotifyLink,
  programmeNotes,
  albumArt
}) => {
  const PostContent = contentComponent || Content;
  console.log("title", title);
  console.log("composer", composer);
  console.log("instrumentation", instrumentation);
  console.log("spotifyLink", spotifyLink);
  console.log("youTubeLink", youTubeLink);
  console.log("programmeNotes", programmeNotes);
  console.log("albumArt", albumArt);
  console.log("inner-post", post)
  return (
    <section className="section" style={{minHeight: 1000}}>
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="compo-title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <h2 className="compo-detail">{composer} - {instrumentation}</h2>
            <div className="row">
              <iframe className="youtube-frame" src={post.frontmatter.youTubeLink}></iframe>
            </div>
            <h2 style={{marginTop: 40}}>Programme Notes:</h2>
            {/* <p style={{marginTop: 15}}>
              {programmeNotes}
            </p> */}
            {/* <p>This page is under constructions...</p> */}
            <PostContent content={programmeNotes} />
          </div>
        </div>
      </div>
    </section>
  );
};

CompositionTemplate.propTypes = {
  post: PropTypes.object.isRequired,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  composer: PropTypes.string,
  instrumentation: PropTypes.string,
  youTubeLink: PropTypes.string,
  spotifyLink: PropTypes.string,
  programmeNotes: PropTypes.string,
  albumArt: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

const CompositionPost = ({ data }) => {
  const { markdownRemark: post } = data;
  console.log("data", data)
  console.log("post", post)
  return (
    <Layout>
      <CompositionTemplate
        post={post}
        content={post.html}
        contentComponent={HTMLContent}
        composer={post.frontmatter.composer}
        instrumentation={post.frontmatter.instrumentation}
        youTubelink={post.frontmatter.youTubelink}
        spotifylink={post.frontmatter.spotifylink}
        programmeNotes={post.frontmatter.programmeNotes}
        albumArt={post.frontmatter.albumArt.childImageSharp.gatsbyImageData.images.fallback.src}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

CompositionPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default CompositionPost;

export const pageQuery = graphql`
  query getCompositionByIDNew($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        composer
        instrumentation
        youTubeLink
        spotifyLink
        programmeNotes
        albumArt {
          childImageSharp {
            gatsbyImageData(
              width: 120
              quality: 100
              layout: FULL_WIDTH
            )

          }
        }
      }
    }
  }
`;

console.log(pageQuery);
