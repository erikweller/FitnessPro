import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SignupQuestionsScreen = () => {
  const [gender, setGender] = useState('');
  const [birthYear, setBirthYear] = useState(2000);
  const [weight, setWeight] = useState('');
  const [medicalConditions, setMedicalConditions] = useState([]);
  const [activityLevel, setActivityLevel] = useState('');
  const [fitnessGoals, setFitnessGoals] = useState([]);
  const [workoutDays, setWorkoutDays] = useState('');
  const [workoutDuration, setWorkoutDuration] = useState('');

  const currentYear = new Date().getFullYear();
  const yearRange = Array.from({ length: currentYear - 1919 }, (_, i) => currentYear - i);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Signup Questionnaire</Text>

      <Text style={styles.label}>1. Are you male or female?</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>

      <Text style={styles.label}>2. What year were you born?</Text>
      <Picker
        selectedValue={birthYear}
        onValueChange={(itemValue) => setBirthYear(itemValue)}
        style={styles.picker}
      >
        {yearRange.map((year) => (
          <Picker.Item key={year} label={year.toString()} value={year} />
        ))}
      </Picker>

      {/* Add more questions here */}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  picker: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default SignupQuestionsScreen;
