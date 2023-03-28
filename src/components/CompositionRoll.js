import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import Content, { HTMLContent } from "./Content";
import AOS from 'aos';
import 'aos/dist/aos.css';

const CompositionRollTemplate = (props) => {
  const { edges: posts } = props.data.allMarkdownRemark;
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="row">
      {posts &&
        posts.map(({ node: post }) => (
          <div className="composer-block col-md-12 col-lg-12 col-xl-6" key={post.id}>
            {console.log("image", post)}
            <ComposerContent data-aos='fade-up'
              title={post.frontmatter.title}
              link={post.fields.slug}
              composer={post.frontmatter.composer}
              instrumentation={post.frontmatter.instrumentation}
              content={post.html}
              contentComponent={HTMLContent}
              youTubelink={post.frontmatter.youTubelink}
              spotifylink={post.frontmatter.spotifylink}
              programmeNotes={post.frontmatter.programmeNotes}
              albumArt={post.frontmatter.albumArt.childImageSharp.gatsbyImageData.images.fallback.src}
            />
          </div>
        ))}
    </div>
  )
}

ComposerRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const ComposerContent = ({
  title,
  composer,
  instrumentation,
  link,
  content,
  contentComponent,
  youTubeLink,
  spotifyLink,
  programmeNotes,
  albumArt
}) => {
  const PostContent = contentComponent || Content;
  console.log(content);
  console.log("youTubeLink", youTubeLink);
  return (
    <div className='composition-line'>
      <Link className='composition-wrapper no-style-link' to={link}>
        <img className='composition-album-art' src={albumArt}/>
        <div className='composition-details'>
          <h2 className='composition-title'>{title}</h2>
          <h3>{composer}</h3>
        </div>
      </Link>
    </div>
  );
};

ComposerContent.propTypes = {
  title: PropTypes.string,
  composer: PropTypes.string,
  instrumentation: PropTypes.string,
  youTubeLink: PropTypes.string,
  spotifyLink: PropTypes.string,
  programmeNotes: PropTypes.string,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  albumArt: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};


export default function ComposerRoll() {
  return (
    <StaticQuery
      query={graphql`
        query CompositionRollQuery {
          allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___sequence] }
            filter: { frontmatter: { templateKey: { eq: "composition" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                html
                fields {
                  slug
                }
                frontmatter {
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
          }
        }
      `}
      render={(data, count) => <CompositionRollTemplate data={data} count={count} />}
    />
  );
}
