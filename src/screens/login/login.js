import React from 'react'
import { View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import md5 from 'md5'
import { Formik } from 'formik'
import * as Yup from 'yup'

import styles from './styles'

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
            login(values.email)
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
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.inputBlock}>
              <Input
                placeholder={translate('email')}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                returnKeyType="next"
                keyboardType="email-address"
                onSubmitEditing={() => inputPassword.focus()}
                errorStyle={styles.error}
                errorMessage={touched.email && errors.email && errors.email}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputBlock}>
              <Input
                secureTextEntry
                placeholder={translate('password')}
                value={values.password}
                onChangeText={handleChange('password')}
                autoCapitalize="none"
                onBlur={() => setFieldTouched('password')}
                errorStyle={styles.error}
                errorMessage={
                  touched.password && errors.password && errors.password
                }
                ref={input => {
                  inputPassword = input
                }}
              />
            </View>
          </View>
          <Button
            onPress={handleSubmit}
            title={translate('login')}
            disabled={!isValid}
            loading={isSubmitting}
          />
        </View>
      )}
    </Formik>
  )
}
