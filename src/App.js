import {Component} from 'react'

import {v4 as uuid} from 'uuid'

import Tags from './components/Tags'

import Tasks from './components/Tasks'

import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    typeInput: '',
    selectedTagId: tagsList[0].optionId,
    tasksList: [],
    filterTag: 'ALL',
  }

  onChangeInput = event => {
    this.setState({typeInput: event.target.value})
  }

  onChangeTag = event => {
    this.setState({selectedTagId: event.target.value})
  }

  filterTasks = selectedTag => {
    this.setState(prevState => ({
      filterTag: prevState.filterTag === selectedTag ? 'ALL' : selectedTag,
    }))
  }

  addTask = event => {
    event.preventDefault()
    const {typeInput, tasksList, selectedTagId} = this.state
    const selectedTag = tagsList.find(tag => tag.optionId === selectedTagId)
    const newTask = {
      id: uuid(),
      task: typeInput,
      selectedTag: selectedTag.displayText,
    }
    this.setState({
      tasksList: [...tasksList, newTask],
      typeInput: '',
      selectedTagId: tagsList[0].optionId,
    })
  }

  renderTasks = () => {
    const {tasksList, filterTag} = this.state
    const filteredTasks =
      filterTag === 'ALL'
        ? tasksList
        : tasksList.filter(eachTask => eachTask.selectedTag === filterTag)
    const tasksLength = filteredTasks.length
    return (
      <>
        {tasksLength === 0 ? (
          <div className="no-tasks-container">
            <p className="no-tasks-head">No Tasks Added Yet</p>
          </div>
        ) : (
          <ul className="tasks-list">
            {filteredTasks.map(eachTask => (
              <Tasks key={eachTask.id} taskDetails={eachTask} />
            ))}
          </ul>
        )}
      </>
    )
  }

  render() {
    const {typeInput, selectedTagId, filterTag} = this.state
    return (
      <div className="main-container">
        <div className="left-container">
          <h1 className="left-heading">Create a task!</h1>
          <form className="form" onSubmit={this.addTask}>
            <div className="input-container">
              <label className="label" htmlFor="taskInput">
                Task
              </label>
              <input
                type="text"
                placeholder="Enter the task here"
                className="input"
                id="taskInput"
                value={typeInput}
                onChange={this.onChangeInput}
              />
            </div>
            <div className="input-container">
              <label className="label" htmlFor="tagsInput">
                Tags
              </label>
              <select
                className="select"
                id="tagsInput"
                value={selectedTagId}
                onChange={this.onChangeTag}
              >
                {tagsList.map(eachTag => (
                  <option key={eachTag.optionId} value={eachTag.optionId}>
                    {eachTag.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="add-task-btn">
              Add Task
            </button>
          </form>
        </div>
        <div className="right-container">
          <h1 className="right-heading">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(eachTag => (
              <Tags
                key={eachTag.optionId}
                tagDetails={eachTag}
                filterTasks={this.filterTasks}
                isActive={eachTag.displayText === filterTag}
              />
            ))}
          </ul>
          <h1 className="right-heading">Tasks</h1>
          {this.renderTasks()}
        </div>
      </div>
    )
  }
}

export default App
