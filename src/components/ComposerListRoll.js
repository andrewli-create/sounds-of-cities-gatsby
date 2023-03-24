import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import Content, { HTMLContent } from "./Content";

const ComposerListRollTemplate = (props) => {
  const { edges: posts } = props.data.allMarkdownRemark;
  return (
    <div>
      {posts &&
        posts.map(({ node: post }) => (
          <li className='navbar-dropdown-item' key={post.slug}>
            <Link to={post.fields.slug}>{post.frontmatter.title.split(' (')[0]}</Link>
          </li>
        ))}
    </div>
  )
}

ComposerListRoll.propTypes = {
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
      <PostContent content={content} />
      <hr/>
    </section>
  );
};
ComposerContent.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
};


export default function ComposerListRoll() {
  return (
    <StaticQuery
      query={graphql`
        query ComposerRollQuery {
          allMarkdownRemark(
            sort: { order: ASC, fields: [frontmatter___sequence] }
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
      render={(data, count) => <ComposerListRollTemplate data={data} count={count} />}
    />
  );
}
