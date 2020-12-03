
# React Native boilerplate

This is the basic boilerplate to start a project, it asumes the computer [is already configured](https://facebook.github.io/react-native/docs/getting-started), and you are using unix-like systems, otherwise [check react native instalation](https://facebook.github.io/react-native/docs/getting-started) and update package.json commands to adapt them to your OS

## Índex

[instalation and usage](#Instalation-and-usage)

[included libraries configuration](#Included-libraries-configurations)

[Common used Libraries](#Common-used-Libraries)

[other documentation](#Other-documentation)

---

---

## Instalation and usage

### Install dependencies

1. Clone the repo
2. run `yarn` or `npm i` to install dependencies
3. run `yarn pod` or `npm run pod` to install ios dependencies
4. configure env file if necesary

### first configuration

- user react-native-rename to change boilerplateApp to the proper app name
- rename boilerplateApp across the app to the proper app name
- Fill `README.MD` with correct info

## Included libraries

- [class-validator](https://github.com/typestack/class-validator) to manage validations
- [styled-components](https://www.styled-components.com/docs/) to apply styles
- [react-navigation](https://reactnavigation.org/) navigation
- [react-native-modal](https://github.com/react-native-community/react-native-modal) just a patch to default modal
- [react-native-screens](https://github.com/kmagiera/react-native-screens) memory optimization, disabled because bug with navigatio modal
- [react-native-config](https://github.com/luggit/react-native-config) 12 factor
- [react-i18next](https://react.i18next.com/) for translate texts
- [react-native-hooks](https://github.com/react-native-community/react-native-hooks) React Native APIs turned into React Hooks allowing you to access asynchronous APIs directly in your functional components

### libraries configurations

- configure .env enviroments (if ios is not properly configured): [managing-configuration-in-react-native](https://medium.com/differential/managing-configuration-in-react-native-cd2dfb5e6f7b)

## utils

- use [react-native-rename](https://github.com/junedomingo/react-native-rename) to change app name and/or id
- [react-native-version](https://github.com/stovmascript/react-native-version) is used to update ios and android version with `yarn version`
- [Husky](https://github.com/typicode/husky) is used to format and run test before commit and push respectively

## Common used Libraries

### included

Included libraries that are needed always (direct use or as a library dependency)

- [react-native-reanimated](https://github.com/kmagiera/react-native-reanimated) supossely better animated library, [docs](https://github.com/kmagiera/react-native-reanimated#reanimated-overview),[installation](https://github.com/kmagiera/react-native-reanimated#installation)
- [react-native-root-siblings](https://github.com/magicismight/react-native-root-siblings) Add sibling elements after your app root element. The created sibling elements are above the rest of your app elements. Usefull for global floating items [docs](https://github.com/magicismight/react-native-root-siblings#add-it-to-your-project) [installation](https://github.com/magicismight/react-native-root-siblings#add-it-to-your-project)

### recomended

Not included libraries that are usually needed or recommended but not always

- [react native tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native) for RN debugging (or just launch project with vscode)
- [Android ios emulator](https://marketplace.visualstudio.com/items?itemName=DiemasMichiels.emulate) easily launch android or ios emulator
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) see this readme properly on vscode
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) properly format documents
- [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)

### Community

These are from react-native-community and (may) extracted from core:

- [react-native-google-signin](https://github.com/react-native-community/react-native-google-signin) Sign in with google button, [docs](https://github.com/react-native-community/react-native-google-signin#public-api), [installation](https://github.com/react-native-community/react-native-google-signin#features)

- [react-native-linear-gradient](https://github.com/react-native-community/react-native-linear-gradient) set background grafient, [docs](https://github.com/react-native-community/react-native-linear-gradient#examples), [installation](https://github.com/react-native-community/react-native-linear-gradient#add-it-to-your-project)

- [react-native-maps](https://github.com/react-native-community/react-native-maps) google maps, [docs](https://github.com/react-native-community/react-native-maps#component-api), [installation](https://github.com/react-native-community/react-native-maps/blob/master/docs/installation.md)

- [react-native-webview](https://github.com/react-native-community/react-native-webview) a webView removed from core, [docs](https://github.com/react-native-community/react-native-webview#usage), [installation](https://github.com/react-native-community/react-native-webview/blob/master/docs/Getting-Started.md)

- [react-native-camera](https://github.com/react-native-community/react-native-camera) Camera component, [docs](https://react-native-community.github.io/react-native-camera/docs/rncamera), [installation](https://react-native-community.github.io/react-native-camera/docs/installation)

- [async-storage](https://github.com/react-native-community/async-storage) device default storange, [docs](https://github.com/react-native-community/async-storage#usage), [installation](https://github.com/react-native-community/async-storage#getting-started)

- [react-native-datetimepicker](https://github.com/react-native-community/react-native-datetimepicker) time picker not usefull because use native interface (not customizable), [docs](https://github.com/react-native-community/react-native-datetimepicker#basic-usage-with-state), [installation](https://github.com/react-native-community/react-native-datetimepicker#getting-started)

- [react-native-device-info](https://github.com/react-native-community/react-native-device-info) get information from the device, [docs](https://github.com/wix/react-native-calendars#usage), [installation](https://github.com/react-native-community/react-native-device-info#installation)

- [react-native-netinfo](https://github.com/react-native-community/react-native-netinfo) get network info and quality, [docs](https://github.com/react-native-community/react-native-netinfo#usage), [installation](https://github.com/react-native-community/react-native-netinfo#getting-started)

- [react-native-blur](https://github.com/react-native-community/react-native-blur) blur View, [docs](https://github.com/react-native-community/react-native-blur#blurview), [installation](https://github.com/react-native-community/react-native-blur#installation)

- [react-native-audio-toolkit](https://github.com/react-native-community/react-native-audio-toolkit) playback and record audio, [docs](https://github.com/react-native-community/react-native-audio-toolkit/blob/master/docs/API.md), [installation](https://github.com/react-native-community/react-native-audio-toolkit/blob/master/docs/SETUP.md)

- [react-native-image-picker](https://github.com/react-native-community/react-native-image-picker) use native UI to select a photo/video from the device library or directly from the camera, [docs](https://github.com/react-native-community/react-native-image-picker#usage), [installation](https://github.com/react-native-community/react-native-image-picker#getting-started)

- [react-native-svg](https://github.com/react-native-community/react-native-svg) SVG support to React Native, [docs](https://github.com/react-native-community/react-native-svg#usage), [installation](https://github.com/react-native-community/react-native-svg#installation)

- [react-native-tab-view](https://github.com/react-native-community/react-native-tab-view) tab navigator, to check if sove react navigation problem of nested navigations, [docs](https://github.com/react-native-community/react-native-tab-view#api-reference), [installation](https://github.com/react-native-community/react-native-tab-view#installation)
- [react-native-voice](https://github.com/react-native-community/react-native-voice) React Native Voice Recognition library for iOS and Android (Online and Offline Support) A speech-to-text library for React Native. [docs](https://github.com/react-native-community/react-native-voice#usage), [installation](https://github.com/react-native-community/react-native-voice#react-native-voice).

### Others

These are generally used react native libraries

- [react-native-calendars](https://github.com/wix/react-native-calendars) display different types of calendars, from wix, [docs](https://github.com/wix/react-native-calendars#usage), [instalation](https://github.com/wix/react-native-calendars#usage)

- [react-native-firebase](https://github.com/invertase/react-native-firebase) use firebase (analytics, push, crashlytics, perfomance monitoring), [docs](https://rnfirebase.io/docs/v5.x.x/getting-started), [installation](https://rnfirebase.io/docs/v5.x.x/installation/initial-setup)

- [react-native-simple-radio-button](https://github.com/moschan/react-native-simple-radio-button) just a radio button, to be removed by custom one [docs](https://github.com/moschan/react-native-simple-radio-button#getting-started)

- [react-native-touch-id](https://github.com/naoufal/react-native-touch-id) use touchID or face id [docs](https://github.com/naoufal/react-native-touch-id#example), [installation](https://github.com/naoufal/react-native-touch-id#install)

- [react-native-add-calendar-event](https://github.com/vonovak/react-native-add-calendar-event) add an event to the device calendar, [docs](https://github.com/vonovak/react-native-add-calendar-event#quick-example), [installation](https://github.com/vonovak/react-native-add-calendar-event#getting-started)

- [react-native-keychain](https://github.com/oblador/react-native-keychain) securely store credentials, [docs](https://github.com/oblador/react-native-keychain#usage), [installation](https://github.com/oblador/react-native-keychain#installation)

- [react-native-snap-carousel](https://github.com/archriss/react-native-snap-carousel) a carouser, buggy if infinite or custom pagination, [docs](https://github.com/archriss/react-native-snap-carousel#usage)

- [rn-fetch-blob](https://github.com/joltup/rn-fetch-blob) send/download documents, [docs](https://github.com/joltup/rn-fetch-blob/wiki), [installation](https://github.com/joltup/rn-fetch-blob#installation)

- [react-native-fs](https://github.com/itinance/react-native-fs) send/download documents, [docs](https://github.com/itinance/react-native-fs#API), [installation](https://github.com/itinance/react-native-fs#usage-ios)

- [react-native-pdf](https://github.com/wonday/react-native-pdf) pdf viewer, uses rn-fetch-blob , [docs](https://github.com/wonday/react-native-pdf#configuration), [installation](https://github.com/wonday/react-native-pdf#installation)

- [react-native-color-matrix-image-filters](https://github.com/iyegoroff/react-native-color-matrix-image-filters) Various color matrix based image filters, [docs](https://github.com/iyegoroff/react-native-color-matrix-image-filters#usage), [installation](https://github.com/iyegoroff/react-native-color-matrix-image-filters#getting-started)

- [react-native-keyboard-aware-scroll-view](https://github.com/APSL/react-native-keyboard-aware-scroll-view) ScrollView component that handles keyboard appearance and automatically scrolls to focused TextInput, [docs](https://github.com/APSL/react-native-keyboard-aware-scroll-view#usage)

- [react-native-sentry](https://github.com/getsentry/react-native-sentry) application monitoring platform [docs](https://docs.sentry.io/clients/react-native/#configure), [installation](https://docs.sentry.io/clients/react-native/#install)

- [react-native-photo-view](https://github.com/alwx/react-native-photo-view) custom Image view for React Native that allows to perform pinch-to-zoom on images, [docs](https://github.com/alwx/react-native-photo-view#usage), [installation](https://github.com/alwx/react-native-photo-view#automatic-installation)

- [react-native-sortable-list](https://github.com/gitim/react-native-sortable-list) a list that can alter the order with drag and drop, [docs](https://github.com/gitim/react-native-sortable-list#examples), [installation](https://github.com/gitim/react-native-sortable-list#installation)

- [react-native-image-filter-kit](https://github.com/iyegoroff/react-native-image-filter-kit) Various image filters for iOS & Android [docs](https://github.com/iyegoroff/react-native-image-filter-kit#reference), [installation](https://github.com/iyegoroff/react-native-image-filter-kit#installation)

- [react-native-view-shot](https://github.com/gre/react-native-view-shot) Capture a React Native view to an image [docs](https://github.com/gre/react-native-view-shot#recommended-high-level-api), [installation](https://github.com/gre/react-native-view-shot#install)

- [react-native-largelist](https://github.com/bolan9999/react-native-largelist) React-native-largelist is a very high performance large list component for React-Native. (iOS & Android) [docs](https://bolan9999.github.io/react-native-largelist/#/en/), [installation](https://bolan9999.github.io/react-native-largelist/#/en/V3/GettingStart)

- [recyclerlistview](https://github.com/Flipkart/recyclerlistview) This is a high performance listview for React Native and Web with support for complex layouts. JS only with no native dependencies, inspired by both RecyclerView on Android and UICollectionView on iOS. Suports web [docs](https://github.com/Flipkart/recyclerlistview#props), [installation](https://github.com/Flipkart/recyclerlistview#recyclerlistview)

- [react-native-email-link](https://github.com/GantMan/jail-monkey) 📭 Open an email client from React Native (for 'magic link' type functionality). [docs](https://github.com/tschoffelen/react-native-email-link#usage), [installation](https://github.com/tschoffelen/react-native-email-link#installation)

- [react-native-masked-text](https://www.npmjs.com/package/react-native-masked-text) simple masked text (normal text and input text) component for React-Native. [docs](https://www.npmjs.com/package/react-native-masked-text#usage-textinputmask), [installation](https://www.npmjs.com/package/react-native-masked-text#install)

- [jail-monkey](https://github.com/tschoffelen/react-native-email-link) A React Native library for identifying if a phone is rooted/jailbreaked or mocking locations [docs](https://github.com/GantMan/jail-monkey#use), [installation](https://github.com/react-native-webrtc/react-native-webrtc#installation)

- [react-native-webrtc](https://github.com/react-native-webrtc/react-native-webrtc) A WebRTC module for React Native. [docs](https://github.com/react-native-webrtc/react-native-webrtc#usage), [installation](https://github.com/GantMan/jail-monkey#install)

### from web

- [twilio](https://www.npmjs.com/package/twilio) chat.
  [docs](https://www.twilio.com/docs/chat/channels), [installation](https://www.npmjs.com/package/twilio#sample-usage)

- [base64-arraybuffer](https://www.npmjs.com/package/base64-arraybuffer) convert arraybufer to base64 and viceversa.
  [docs](https://github.com/niklasvh/base64-arraybuffer#api), [installation](https://github.com/niklasvh/base64-arraybuffer#api)

- [date-fns](https://date-fns.org/) work with Date.
  [docs](https://date-fns.org/docs/Getting-Started), [installation](https://github.com/date-fns/date-fns)

- [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js) phone number formatting and parsing library.
  [docs](https://www.npmjs.com/package/libphonenumber-js#use), [installation](https://www.npmjs.com/package/libphonenumber-js#install)

### general

these arent for react native (can be used by web projects)

## other documentation

- [upgrade-helper](https://react-native-community.github.io/upgrade-helper/) show what files to edit to upgrade react native

- [library directory](https://reactnative.directory/) find react native libraries

- [react-native-shadow-generator](https://ethercreative.github.io/react-native-shadow-generator/) generate shadow style equally on ios and android

---
