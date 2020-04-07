# Uber QRCode!

## What's inside it?

- [React Native](https://reactnative.dev/) - Create native apps for Android and iOS using React
- [React Native Elements](https://react-native-elements.github.io/react-native-elements/) - Cross Platform React Native UI Toolkit
- [Formik](https://github.com/jaredpalmer/formik) - Build forms in React, without the tears
- [I18n.js](https://github.com/fnando/i18n-js) - A small library to provide the I18n translations on the Javascript
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) - Perfect for buttons, logos and nav/tab bars. Easy to extend, style and integrate into your project
- [React Navigation](https://reactnavigation.org/) - Routing and navigation for your React Native apps
- [React Native Permissions](https://github.com/react-native-community/react-native-permissions) - An unified permissions API for React Native on iOS and Android
- [react-native-qrcode-scanner](https://github.com/moaazsidat/react-native-qrcode-scanner) - A QR code scanner component for React Native
- [react-native-maps](https://github.com/react-native-community/react-native-maps) - React Native Mapview component for iOS + Android
- [react-native-flash-message](https://github.com/lucasferreira/react-native-flash-message) - A React Native module to help you with easily and highly customizable flashbars, top notifications or alerts

## Up and running

- Clone this repository: `git clone git@github.com:rafaelsevla/uber-qrcode.git`
- Install dependencies: `yarn install`

#### iOS

- Install iOS dependencies: `cd ios && pod install && cd ..`
- Run `npx react-native run-ios` or `npx react-native run-ios --simulator="iPhone 8"` to choice iPhone version
- On simulator, change location on `Debug -> Location -> Custom Location...`

#### Android

- Put your Google Maps Api Key [here](https://github.com/rafaelsevla/uber-qrcode/blob/master/android/app/src/main/AndroidManifest.xml#L18)
- Run `npx react-native run-android`
- On simulator, to change location click on the ellipsis (...) in the toolbar

## License

- [MIT](https://github.com/rafaelsevla/uber-qrcode/blob/master/LICENSE) © [Rafael Costa](https://github.com/rafaelsevla)
