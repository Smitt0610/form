import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';

const employeeSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  position: yup.string().required('Position is required'),
  phone: yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required('Phone is required'),
  hireDate: yup.string().required('Hire date is required'),
});

export default function EmployeeForm({ navigation }) {
  const handleSubmitForm = async (values) => {
    try {
      const response = await fetch("https://form-qkr3.onrender.com/api/employees/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert("✅ Employee added successfully");
        navigation.navigate("SignIn");
      } else {
        alert("❌ Failed to add employee");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Employee Details</Text>
        <Formik
          initialValues={{ name: '', email: '', position: '', phone: '', hireDate: '' }}
          validationSchema={employeeSchema}
          onSubmit={handleSubmitForm}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <View style={styles.inputContainer}>
                <MaterialIcons name="person" size={24} color="#2196F3" />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#999"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
              </View>
              {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

              <View style={styles.inputContainer}>
                <Feather name="mail" size={24} color="#2196F3" />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </View>
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <View style={styles.inputContainer}>
                <FontAwesome name="suitcase" size={24} color="#2196F3" />
                <TextInput
                  style={styles.input}
                  placeholder="Position"
                  placeholderTextColor="#999"
                  onChangeText={handleChange('position')}
                  onBlur={handleBlur('position')}
                  value={values.position}
                />
              </View>
              {touched.position && errors.position && <Text style={styles.error}>{errors.position}</Text>}

              <View style={styles.inputContainer}>
                <Feather name="phone" size={24} color="#2196F3" />
                <TextInput
                  style={styles.input}
                  placeholder="Phone"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />
              </View>
              {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

              <View style={styles.inputContainer}>
                <Feather name="calendar" size={24} color="#2196F3" />
                <TextInput
                  style={styles.input}
                  placeholder="Hire Date (YYYY-MM-DD)"
                  placeholderTextColor="#999"
                  onChangeText={handleChange('hireDate')}
                  onBlur={handleBlur('hireDate')}
                  value={values.hireDate}
                />
              </View>
              {touched.hireDate && errors.hireDate && <Text style={styles.error}>{errors.hireDate}</Text>}

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit Employee Data</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  error: {
    color: '#ff4444',
    fontSize: 12,
    marginLeft: 15,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
