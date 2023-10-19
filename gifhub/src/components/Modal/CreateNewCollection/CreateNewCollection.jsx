import React from 'react'
import CustomInput from '../../UI/CustomInput/CustomInput'
import styles from './CreateNewCollection.module.css'
import CustomButton from '../../UI/CustomButton/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../../services/reducers/user'
import useForm from '../../../hooks/useForm'
import { CREATE_COLLECTION } from '../../../constants/post'
import { useNavigate } from 'react-router-dom'

const CreateNewCollection = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { values, handleChange } = useForm({
    [CREATE_COLLECTION]: '',
  })

  const handleCreatePost = () => {
    values[CREATE_COLLECTION].length > 0 &&
      dispatch(createPost({ data: values[CREATE_COLLECTION] }))
    navigate(-1)
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Create a new gif collection</h2>
      <CustomInput
        values={values[CREATE_COLLECTION]}
        onChange={handleChange}
        placeholder={'Сollection name'}
        name={CREATE_COLLECTION}
      />
      <CustomButton
        label={'Create'}
        alignment={'center'}
        onClick={handleCreatePost}
      />
    </div>
  )
}

export default CreateNewCollection
