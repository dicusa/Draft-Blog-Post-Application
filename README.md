# Draft-BlogPost
 It is a Mobile Application developed through React-Native (Expo) which uses Firebase as backend.

## Application Overview

![Draft BlogPost Application](images/ApplicationOverview/AppOverView.gif)

## Application Screens

[Application Screens](images/ApplicationScreens)

## Application Features

- It is a Blog Post Application which provides user an environment to post a blog containing image and text.
- It is a Server based application with global synchronisation.
- Images are compressed in size but quality remains intact.

## Application Description

It is a Mobile Application developed through React-Native (Expo) which uses Firebase as backend.

- Sign in Options:
  - It uses 'Firebase' and 'expo-firebase-captcha' libraries to generate Captcha ,send OTP and verify it.
  - It uses 'Facebook's API' to provide an option for user to login via Facebook.


- Application WorkFlow:
  - After User sign in authentication, user is directed to the main flow of application
  - Main Flow of application consists of:
    - Home Screen :- This screen shows the list of blog post posted by different users. Also, it has a box for posting a new blog post.
    - Search Screen: This screen shows the list of trending Post and Post that user might be interested in. Also, it has a search bar for searching a blog on particular topic or by specific user.
    - Activity Screen: This screen shows the favourite post i.e., the post saved by user.
    - Account Screen: This screen shows the user profile with option of edit profile and list of blogs posted by the user.
  - Sub-Flow Screens :
    - Log In Screen: This screen allows user to sign in user with mobile AUTH and Facebook AUTH.
    - Create Post Screen: This screen allows user to draft a blog.
    - Favourite Screen: This screen shows the list of post saved by user.
    - Edit Profile Screen: This screen allows user to edit his/her profile information.
    - Settings Screen: This screen allow user to log out user.

## Advantages and Security?

1. It enables user to Signup and Sign in with Phone number Verification and Facebook Auth. Which is backed by Google Firebase AUTH system and Facebook.
2. It ease up the task of setting up a backend API by handling all the complexity .
3. User info and Blog info is saved on firebase server.

## New Features Suggestions
 - Gmail AUTH for login
 - Comments section
 - Text Editor
 - Multiple Images in a blog
 - Notification Centre
## Documentation Link

- [Add Firebase to your WebApp](https://firebase.google.com/docs/web/setup)
- [Authenticate with Firebase with a Phone Number](https://firebase.google.com/docs/auth/web/phone-auth)
- [Authenticate with Facebook](https://developers.facebook.com/docs/react-native/login/)
- [FirebaseRecaptcha](https://docs.expo.io/versions/latest/sdk/firebase-recaptcha/)

## Libraries Used

- react-native-elements (npm install react-native-elements )
- firebase (npm install firebase )
- expo-firebase-recaptcha (expo install expo-firebase-recaptcha )
- expo-facebook (expo install expo-facebook)
- expo-image-picker (expo install expo-image-picker) 