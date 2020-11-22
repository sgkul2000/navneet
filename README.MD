# Navneet - "Eternally new"
Navneets is a new tab extension for Developers.This is more of a workaroud for safari. This is a Inspired by [Tabliss](https://tabliss.io) which is a new tab extension available for Firefox and Chrome. This project was started as a proof of concept of existance of newtab extensions for safari. This can also be used with other browsers, the procedure remains same.

## Features
 - You get the time and greeting with your first name
 - A quote is also displayed using [They Said so](https://quotes.rest) and [quotable.io](https://quotable.io) (default to quote of the day but can be swtiched to random)
 - A random background is chose from the wide collection of [Unsplash](https://unsplash.com) (Optionally you can choose keywords to lookup)
 - You also get the weather of your current location from [Open weather API](https://openweathermap.org/api) (You can also  enter the location manually)

## Project setup

### install dependencies
```
npm install
```
### Run in development mode
```
npm run dev
```
### Build for production
```
npm run build
```

## App setup
 - Step 1: You will have to build the app locally for production or clone the gh-pages branch directly.
 - Step 2: Once you have sone this you will have to setup a file called config.js which contains the apikeys for [Open weather API](https://openweathermap.org/api) and [Unsplash API](https://api.unsplash.com/) and put it in the root directory.
It should look something like this:
```JavaScript
export default {
    "OWA_API_KEY":"Your Open weather api key",
    "UNSPLASH_API_KEY": "Your unsplash access token"
}
```

You can head over to the browser setup.

## Browser setup
Once you have the repo colned locally and the config file ready, all you have to do is setup safari(or any other browser for that matter) to use this as your new tab. 
 - Step 1: get the url to the file:
    you can do this by droping the index.html file present in the `/dist` directory directly into the addressbar of your browser using your file explorer or spotlight and you can get the url to the localfile (should look something like this : "file:///Users/shreesh/Documents/navneet/dist/index.html")<br>
__Note: After building the project, the files will be placed in `/dist` directory. You will have to use the index.html present in this folder.__
 - Step 2: set the file url as the new tab url:
    This can be done by going to the safari settings by using Cmd + "," or by going to Safari > Preferences..
    In the general tab change "New tab opens with" and "New window opens with" to "Homepage" and then change the Homepage address to the file url from step 1.<br>
    For other browsers as well the procedure is same.

__Viola, There you have it__

## Tech Stack
This was build with [Vue.js](https://vuejs.org) and [Halfmoon](https://gethalfmoon.com). [Parcel](https://parceljs.org/) was also used to bundle the files. CI for this project was setup using GitOps (Github actions).


_Feel free to contribute._