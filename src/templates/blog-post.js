import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/Seo'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
// import Tags from '../components/Tags'
import {
  articleNavigation,
  container,
  // meta,
  article,
  body
} from './blog-post.module.css'

// <span className={meta}>
//   {post.author.name} &middot;{' '}
//   <time dateTime={post.rawDate}>{post.publishDate}</time> –{' '}
//   {post.body.childMarkdownRemark.timeToRead} minute read
// </span>
// <Tags tags={post.tags} />
class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const previous = get(this.props, 'data.previous')
    const next = get(this.props, 'data.next')
    const svg = post.svg?.file?.url
    const heroImageNoText = post.heroImageNoText?.gatsbyImageData

    return (
      <Layout location={this.props.location}>
        <Seo
          title={post.title}
          description={post.description.childMarkdownRemark.excerpt}
          image={`http:${post.heroImage.resize.src}`}
        />
        <Hero
          image={post.heroImage.gatsbyImageData}
          heroImageNoText={heroImageNoText}
          svg={svg}
          title={post.title}
          content={post.description.childMarkdownRemark.excerpt}
        />
        <div className={container}>
          <div className={article}>
            <div
              className={body}
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
            {(previous || next) && (
              <nav>
                <ul className={articleNavigation}>
                  {previous && (
                    <li>
                      <Link to={`/blog/${previous.slug}`} rel="prev">
                        ← {previous.title}
                      </Link>
                    </li>
                  )}
                  {next && (
                    <li>
                      <Link to={`/blog/${next.slug}`} rel="next">
                        {next.title} →
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    contentfulBlogPost(slug: { eq: $slug }) {
      slug
      title
      author {
        name
      }
      publishDate(formatString: "MMMM Do, YYYY")
      rawDate: publishDate
      heroImage {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
      }
      heroImageNoText {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
      }
      svg {
        file {
          url
        }
      }
      body {
        childMarkdownRemark {
          html
          timeToRead
        }
      }
      tags
      description {
        childMarkdownRemark {
          excerpt
        }
      }
    }
    previous: contentfulBlogPost(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: contentfulBlogPost(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`
