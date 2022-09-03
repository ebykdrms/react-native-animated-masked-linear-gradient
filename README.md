# react-native-animated-masked-linear-gradient

## Dependencies
- [prop-types](https://github.com/facebook/prop-types)
- [@react-native-masked-view/masked-view](https://github.com/react-native-masked-view/masked-view)
- [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient)

## Tested on
I tested this project only on a Android device. But i think there is no problem on IOS.

## Installation
`npm i react-native-animated-masked-linear-gradient`

## Importing
```javascript
import AnimatedMaskedLinearGradient from 'react-native-animated-masked-linear-gradient';
```

## Simple Usage Example
```jsx
<AnimatedMaskedLinearGradient>
  <Text>Hello World!</Text>
</AnimatedMaskedLinearGradient>
```

## Usage Example With All Default Properties
```jsx
<AnimatedMaskedLinearGradient
  colors={["rgb(255,0,0)", "rgb(0,255,0)", "rgb(0,0,0255)"]}
  connectFirstAndLastColor={true}
  duration={3000}
  style={{}}
  contentContainerStyle={{}}
  useNativeDriver={true}
  directionTo={"right"}
>

  <View style={{width:30, height:30, borderRadius:15}} />
  <Text>Hello World!</Text>

</AnimatedMaskedLinearGradient>
```

## What is it doing?
Actually this is just a MaskedView component with LinearGradient component. It works like this:
- This MaskedView component gets children whose your putted inside and put them to a container View component. 
- It runs onLayout event of this container View and get this component's width and hight values.
- It uses this width and hight values on style of 2 LinearGradient components. So, this LinearGradient components gets same size with container View. 
- After then, it looks at direction property (it can be only **"right"** or "left") and it starts an transform: translateY animation using react native Animated API.