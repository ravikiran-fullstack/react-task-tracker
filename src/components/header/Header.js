import PropTypes from 'prop-types'
import React from 'react'

import Button from '../button/Button';

const Header = ({title, onShow, showAddTask}) => {
  const handleClick = () => {
    console.log('Button clicked');
  }
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color={showAddTask? 'red': 'green'} text="Add" onClick={handleClick} onShow={onShow} showAddTask={showAddTask}></Button>
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker'
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

// const headingStyle = {
//   color: 'olive', backgroundColor:'lightgreen'
// }
export default Header
