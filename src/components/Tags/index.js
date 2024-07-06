import './index.css'

const Tags = props => {
  const {tagDetails, filterTasks, isActive} = props
  const {displayText} = tagDetails
  const tagClassName = isActive ? 'active-tag' : 'non-active-tag'
  const onClickTag = () => {
    filterTasks(displayText)
  }
  return (
    <li className="tag-item">
      <button type="button" className={tagClassName} onClick={onClickTag}>
        {displayText}
      </button>
    </li>
  )
}

export default Tags
