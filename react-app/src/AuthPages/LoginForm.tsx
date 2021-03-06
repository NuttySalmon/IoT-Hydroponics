import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Auth } from 'aws-amplify'
import { Link } from 'react-router-dom'
import TextField from '../common/components/TextField'
import style from './scss/login.module.scss'
import { WrappedFormProps } from './AuthFormWrapper'
// import UserContext from '../UserAuth/UserContext'

// Initializing error message variables. Used for handleError switch statements.
const userNotFoundException = 'UserNotFoundException'
const notAuthorizedException = 'NotAuthorizedException'
const userNotConfirmedException = 'UserNotConfirmedException'

const checkValid = (fieldValue: string) => Boolean(fieldValue) // Checks whether the email or password fields are empty.

const LoginForm = ({
  changeAccVerify,
  changeEmail,
  email,
}: WrappedFormProps) => {
  const [password, changePassword] = useState('') // Takes in the user's password.
  const [err, changeErr] = useState('') // A general error handler for network related issues.
  const [emailValid, changeEmailValid] = useState(true) // Checks if user's email is valid. If invalid, error message will be shown.
  const [passValid, changePassValid] = useState(true) // Checks if the user's password is valid. If invalid, error message will be shown.
  const [emailErrMessage, changeEmailErrMessage] = useState('') // Email error handler field.
  const [passErrMessage, changePassErrMessage] = useState('') // Password error handler field.

  // Error handling function that takes in error as a parameter from the awsSignIn function.
  const handleError = (error: { name: string }) => {
    switch (error.name) {
      case userNotFoundException: // email not in system
        changeEmailValid(false)
        changeEmailErrMessage('This email does not exist. ')
        break
      case notAuthorizedException: // wrong password
        changePassValid(false)
        changePassErrMessage('Email and password do not match. ')
        break
      case userNotConfirmedException: // verification needed
        changeAccVerify(true)
        break
      default:
        changeErr('An error occured. Please try again.')
    }
  }

  const awsSignIn = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    changeAccVerify(false) // Reset user's state.
    changeErr('') // Reset general error messages.
    const emailValidTemp = checkValid(email) // A helper temporary constant to change emailValid state.
    const passwordValidTemp = checkValid(password) // A helper temporary constant to change passValid state.
    changeEmailValid(emailValidTemp)
    changePassValid(passwordValidTemp)
    changeEmailErrMessage('Email field cannot be empty.')
    changePassErrMessage('Password field cannot be empty. ')

    // An if statement that either authenticates the user or displays error messages.
    if (emailValidTemp && passwordValidTemp) {
      try {
        const user = await Auth.signIn(email, password) // Use amplify to authenticate the user.
        console.log(user)
      } catch (error) {
        console.log(error)
        handleError(error) //  Display messages according to the error caught
      }
    }
  }

  return (
    <Form className="user-form" onSubmit={awsSignIn}>
      <TextField
        label="Email"
        value={email}
        onChange={changeEmail}
        type="text"
        hint={emailErrMessage}
        showHint={!emailValid}
      />
      <div style={{ marginTop: '1.5em' }}>
        <TextField
          label="Password"
          value={password}
          onChange={changePassword}
          type="password"
          hint={passErrMessage}
          showHint={!passValid}
        />
      </div>
      <Row>
        <Col>
          <div className={style.warning}>{err}</div>
        </Col>
      </Row>
      <Row>
        <Col className={style.formBtn}>
          <Button variant="short" type="submit">
            Login
          </Button>
        </Col>
      </Row>
      <div className={style.formLink}>
        <Row>
          <Col>
            <Link to="/signup">Don&apos;t have an account? </Link>
          </Col>
        </Row>
        <Row className="mt-1">
          <Col>
            <Link to="/forget-password">Forget password</Link>
          </Col>
        </Row>
      </div>
    </Form>
  )
}

export default LoginForm
