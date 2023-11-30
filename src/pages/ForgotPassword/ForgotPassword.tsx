import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { FormEvent } from 'react'
import {} from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { EMAIL } from '../../constants/inputType/inputType'
import { useAppDispatch } from '../../hooks/hooks'
import { useInput } from '../../hooks/useInput'
import { fetchForgotPassword } from '../../services/reducers/user'
import { loginPath, resetPasswordPath } from '../../utils/routerPath'
import styles from './ForgotPassword.module.css'

function validateEmail(mail: string) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
    ? true
    : false
}

const ForgotPassword = () => {
  const { values, handleChange } = useInput({
    [EMAIL]: 'soulrussianbear@gmail.com',
  })
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const requestOptions = {
      body: { email: values[EMAIL] },
    }

    validateEmail(values[EMAIL]) &&
      dispatch(fetchForgotPassword(requestOptions))
    navigate(resetPasswordPath)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Вход</h2>
        <form onSubmit={handleSumbit}>
          <div className={styles.emailWrapper}>
            <Input
              value={values[EMAIL]}
              onChange={handleChange}
              placeholder={'E-mail'}
              type={EMAIL}
              name={EMAIL}
            />
          </div>

          <div className={styles.buttonWrapper}>
            <Button htmlType="submit" type="primary" size="medium">
              Восстановить
            </Button>
          </div>
        </form>
        <div className={styles.loginBlock}>
          <span className={styles.linkHint}>Вспомнили пароль?</span>
          <Link
            to={loginPath}
            className={styles.link}
            state={{ from: location }}
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
