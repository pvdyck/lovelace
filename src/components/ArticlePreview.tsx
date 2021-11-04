import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Container from './Container'
import Tags from './Tags'
import { useQueryParam } from '../utils/useQueryParam'
import {
  articleList,
  link,
  title,
  meta,
  blogTags,
  blogTag,
  blogTagActive
} from './styles/article-preview.module.less'

const ArticlePreview = ({ posts }:any) => {
  if (!posts) return null
  if (!Array.isArray(posts)) return null

  const [activeTag, setActiveTag] = useQueryParam('tag')
  const tags:any = []
  if (activeTag) tags.push('All')
  posts = posts.filter((post:any) => {
    if (post.tags) {
      post.tags.map((tag:any) => {
        if (!tags.includes(tag)) tags.push(tag)
      })
    }
    if (activeTag) {
      if (post.tags && post.tags.includes(activeTag)) return post
      else return false
    }
    else return post
  })
  // const tags = this?.location.search

  return (
    <Container>
      {tags && (
        <ul className={blogTags}>
          {tags.map((tag:string) => {
            return (
              <li
                key={tag}
                className={[blogTag, activeTag === tag || (tag === `All` && !activeTag) ? blogTagActive : []].join(' ')} 
                onClick={() => setActiveTag(tag === `All` ? null : tag)}
              >{tag}</li>
            )
          })}
        </ul>
      )}
      <ul className={articleList}>
        {posts.map((post:any) => {
          return (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`} className={link}>
                <GatsbyImage alt="" image={post.heroImage.gatsbyImageData} />
                <h2 className={title}>{post.title}</h2>
              </Link>
              <div
                dangerouslySetInnerHTML={{
                  __html: post.description.childMarkdownRemark.html,
                }}
              />
              <div className={meta}>
                <small className="meta">{post.publishDate}</small>
                <Tags tags={[post.tags[0]]} />
              </div>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default ArticlePreview
