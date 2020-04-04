import React, { useState } from 'react'
import t from 'prop-types'
import { View, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'
import styled from 'styled-components'
import { translate } from '~/locales'

import { withFormik } from 'formik'
import * as Yup from 'yup'

const Form = ({ values, setFieldValue, handleSubmit, errors, touched }) => {
  const [isLoading] = useState(false)
  let inputPassword = null

  return (
    <FormContainer>
      <InputContainer>
        <InputBlock>
          <Input
            placeholder={translate('email')}
            value={values.email}
            onChangeText={text => setFieldValue('email', text)}
            returnKeyType="next"
            keyboardType="email-address"
            onSubmitEditing={() => inputPassword.focus()}
            errorStyle={{ color: '#f00' }}
            errorMessage={touched.email && errors.email && errors.email}
          />
        </InputBlock>
        <InputBlock>
          <Input
            placeholder={translate('password')}
            value={values.password}
            onChangeText={text => setFieldValue('password', text)}
            errorStyle={{ color: '#f00' }}
            errorMessage={
              touched.password && errors.password && errors.password
            }
            ref={input => {
              inputPassword = input
            }}
          />
        </InputBlock>
      </InputContainer>
      <Button onPress={handleSubmit} title="Login" loading={isLoading} />
    </FormContainer>
  )
}

const FormContainer = styled(View)`
  padding: 0 10px 20px;
  margin: 10px 10px 10px;
  border-radius: 10px;
`

const InputContainer = styled(View)`
  margin: 20px 0;
  background-color: white;
  padding: 30px 25px;
  border-radius: 5px;
`

const InputBlock = styled(View)`
  margin-bottom: 20px;
`

Form.propTypes = {
  values: t.object.isRequired,
  setFieldValue: t.func.isRequired,
  handleSubmit: t.func.isRequired,
  errors: t.object,
  touched: t.object
}

export default withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email(translate('invalidEmail'))
      .required(translate('emailRequired')),
    password: Yup.string()
      .min(6, translate('invalidPassword'))
      .required(translate('passwordRequired'))
  }),

  handleSubmit: (values, { setSubmitting, setErrors }) => {
    setSubmitting(false)
    if (err) setErrors({ message: err.message })
  }
})(Form)
