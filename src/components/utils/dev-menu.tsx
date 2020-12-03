import React from 'react';
import {
  // Button, Picker, ScrollView, StyleSheet, Text, TouchableOpacity,
  View,
} from 'react-native';
// import VersionNumber from 'react-native-version-number';

// import Config, { apiUrl, isDev, isPro, isStage, printLog, webUrl } from 'src/utils/config';
// import { deviceSize } from 'src/utils/device';
// import Navigator, { routeNames } from 'src/utils/navigation';

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     zIndex: 9999,
//   },
//   inactive: {
//     justifyContent: 'center',
//     height: 20,
//     width: 20,
//     bottom: 20,
//     left: 20,
//     backgroundColor: '#f008',
//     borderRadius: 50,
//   },
//   active: {
//     height: deviceSize.height - 20,
//     width: deviceSize.width - 20,
//     backgroundColor: '#eeee',
//     bottom: 10,
//     left: 10,
//     padding: 30,
//   },
//   D: {
//     color: 'white',
//     textAlign: 'center',
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   footer: {
//     color: '#040404',
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
//   button: {
//     marginTop: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     backgroundColor: 'white',
//   },
//   iconList: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     paddingVertical: 10,
//   },
//   iconBox: {
//     paddingHorizontal: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#9999',
//   },
// });

// const DevMenu = () => {
//   const [isHidden, setHidden] = useState(true);
//   const [selected, setSelected] = useState(0);
//   const [navRoute, setNavRoute] = useState('');
//   // TODO set touch listener to drag and update position
//   if (!__DEV__) return null;

//   const envVars = { isDev, isStage, isPro, apiUrl, webUrl, printLog };
//   // const images = require('src/assets/icon');
//   const buttonColor = '#777';

//   if (isHidden) {
//     return (
//       <TouchableOpacity onPress={() => setHidden(false)} activeOpacity={1} style={[styles.container, styles.inactive]}>
//         <Text style={styles.D}>D</Text>
//       </TouchableOpacity>
//     );
//   }
//   return (
//     <View style={[styles.container, styles.active]}>
//       <Text>Menú de desarrollo</Text>
//       {/* tslint:disable */}
//       {(global as any).HermesInternal == null ? null : (
//         <View style={styles.engine}>
//           <Text style={styles.footer}>Engine: Hermes</Text>
//         </View>
//       )}
//       {/* tslint:enable */}
//       <View style={styles.button}>
//         <Button color={buttonColor} title="  X  " onPress={() => setHidden(true)} />
//         <View style={styles.button} />
//         <Button color={buttonColor} title="go back" onPress={() => Navigator.goBack()} />
//         <View style={styles.button} />
//         <Button
//           color={buttonColor}
//           title="go Dummy"
//           onPress={() => {
//             Navigator.navigate('Dummy');
//             setHidden(true);
//           }}
//         />
//       </View>
//       <View style={styles.button} />
//       <Button
//         color={buttonColor}
//         title={`${selected === 1 ? 'hide' : 'show'} navigate picker`}
//         onPress={() => setSelected(selected === 1 ? 0 : 1)}
//       />
//       <View style={styles.button} />
//       <Button
//         color={buttonColor}
//         title={`${selected === 2 ? 'hide' : 'show'} congif vars`}
//         onPress={() => setSelected(selected === 2 ? 0 : 2)}
//       />
//       <View style={styles.button} />
//       <Button
//         color={buttonColor}
//         title={`${selected === 3 ? 'hide' : 'show'} env vars`}
//         onPress={() => setSelected(selected === 3 ? 0 : 3)}
//       />

//       <ScrollView contentContainerStyle={styles.button}>
//         {selected === 1 && !!navRoute && (
//           <Button
//             color={buttonColor}
//             title={`navigate${navRoute ? ` to ${navRoute}` : ''}`}
//             onPress={() => {
//               Navigator.navigate(navRoute);
//               setSelected(0);
//             }}
//           />
//         )}
//         {selected === 1 && (
//           <Picker selectedValue={navRoute} style={styles.picker} onValueChange={itemValue => setNavRoute(itemValue)}>
//             <Picker.Item label="none" value="" />

//             {Object.keys(routeNames).map(i => (
//               <Picker.Item label={i} value={i} key={i} />
//             ))}
//           </Picker>
//         )}
//         {selected === 2 && <Text selectable>Config{Object.keys(Config).map(k => `
// ${k}=${Config[k]}`)} </Text>}
//         {selected === 3 && <Text>Env{Object.keys(envVars).map(k => `
// ${k}=${envVars[k]}`)} </Text>}
//         <Text>{VersionNumber.bundleIdentifier}</Text>
//         <Text>{`${VersionNumber.appVersion}(${VersionNumber.buildVersion})`}</Text>
//       </ScrollView>
//     </View>
//   );
// };

// export default DevMenu;
// eslint-disable-next-line react/display-name
export default () => <View />;
