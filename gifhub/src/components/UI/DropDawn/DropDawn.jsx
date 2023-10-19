import React, { useEffect, useRef, useState } from 'react'
import styles from './DropDawn.module.css'
import CustomButton from '../CustomButton/CustomButton'
import uniqid from 'uniqid'

const DropDawn = (props) => {
  const { icon, list } = props
  const dropdownRef = useRef(null)
  const [isDropDawnActive, setIsDropDawnActive] = useState(false)

  useEffect(() => {
    const closeDropDawn = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropDawnActive(false)
      }
    }

    document.addEventListener('click', closeDropDawn)
    return () => {
      document.removeEventListener('click', closeDropDawn)
    }
  }, [])

  const handleDropDawn = () => {
    setIsDropDawnActive(!isDropDawnActive)
  }

  return (
    <div className={styles.dropDawn} ref={dropdownRef}>
      <div className={styles.dropDawnButton}>
        <CustomButton
          type={'button'}
          icon={icon}
          isScalabale={false}
          onClick={handleDropDawn}
        />
      </div>
      {isDropDawnActive && (
        <ul className={styles.dropDawnContent}>
          {list.map((item) => {
            return (
              <li
                className={styles.dropDawnItem}
                key={uniqid()}
                onClick={item.onClick}
              >
                <button>{item.title}</button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default DropDawn
