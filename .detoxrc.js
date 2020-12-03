module.exports = {
  testRunner: "jest",
  runnerConfig: "e2e/config.json",
  configurations: {
    "android.emu.debug": {
      binaryPath: "android/app/build/outputs/apk/debug/app-debug.apk",
      build:
        "cd android && ENVFILE=.env.dev ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..",
      type: "android.emulator",
      device: {
        avdName: "Pixel_API_28_AOSP",
      },
    },
    "android.emu.release": {
      binaryPath: "android/app/build/outputs/apk/release/app-release.apk",
      build:
        "cd android && ENVFILE=.env.dev ./gradlew assembleRelease assembleAndroidTest -DtestBuildType=release && cd ..",
      type: "android.emulator",
      device: {
        avdName: "Pixel_API_28_AOSP",
      },
    },
    "ios.sim.debug": {
      binaryPath:
        "ios/build/Build/Products/Debug-iphonesimulator/pruebacli.app",
      build:
        "xcodebuild -workspace ios/pruebacli.xcworkspace -scheme dev -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build",
      type: "ios.simulator",
      device: {
        type: "iPhone 11",
      },
    },
  },
};
