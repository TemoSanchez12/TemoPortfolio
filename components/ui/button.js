const Button = ({ children }) => {
  return (
    <div className='button__module'>
      <button className='button__button'>{children}</button>
    </div>
  )
}

export default Button
