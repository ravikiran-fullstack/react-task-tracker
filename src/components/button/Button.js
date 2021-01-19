import Header from "../header/Header"

const Button = ({color, text, onClick, onShow, showAddTask}) => {
  return (
    <div>
      <button className="btn" style={{backgroundColor: color}} onDoubleClick={onClick} onClick={onShow}>{showAddTask? 'Hide': 'Add'}</button>
    </div>
  )
}

Button.defaultProps = {
  color: 'black'
}
export default Button
