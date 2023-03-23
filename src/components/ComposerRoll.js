import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import Content, { HTMLContent } from "./Content";

const ComposerRollTemplate = (props) => {
  
  const { edges: posts } = props.data.allMarkdownRemark;
  console.log("composer", posts);
  return (
    <div className="row">
      {posts &&
        posts.map(({ node: post }) => (
          <div className="composer-block col-md-4" key={post.id}>
            <ComposerContent
              title={post.frontmatter.title}
              content={post.html}
              contentComponent={HTMLContent}
              link={post.fields.slug}
              profileImage={post.frontmatter.profileImage.childImageSharp.gatsbyImageData.images.fallback.src}
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
  link,
  profileImage
}) => {
  const PostContent = contentComponent || Content;
  console.log(content);
  return (
    <div>
      <Link className='no-style-link' to={link}>
        <h2 className='composer-title'>{title}</h2>
        <div className="composer-preview-image image-cover" style={{backgroundImage: `url(${profileImage})`}}></div>
      </Link>
    </div>
    // <section className="composer-line">
    //   <Link to={link}>
    //     <h2>{title}</h2>
    //     <div className="profile-image image-cover" style={{backgroundImage: `url(${profileImage})`}}></div>
    //     {/* <PostContent content={content} /> */}
    //     <hr/>
    //   </Link>
    // </section>
  );
};
ComposerContent.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  profileImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};


export default function ComposerRoll() {
  return (
    <StaticQuery
      query={graphql`
        query ComposerRollNewQuery {
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
                  profileImage {
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
      render={(data, count) => <ComposerRollTemplate data={data} count={count} />}
    />
  );
}
