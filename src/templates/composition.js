import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import AOS from 'aos';
import 'aos/dist/aos.css';

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
  useEffect(() => {
    AOS.init();
  }, []);
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
            <div className="row">
              <div className="col-md-3 col-lg-2 col-xl-2">
                <img className="inside-albumn-art" src={albumArt} alt={title + "Albumn Art"}/>
              </div>
              <div className="col-md-9 col-lg-10 col-xl-10 compo-detail-wrapper">
                <div className="pad-lr-25" style={{paddingLeft: 25, paddingRight: 25}}>
                  <h1 data-aos='fade-up' className="compo-title is-size-2 has-text-weight-bold is-bold-light">
                    {title}
                  </h1>
                  <h2 data-aos='fade-up' className="compo-detail">{composer} - {instrumentation}</h2>
                </div>
              </div>
              <div className="row">
                <div>
                  <h2 data-aos='fade-up' className="slight-header video-header">Binaural</h2>
                </div>
                <iframe data-aos='fade-up' className="youtube-frame" src={post.frontmatter.youTubeLink}></iframe>
              </div>
              <div className="row">
                <div>
                  <h2 data-aos='fade-up' className="slight-header video-header">Stereo</h2>
                </div>
                <iframe data-aos='fade-up' className="youtube-frame" src={post.frontmatter.youTubeLinkB}></iframe>
              </div>
              <h2 data-aos='fade-up' className="slight-header slight-header-programme" style={{marginTop: 50, fontWeight: 'bold', fontSize: '1.5em'}}>Programme Notes:</h2>
              {/* <p style={{marginTop: 15}}>
                {programmeNotes}
              </p> */}
              {/* <p>This page is under constructions...</p> */}
              <PostContent data-aos='fade-up' content={programmeNotes} />
            </div>
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
        youTubeLinkB
        spotifyLink
        programmeNotes
        albumArt {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
            )

          }
        }
      }
    }
  }
`;

console.log(pageQuery);
