import React from 'react'
import { View, TextInput, Button, Text } from 'react-native'

import { withFormik } from 'formik'
import * as Yup from 'yup'

const Form = ({ values, setFieldValue, handleSubmit, errors, touched }) => (
  <View>
    {touched.email && errors.email && <Text>{errors.email}</Text>}
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      value={values.email}
      onChangeText={text => setFieldValue('email', text)}
    />

    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      value={values.password}
      onChangeText={text => setFieldValue('password', text)}
    />

    <Button onPress={handleSubmit} title="Login" />
  </View>
)

export default withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('Preencha o campo de e-mail'),
    password: Yup.string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('Preencha o campo de senha')
  }),

  handleSubmit: (values, { setSubmitting, setErrors }) => {
    console.log(values)
    setSubmitting(false)
    setErrors({ message: err.message })
  }
})(Form)
