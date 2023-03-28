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
export const ComposerTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  profileImage,
  coverImage,
  composition,
  instrumentation,
  website,
  socialMediaA,
  socialMediaB,
  socialHandleA,
  socialHandleB,
  bio,
  programmeNotes,
  helmet,
}) => {
  useEffect(() => {
    AOS.init();
  }, []);
  const PostContent = contentComponent || Content;
  console.log(programmeNotes);
  return (
    <div>
      <div className="cover-image image-cover" style={{backgroundImage: `url(${coverImage.childImageSharp.gatsbyImageData.images.fallback.src})`}}>
        <div className="cover-gradient"></div>
        <div className="profile-image image-cover" style={{backgroundImage: `url(${profileImage.childImageSharp.gatsbyImageData.images.fallback.src})`}}></div>
      </div>
      <div className="container profile-content">
        <div className="col-md-12">
          <h1 data-aos='fade-up'>{title}</h1>
          <h3 data-aos='fade-up'>Composition | <span className="bold-text">{composition}</span></h3>
          <h3 data-aos='fade-up'>Instrumentation | <span className="bold-text">{instrumentation}</span></h3>
          <h3 data-aos='fade-up'><Link target="_blank" to={website.includes('https://') ? website : ('https://'+ website)}> {website}</Link></h3>
          {socialHandleA
            ? 
            <h3 data-aos='fade-up'>
              <Link target="_blank" to={socialMediaA}>{socialHandleA}</Link>
              {socialMediaB != '-'
                ? <Link target="_blank" to={socialMediaB}> | {socialHandleB}</Link>
                : ''
              }
            </h3>
            : ''
          }
          <hr/>
          <div className="profile-content-wrapper">
            <h3 data-aos='fade-up' className="subtitle">Bio</h3>
            {/* <p className="paragraph">{bio}</p> */}
            <p className="paragraph">
              {/* <PostContent content={bio}/> */}
              <div data-aos='fade-up' dangerouslySetInnerHTML={{ __html: bio}} />
            </p>
            <br/>
            <h3 data-aos='zoom-in' className="subtitle">Programme Notes</h3>
            <p data-aos='zoom-in' className="paragraph">
              <PostContent content={programmeNotes}/>
            </p>
          </div>
        </div>
      </div>
      <div className="others-section">
        <Link className="no-style-link" to={'/composer'}>See other Composers</Link>
      </div>
    </div>
  );
};

ComposerTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  profileImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  coverImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  composition: PropTypes.string,
  instrumentation: PropTypes.string,
  website: PropTypes.string,
  socialMediaA: PropTypes.string,
  socialMediaB: PropTypes.string,
  socialHandleA: PropTypes.string,
  socialHandleB: PropTypes.string,
  bio: PropTypes.string,
  programmeNotes: PropTypes.string,
  helmet: PropTypes.object,
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ComposerTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        profileImage={post.frontmatter.profileImage}
        coverImage={post.frontmatter.coverImage}
        composition={post.frontmatter.composition}
        instrumentation={post.frontmatter.instrumentation}
        website={post.frontmatter.website}
        socialMediaA={post.frontmatter.socialMediaA}
        socialMediaB={post.frontmatter.socialMediaB}
        socialHandleA={post.frontmatter.socialHandleA}
        socialHandleB={post.frontmatter.socialHandleB}
        bio={post.frontmatter.bio}
        programmeNotes={post.frontmatter.programmeNotes}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        profileImage {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        coverImage {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        composition
        instrumentation
        website
        socialMediaA
        socialMediaB
        socialHandleA
        socialHandleB
        bio
        programmeNotes
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;

console.log(pageQuery);
