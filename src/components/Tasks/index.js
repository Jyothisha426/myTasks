import './index.css'

const Tasks = props => {
  const {taskDetails} = props
  const {task, selectedTag} = taskDetails
  return (
    <li className="task-item">
      <p className="task-name">{task}</p>
      <p className="task-tag">{selectedTag}</p>
    </li>
  )
}

export default Tasks
