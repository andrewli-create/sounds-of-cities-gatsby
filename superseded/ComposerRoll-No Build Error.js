import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import Content, { HTMLContent } from "./Content";

const ComposerRollTemplate = (props) => {
  
  const { edges: posts } = props.data.allMarkdownRemark;
  console.log("composer", posts);
  return (
    <div className="col-md-12">
      {posts &&
        posts.map(({ node: post }) => (
          <div className="composer-block" key={post.id}>
            <ComposerContent
              title={post.frontmatter.title}
              content={post.html}
              contentComponent={HTMLContent}
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
  content,
  contentComponent,
}) => {
  const PostContent = contentComponent || Content;
  console.log(content);
  return (
    <section className="section">
      <h2>{title}</h2>
      {/* <PostContent content={content} /> */}
      <hr/>
    </section>
  );
};
ComposerContent.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
};


export default function ComposerRoll() {
  return (
    <StaticQuery
      query={graphql`
        query ComposerRollQuery {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "composer" } } }
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
                  templateKey
                  date(formatString: "MMMM DD, YYYY")
                  featuredpost
                  
                  featuredimage {
                    childImageSharp {
                      gatsbyImageData(
                        width: 120
                        quality: 100
                        layout: CONSTRAINED
                      )

                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <ComposerRollTemplate data={data} count={count} />}
    />
  );
}
