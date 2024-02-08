import  'dotenv/config';

export default {
  "expo": {
    "name": "ProgettoWebrtc",
    "slug": "ProgettoWebrtc",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.yourappname"
    },
    "android": {
      "package": "com.yourcompany.yourappname",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "API_KEY": process.env.API_KEY,
      "AUTH_DOMAIN": process.env.AUTH_DOMAIN,
      "PROJECT_ID": process.env.PROJECT_ID,
      "STORAGE_BUCKET": process.env.STORAGE_BUCKET,
      "MESSAGING_SENDER_ID": process.env.MESSAGING_SENDER_ID,
      "APP_ID": process.env.APP_ID,
      "eas": {"projectId": "b5e40032-4671-4050-88ee-2a898877c457"}
   }
     }
}