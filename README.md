## Get Started

This project is initiated using Native Starter Kit v6.1.0.

This React Native project is a demo app for [otokaca.com](https://otokaca.com)

### 1. System Requirements

* Globally installed [node](https://nodejs.org/en/)

* Globally installed [react-native CLI](https://facebook.github.io/react-native/docs/getting-started.html)

* Install [CodePush](https://microsoft.github.io/code-push/) globally and get keys for your app.


### 2. Installation

On the command prompt run the following commands

```sh
$ git clone https://github.com/milkers/otokaca.git

$ cd otokaca/

$ npm install
```

```sh
$ react-native link
```

[CodePush](https://github.com/Microsoft/react-native-code-push) plugin installation and key deployment.


### 3. Simulate for iOS

**Method One**

*	Open the project in XCode from **ios/otokaca.xcodeproj**

*	Hit the play button.


**Method Two**

*	Run the following command in your terminal

```sh
$ react-native run-ios
```

### 4. Simulate for Android

*	Make sure you have an **Android emulator** installed and running.

*	Run the following command in your terminal

```sh
$ react-native run-android
```

Note: If you are building Native Starter Kit for first time on your system, please follow Method One to simulate on iOS. (To link the CodePush plugin through Xcode for iOS)
