# Chat App

This is a simple chat app built for mobile devices made using React Native. It provides a chat interface for users with options to share images and a user's location.

## Using This App

### Setup
Ensure that your computer has Expo CLI installed. You can run the following command to do so:

`npm install -g expo-cli`

Afterwards, install Expo Go on your mobile device. Create an Expo Go account if you do not have one. Through the terminal, log in with your Expo Go account by running the `expo login` command. Again in the terminal, navigate to the root folder of this repository after you have cloned it. Then, ensure that the repository has the necessary dependencies installed. Project dependencies have been list at the end of this README document.

If you prefer to run the app on an emulator instead, you can install Android Studio to select your own platform for emulation. Setting up Android Studio is relatively straightforward; you can generally keep pressing 'Next' throughout the installation process. Once you get to the point where you're asked to 'Select Components to Install,' make sure 'Android Virtual Device' is selected. Press finish to install your selected components. On the welcome screen, press the 'More Actions' dropdown and select 'SDK Manager.' From here, you can see which platforms are installed by default, or select a new platform to install. Make sure that whichever platform you use, it has a corresponding Google Play System Image installed that corresponds to your OS. Click on 'Apply,' then click on the 'SDK Tools' tab. Double check that 'Android SDK Build Tools' is selected; this will be needed to build the app in your emulator.

This next step depends on your device; if you are using an AMD CPU, you need to install and enable 'Android Emulator Hypervisor Driver for AMD processors (installer)'; if you are using an Intel CPU, you need to install and enable 'Intel x86 Emulator Accelerator (HAXM installer)'; if you are using a Mac, you'll need to add the location of the Android SDK to your PATH.

Next, coming back to the welcome screen, click on 'More Actions' again and then on 'Virtual Device Manager.' Click 'Create Virtual Device' to select which virtual device you'll be using for your testing. Pick a device that has the Google Play Store logo next to it and isn't too old. Clicking next will bring you to the System Image interface; select a System Image that has the Google Play label as well as a matching API level to the Google Play System Image you downloaded earlier. Pressing 'Next' brings you to the final specs of the Virtual Device you are creating. Click on 'Show Advanced Settings' and change 'Internal Storage' and 'SD Card' to 4096; this makes sure you have enough space to install this app. Click 'Finish.' You'll see the device you created in the Device Manager. From there, you can press the Play button to begin using the emulator.

A crucial step in ensuring proper functionality will be setting up the Google Firebase database. Head to firebase.google.com and sign in with a Google account. Click the 'Get Started' button once you have done so. Follow the steps displayed to create a Firebase project (it is recommended you turn off Google analytics to accelerate the process). Once you are taken to the Firebase console, on the left side of the screen, click on 'Build' and then on 'Firestore Database.' Follow the steps displayed to create a database. In the 'select location' step, make sure to pick the location that's closest to you. Afterwards, you should be automatically taken to your new database. Click on the 'Rules' tab and change `allow read, write: if false;` to `allow read, write: if true;`. This will allow you to read and write messages to and from the database. Make sure to publish your change. Finally, back in the Firebase console, press on the gear icon to bring up the project settings. Under the 'Your Apps' section, click on the Firestore For Web icon (it will be displayed as the </> icon.) Follow the steps to register the app, after which it will generate some configuration code for you. This configuration code will be used in App.js; replace the config code from this repository with the config code that you just generated. This will allow you to view and maintain your own unique database for this app.

Once you make sure your device and your computer are on the same local wifi network, you can run the following command to begin using this app:

`npx expo start`

### Usage
Upon loading the app, the user may enter their name. This name will be displayed while chatting. They can also select a color to use for the main background color of the chat interface. After selecting a name and color, the user may press the "Start Chatting" button to be taken to the chat interface. In the chat interface, users are able to send and receive messages to and from other users. Additional functions are available by pressing the '+' button on the left side of the text input. From there, users can send photos from their photo library, take and send a photo directly to the chat, or share their location. Should the app detect that the user's device is no longer connected to a network, the user will no longer be able to send messages or access these additional features, and the app will display any cached messages.

## Dependencies
* Expo
* Expo Image Picker
* Expo Location
* Gifted Chat
* AsyncStorage
* Firebase
* React
* React Native
* React Native Maps
