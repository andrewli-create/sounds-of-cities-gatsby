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
  const bigImg = [2, 3, 6, 7, 10];
  console.log("heroImage", heroImage);
  return (
    <div>
      <div className="first-section main-background">
        <div className="landing-gradient"></div>
        <img src={albumnImg}/>
        <div className="landing-hero image-cover" style={{backgroundImage: `url(${heroImage.images.fallback.src})`}}></div>
        <section className="after-hero">
            <Link className="hero-listen" to="/composition">Listen</Link>
        </section>
      </div>
      <section className="gallary-section">
        <h1 className="gallery-title">The Sounds of Cities</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p style={{paddingTop: 10, paddingBottom: 80, textAlign: 'center', maxWidth: 800, margin: 'auto'}}>
                "The Sounds of Cities is a 80-minutes long Dolby Atmos Music Album that includes music from 9 living composers who compose music in different genres and styles. Inspired by the elements of a city that are everywhere in the surrounding, I am doing a Dolby Atmos mix for the music in this album to provide an immersive hearing experience to the audience, just like the audience is walking on the street, talking the subway or watching a movie in a theatre."
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row g-4">
            {gallery.map((galleryItem, index) => (
              <div className={bigImg.includes(index+1) ? "col-md-8" : "col-md-4"}>
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