import React from 'react'
import { View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import t from 'prop-types'
import md5 from 'md5'
import { Formik } from 'formik'
import * as Yup from 'yup'

import styled from 'styled-components'

import client from '~/client'
import { useAuth } from '~/hooks'
import { translate } from '~/locales'
import { API } from '~/routes'

export default function Form() {
  const { login } = useAuth()
  let inputPassword = null

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, actions) => {
        client
          .post(API.LOGIN)
          .then(() => {
            login(true, values.email)
            actions.setSubmitting(false)
          })
          .catch(e => {
            alert(e.message)
            actions.setSubmitting(false)
          })
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email(translate('invalidEmail'))
          .required(translate('emailRequired')),
        password: Yup.string()
          .min(6, translate('invalidPassword'))
          .required(translate('passwordRequired'))
      })}
    >
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
        isSubmitting
      }) => (
        <FormContainer>
          <InputContainer>
            <InputBlock>
              <Input
                placeholder={translate('email')}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                returnKeyType="next"
                keyboardType="email-address"
                onSubmitEditing={() => inputPassword.focus()}
                errorStyle={{ color: '#f00' }}
                errorMessage={touched.email && errors.email && errors.email}
              />
            </InputBlock>
            <InputBlock>
              <Input
                secureTextEntry
                placeholder={translate('password')}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
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
          <Button
            onPress={handleSubmit}
            title={translate('login')}
            disabled={!isValid}
            loading={isSubmitting}
          />
        </FormContainer>
      )}
    </Formik>
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
