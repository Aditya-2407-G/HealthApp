import React, { useState } from 'react';
import { View, TextInput, Text, Alert, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import AppwriteService from '../appwrite/service';
import { Button } from '@rneui/themed';

const validationSchema = yup.object().shape({
  First_Name: yup.string().required('First Name is required'),
  Last_Name: yup.string().required('Last Name is required'),
  Age: yup.number().required('Age is required').positive('Age must be a positive number'),
});

const ABHA: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);

  return (
    <View>
      <Formik
        initialValues={{ Last_Name: '', First_Name: '', Age: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const appwriteService = new AppwriteService();
            setSubmitting(true); // Start submitting
            await appwriteService.createRecords(values);
            resetForm(); // Reset the form after successful submission
            Alert.alert('Success', 'Form submitted successfully!');
          } catch (error) {
            console.error('Error submitting form:', error);
            Alert.alert('Error', 'An error occurred while submitting the form. Please try again later.');
          } finally {
            setSubmitting(false); // Finish submitting
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              onChangeText={handleChange('First_Name')}
              onBlur={handleBlur('First_Name')}
              value={values.First_Name}
              placeholder="First Name"
            />
            {errors.First_Name && touched.First_Name && <Text>{errors.First_Name}</Text>}

            <TextInput
              onChangeText={handleChange('Last_Name')}
              onBlur={handleBlur('Last_Name')}
              value={values.Last_Name}
              placeholder="Last Name"
            />
            {errors.Last_Name && touched.Last_Name && <Text>{errors.Last_Name}</Text>}

            <TextInput
              onChangeText={handleChange('Age')}
              onBlur={handleBlur('Age')}
              value={values.Age}
              placeholder="Age"
              keyboardType="numeric"
            />
            {errors.Age && touched.Age && <Text>{errors.Age}</Text>}

            <TouchableOpacity onPress={()=>handleSubmit()} disabled={submitting}>
              <Text>{submitting ? "Submitting..." : "Submit"}</Text>
            </TouchableOpacity> 

        

          </View>
        )}
      </Formik>
    </View>
  );
};

export default ABHA;
