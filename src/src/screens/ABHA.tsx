import React, { useState } from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import AppwriteService from '../appwrite/service';
import DocumentPicker from 'react-native-document-picker';

const validationSchema = yup.object().shape({
  First_Name: yup.string().required('First Name is required'),
  Last_Name: yup.string().required('Last Name is required'),
  Symptoms: yup.string().required('Write some Symptoms you are experiencing'),
  Age: yup.number().required('Age is required').positive('Age must be a positive number'),
  Email: yup.string().required('Email is required')
});

const ABHA: React.FC = () => {
  
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const handlePickup = () => {

    try {

      const res = DocumentPicker.pickSingle({
        type:[DocumentPicker.types.allFiles]
      });      
    } catch (error) {
      console.log("error, picking up");
      return false;
      
    }
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ Last_Name: '', First_Name: '', Age: '', Symptoms: '',Email: ''}}
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
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('First_Name')}
              onBlur={handleBlur('First_Name')}
              value={values.First_Name}
              placeholder="First Name"
              placeholderTextColor={"gray"}
            />
            {errors.First_Name && touched.First_Name && <Text style={styles.error}>{errors.First_Name}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('Last_Name')}
              onBlur={handleBlur('Last_Name')}
              value={values.Last_Name}
              placeholder="Last Name"
              placeholderTextColor={"gray"}
            />
            {errors.Last_Name && touched.Last_Name && <Text style={styles.error}>{errors.Last_Name}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('Email')}
              onBlur={handleBlur('Email')}
              value={values.Email}
              placeholder="Email Id"
              placeholderTextColor={"gray"}
            />
            {errors.Email && touched.Email && <Text style={styles.error}>{errors.Email}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('Age')}
              onBlur={handleBlur('Age')}
              value={values.Age}
              placeholder="Age"
              placeholderTextColor={"gray"}
              keyboardType="numeric"
            />
            {errors.Age && touched.Age && <Text style={styles.error}>{errors.Age}</Text>}

            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              onChangeText={handleChange('Symptoms')}
              onBlur={handleBlur('Symptoms')}
              value={values.Symptoms}
              placeholder="Symptoms"
              placeholderTextColor={"gray"}
            />
            {errors.Symptoms && touched.Symptoms && <Text style={styles.error}>{errors.Symptoms}</Text>}


            <TouchableOpacity style= {styles.button} onPress={handlePickup} disabled={submitting}>
              <Text style= {styles.buttonText}>
                Pick PDF File
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() =>handleSubmit()} disabled={submitting}>
              <Text style={styles.buttonText}>{submitting ? "Submitting..." : "Submit"}</Text>
            </TouchableOpacity> 
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000000'
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // Align text to top in multiline input
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedFile:{

  },
});

export default ABHA;















// const handlePickupFile = async () => {
//   try {
//     const res = await DocumentPicker.pick({
//       type: [DocumentPicker.types.pdf],
//     });
    
//     const fileUri = res[0].uri; // File URI
//     const base64Data = await RNFS.readFile(fileUri, 'base64'); // Read file as base64

//     console.log('base64', base64Data);

//     setSelectedFile([res[0]]); // Set selected file
//   } catch (err) {
//     if (DocumentPicker.isCancel(err)) {
//       // User cancelled the picker, do nothing
//     } else {
//       Alert.alert('Error', 'Could not pick file. Please try again.');
//     }
//   }
// };



