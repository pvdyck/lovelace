import React from 'react'

import {
  cTags,
  cTag
} from './styles/tags.module.less'

const Tags = ({ tags }) =>
  tags.length > 0 && (
    <small className={cTags}>
      {tags.map((tag) => (
        <div key={tag} className={cTag}>
          {tag}
        </div>
      ))}
    </small>
  )

export default Tags
