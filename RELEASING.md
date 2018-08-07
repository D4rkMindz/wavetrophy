Version in config.xml anpassen
ionic cordova build android --prod --release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore D:\dev\Wavetrophy\App\Android\Keys\wavetrophy-release-key-android.jks C:\xampp\htdocs\wavetrophy\platforms\android\build\outputs\apk\android-release-unsigned.apk wavetrophy
"C:\Program Files (x86)\Android\android-sdk\build-tools\26.0.1\zipalign.exe" -v 4 C:\xampp\htdocs\wavetrophy\platforms\android\build\outputs\apk\android-release-unsigned.apk C:\xampp\htdocs\wavetrophy\platforms\android\build\outputs\apk\Wavetrohpy.apk
"C:\Program Files (x86)\Android\android-sdk\build-tools\26.0.1\apksigner" verify C:\xampp\htdocs\wavetrophy\platforms\android\build\outputs\apk\Wavetrohpy.apk
In Playstore releasen
Auf Github releasen
