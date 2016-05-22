# react-native-miami-bikes
The purpose of this repository is to demonstrate how to use maps with react-native. 
This project recreates the Citibike Miami app's map view which is used to 
show the location of bike share stations throughout the city, as well as 
bike and docking availability at each location. The offical version of the app
is consistently broken (at least on Android), so if you ever want to use
Citibike in Miami, this app solves a real problem. 

## Installation
This project uses the
[react-native-maps](https://github.com/lelandrichardson/react-native-maps)
package to provide the mapview. At the time of writing this, the stock react Mapview 
for RN does not work for Android.
### Android
Follow the installation instructions for react-native-maps. You need to have 
ndk installed and working to run this package. Have a look at the commit history of the Manifest
file to see what changes are necessary. The api key in this project has been invalidated
and is only there for demonstration purposes. You'll need to replace it with your own.

If you're using Geny Motion, then you need to install google play services and then google maps
in order to use the map component with your emulator. This part can be tricky, but give [this guide](https://inthecheesefactory.com/blog/how-to-install-google-services-on-genymotion/en)
a try. Commit 164fc2ddb0fde4a5ec13fd2409b99245d4f0e967 of this repository might be a good point at which to verify that you can successfully 
use the map component. 

### IOS
I have no additional advice here that's not already mentioned in the react-native-maps
guide.