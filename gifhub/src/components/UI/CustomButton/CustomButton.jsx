import React from 'react'
import styles from './CustomButton.module.css'

const CustomButtonSvg = (props) => {
  const { onClick, type, label, icon, alignment, extraClass } = props
  const combinedStyles = { ...extraClass }

  return (
    <div type={type} className={`${styles[alignment]} ${styles.wrapper}`}>
      {icon && (
        <button
          className={`${styles.buttonIcon} ${combinedStyles}`}
          style={extraClass}
          onClick={onClick}
        >
          {icon}
        </button>
      )}
      {label && (
        <button
          className={`${styles.buttonLabel} ${combinedStyles}`}
          onClick={onClick}
        >
          {label}
        </button>
      )}
    </div>
  )
}

CustomButtonSvg.defaultProps = {
  onClick: null,
  type: null,
  label: null,
  extraClass: null,
}

export default CustomButtonSvg
