import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import { navigationRef } from '../utils/NavigationUtil';
// import MainNavigator from './MainNavigator';
// import {navigationRef} from '../utils/NavigationUtil';

// const config = {
//   screens: {
//     UserProfileScreen: '/user/:username',
//     ReelScrollScreen: '/reel/:id',
//   },
// };

// const linking = {
//   prefixes: ['reelzzz://', 'https://reelzzz.com', 'http://localhost:3000'],
//   config,
// };

// const Navigation: React.FC = () => {
//   return (
//     <NavigationContainer linking={linking} ref={navigationRef}>
//       <MainNavigator />6
//     </NavigationContainer>
//   );
// };

const Navigation: React.FC = () => {
  return (
    <NavigationContainer ref = {navigationRef}>
      <MainNavigator/>
    </NavigationContainer>
  )
}

export default Navigation
