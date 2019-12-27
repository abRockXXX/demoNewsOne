import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux'
import Home from './src/home'
import Detail from './src/detail'
import WebViewCom from './src/components/webView'


export default function App() {
  return (
    <Router>
      <Scene key="root" hideNavBar >
        <Scene key="auth" hideNavBar gesturesEnabled={false}>
          <Scene key="home" component={Home} initial />
          <Scene key="detail" component={Detail} />
          <Scene key="wvcom" component={WebViewCom} />
          {/* <Scene key="sosCreate" component={CreateSosScreen} />  */}
        </Scene>
      </Scene>
    </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
