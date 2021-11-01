import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/Seo'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import ArticlePreview from '../components/ArticlePreview'

class BlogIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulBlogPost.nodes')

    return (
      <Layout location={this.props.location}>
        <Seo title="Blog" />
        <Hero
          title="Articles"
          svg="/svg/lovelace-logo2.svg"
          centered={true}
        />
        <ArticlePreview posts={posts} />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
    allContentfulBlogPost(
      sort: { fields: [publishDate],
      order: DESC }
    ) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        heroImage {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 212
          )
        }
        svg {
          file {
            url
          }
        }
        description {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
