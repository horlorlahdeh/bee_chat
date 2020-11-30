import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import 'core-js';

AppRegistry.registerComponent(appName, () => App);
