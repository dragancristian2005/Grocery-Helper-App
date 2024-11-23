import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from "./src/navigation";

export default function App() {
  return <Navigation></Navigation>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#005BAA',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
