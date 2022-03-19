import {
  StyleSheet,
  Dimensions,
  View,
  Pressable,
  Text,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Gesture,
  GestureDetector,
  ScrollView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_800ExtraBold,
} from "@expo-google-fonts/playfair-display";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Montserrat_400Regular, useFonts } from "@expo-google-fonts/montserrat";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;
type SheetProps = {
  data: Object;
  setData: Function;
  toggle: boolean;
  toggler: Function;
  setCount: Function;
};
const BottomSheet = ({
  data,
  setData,
  toggle,
  toggler,
  setCount,
}: SheetProps) => {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    PlayfairDisplay_400Regular,
    PlayfairDisplay_800ExtraBold,
  });
  const translateY = useSharedValue(0);
  const [bagStorage, setBagStorage] = useState([
    {
      id: 2,
      price: 230,
      brand: "FORSA",
      title: "Mini speaker",
      images: ["../assets/ez.png", "../assets/ez.png", "../assets/ez.png"],
    },
  ]);
  useEffect(() => {
    toggleSheet(toggle);
  }, [toggle]);
  useEffect(() => {
    setBagStorage([...bagStorage, data]);
    setCount(bagStorage.length);
  }, [data]);

  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    });

  const rBottonSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  const toggleSheet = (state: boolean) => {
    state
      ? (translateY.value = withSpring(-SCREEN_HEIGHT / 3, { damping: 50 }))
      : (translateY.value = SCREEN_HEIGHT);
  };
  const translateX = useSharedValue(0);
  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: () => {},
  });
  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottonSheetStyle]}>
        <View style={styles.SheetHeader}>
          <Text style={styles.SheetHeaderText}></Text>
          <Text style={styles.SheetHeaderText}>Bag</Text>
          <Pressable
            onPress={() => {
              toggleSheet(false);
              toggler(false);
            }}
          >
            <Text style={[styles.SheetHeaderText, styles.left]}>
              <Ionicons name="close-outline" size={30} />
            </Text>
          </Pressable>
        </View>
        <View style={styles.bagContent}>
          {bagStorage.map((product, index) => (
            <PanGestureHandler onGestureEvent={panGesture}>
              <Animated.View style={[styles.bagProduct, rStyle]}>
                <View style={styles.productimageContainer}>
                  <Image
                    style={styles.productimage}
                    source={require(`../assets/ez` + ".jpg")}
                  />
                </View>
                <View style={styles.productTitle}>
                  <Text style={styles.productTitleParent}>
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </Text>
                  <Text style={styles.productTitleSub}>{product.brand}</Text>
                </View>
                <View>
                  <Text style={styles.productprice}>€{product.price}</Text>
                </View>
              </Animated.View>
            </PanGestureHandler>
          ))}
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  productimage: {
    width: 80,
    height: 80,
  },
  productimageContainer: {
    width: 80,
    height: 80,
    borderRadius: 13,
    backgroundColor: "#dcdcdc",
  },
  bagContent: {},
  bagProduct: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#ccccccdc",
    paddingVertical: 15,
    paddingHorizontal: 25,
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
  },
  left: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    textAlign: "right",
  },
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: SCREEN_HEIGHT,
    borderRadius: 25,
    paddingVertical: 20,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "#cccccc80",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
  SheetHeader: {
    flexDirection: "row",
    marginLeft: "auto",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  SheetHeaderText: {
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Montserrat_400Regular",
    // width: "33.33%",
  },
  productTitle: {
    marginRight: "auto",
    marginLeft: 20,
    justifyContent: "space-around",
  },
  productTitleParent: {
    fontFamily: "PlayfairDisplay_800ExtraBold",
    fontSize: 18,
  },
  productprice: {
    fontFamily: "PlayfairDisplay_400Regular",
    fontSize: 18,
  },
  productTitleSub: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 12,
    marginTop: 10,
  },
});
