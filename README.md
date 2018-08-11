# WAVETROPHY App

This is the official application for the WAVETROPHY Rally. The WAVETROPHY Rally participates every year in different countries in europe.

# Installation

To setup the application you need to install [Ionic](https://ionicframework.com/getting-started) globally

```bash
$ npm install -g ionic@3.20
```

After that you have to install all dependencies

```bash
$ npm install
```

To Run the application in the browser with livereload enabled you need to run

```bash
$ ionic serve -l
```

# Building

To build the application for Android, make sure that the latest [Android Studio](https://developer.android.com/studio/) and [JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)is installed

## Production build Android

By executing following command you build the app for a release in the playstore

```bash
$ ionic cordova build android --prod --release
```

After that you have to generate (only once) a key that you use to sign the APK.
If you already generated such a key, you can skip this step.
The Keytool comes with the default JDK.

```bash
$ keytool -genkey -v -keystore wavetrophy-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias wavetrophy
```

Now you can sign the APK with your key. For that you need the Jarsigner Tool that also comes out of the box with the latest JDK.

```bash
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore wavetrophy-release-key.jks /path/to/app-release-unsigned.apk wavetrophy
```

This signs the APK in place. Finally, we need to run the zip align tool to optimize the APK. The zipalign tool can be found in /path/to/Android/sdk/build-tools/VERSION/zipalign. 
For example, on OS X with Android Studio installed, zipalign is in ~/Library/Android/sdk/build-tools/VERSION/zipalign:

```bash
$ /path/to/zipalign -v 4 /path/to/app-release-unsigned.apk Wavetrohpy.apk
```

To verify that your APK is signed run apksigner. The apksigner can be also found in the same path as the zipalign tool:

```bash
$ apksigner verify Wavetrophy.apk
```

All done. Now you can upload the APK to the playstore.

### Commands

Debugging:
```
$ ionic cordova run android -l --target=f70a8979
```
