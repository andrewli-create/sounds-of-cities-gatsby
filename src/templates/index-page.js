import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";

import Layout from "../components/Layout";
import Features from "../components/Features";
import BlogRoll from "../components/BlogRoll";
import FullWidthImage from "../components/FullWidthImage";
import albumnImg from "../img/album_art.jpeg"

// eslint-disable-next-line
export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
  gallery
}) => {
  const heroImage = getImage(image) || image;
  console.log("heroImage", heroImage);
  return (
    <div>
      <div className="first-section">
        <img src={albumnImg}/>
        <div className="landing-hero image-cover" style={{backgroundImage: `url(${heroImage.images.fallback.src})`}}></div>
        <section className="after-hero">
            <Link className="hero-listen" to="/composition">Listen</Link>
        </section>
      </div>
      <section>
        <div className="container">
          <div className="row g-4">
            {gallery.map((galleryItem) => (
              <div className="col-md-4">
                <div className="image-cover main-gallery-img" style={{backgroundImage: `url(${galleryItem.image.childImageSharp.gatsbyImageData.images.fallback.src})`}}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  gallery: PropTypes.shape({
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    altText: PropTypes.string
  })
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
        gallery={frontmatter.gallery}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        gallery {
          image {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
          altText
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                gatsbyImageData(width: 1000, quality: 100, layout: CONSTRAINED)
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;