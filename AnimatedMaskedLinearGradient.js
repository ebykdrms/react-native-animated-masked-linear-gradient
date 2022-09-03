import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

/**
 * AnimatedMaskedLinearGradient function returns a MaskedView (@react-native-masked-view/masked-view) component.
 * There is a masked LinearGradient component (react-native-linear-gradient) with child components. 
 * This masked LinearGradient component has a looped transform:translateY animation with Animated API by react-native.
 * @param {object} props - Component attributes
 * @param {any} props.children - Children components
 * @param {array} props.colors - Target colors for LinearGradient component. Default: ["rgb(128,128,128)", "rgb(0,0,0)"]
 * @param {boolean} props.connectFirstAndLastColors - if connectFirstAndLastColors parameter is true then last color and first color will set same value for a better looping animation. Default: true
 * @param {number} props.duration - duration parameter for Animated.timing() configuration. Default: 3000
 * @param {string} props.directionTo - directionTo parameter must get one of "right" or "left" values. Default: "right"
 * @param {object} props.style - style property for the top component: MaskedView. Note: MaskedView's style property already has { flex: 1 }.
 * @param {object} props.contentContainerStyle - style property for the parent component (View) of child components. Default value is empty object.
 * @param {boolean} props.useNativeDriver - useNativeDriver parameter for Animated.timing() configuration. Default: true
 * @returns component
 */
const AnimatedMaskedLinearGradient = (props) => {

  const { children, colors, connectFirstAndLastColors, duration, directionTo, style, contentContainerStyle, useNativeDriver } = props;

  const anim = useRef(new Animated.Value(0)).current;
  const [layout, setLayout] = useState(null);

  // if connectFirstAndLastColors parameter is true then
  // last color and first color will get same value for a better looping animation.
  const colorsArray = useMemo(() => {
    if (connectFirstAndLastColors) {
      const newColors = [...colors];
      newColors.push(newColors[0]);
      return newColors;
    }
    else return colors;
  }, [colors]);

  // Sizes of LinearGradiend component must get same values of container component's sizes.
  const onLayout = (e) => {
    console.log(e.nativeEvent.layout);
    setLayout(e.nativeEvent.layout);
  }

  // We can start animation when we get sizes of the container component.
  useEffect(() => {
    if (!layout) return;
    if (directionTo === "right") anim.setValue(-layout.width);
    Animated.loop(
      Animated.timing(anim, {
        toValue: directionTo == "right" ? 0 : directionTo == "left" ? -layout.width : 0,
        duration,
        useNativeDriver,
        easing: Easing.linear
      })
    ).start()
  }, [layout, directionTo]);


  return (
    <MaskedView
      style={[styles.container, style]}
      maskElement={(
        <View
          style={contentContainerStyle}
          onLayout={onLayout}>
          {children}
        </View>
      )}>
      <Animated.View style={styles.animatedView(anim)}>
        <LinearGradientBox layout={layout} colors={colorsArray} />
        <LinearGradientBox layout={layout} colors={colorsArray} />
      </Animated.View>
    </MaskedView >
  )
};

const LinearGradientBox = ({ layout, colors }) => {
  return (
    <LinearGradient
      style={styles.linearGradient(layout)}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={colors} />
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  animatedView: translateX => ({
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    transform: [{ translateX }]
  }),
  linearGradient: layout => ({
    width: layout?.width ?? "100%",
    height: layout?.height ?? "100%",
    marginRight: -1
  })
});

AnimatedMaskedLinearGradient.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  connectFirstAndLastColors: PropTypes.bool,
  duration: PropTypes.number,
  style: PropTypes.object,
  contentContainerStyle: PropTypes.object,
  useNativeDriver: PropTypes.bool,
  directionTo: PropTypes.oneOf(["right", "left"])
}

AnimatedMaskedLinearGradient.defaultProps = {
  colors: ["rgb(128,128,128)", "rgb(0,0,0)"],
  connectFirstAndLastColors: true,
  duration: 3000,
  style: {},
  contentContainerStyle: {},
  useNativeDriver: true,
  directionTo: "right"
}

export default AnimatedMaskedLinearGradient;