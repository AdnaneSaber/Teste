import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Easing,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Swiper from "react-native-swiper";
import SwipeUpDown from "react-native-swipe-up-down";
import Pagination from "react-native-swiper";
import AppLoading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SwipeListView } from "react-native-swipe-list-view";
import LoadingSVG from "./LoadingSvg";
import {
  useFonts,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_800ExtraBold,
} from "@expo-google-fonts/playfair-display";
import { Montserrat_400Regular } from "@expo-google-fonts/montserrat";

export default function Body() {
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_800ExtraBold,
    Montserrat_400Regular,
  });
  const [data, setData] = useState({
    id: 1,
    price: 120,
    brand: "NYFORS",
    title: "Work lamp with LED bulb",
    images: ["../assets/lamp.png", "../assets/lamp.png", "../assets/lamp.png"],
  });
  const [colors, setColors] = useState([
    { color: ["#00000080", "#000000"], active: true },
    { color: "#7d7553", active: false },
    { color: "#a26f0f", active: false },
    { color: "#f1ebdb", active: false },
  ]);
  const handleBag = async () => {
    setAddingToBag(true);
    setTimeout(() => {
      setAddingToBag(false);
      swipeUpDownRef.current.showFull();
    }, 2000);
  };
  const swipeUpDownRef = useRef();
  const [liked, setLiked] = useState(false);
  const [addingToBag, setAddingToBag] = useState(false);
  const [spin] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(spin, {
      toValue: 40,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [addingToBag]);
  const spinn = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const selectColor = (key: number) => {
    setColors(
      colors.map((el, i) =>
        i == key ? { ...el, active: true } : { ...el, active: false }
      )
    );
  };
  return fontsLoaded ? (
    <>
      <Swiper
        style={styles.wrapper}
        loop={false}
        horizontal={false}
        dotStyle={{
          backgroundColor: "transparent",
          width: 8,
          height: 8,
          borderRadius: 0,
          borderColor: "#000",
          borderWidth: 1,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 3,
          marginBottom: 3,
        }}
        activeDotStyle={{
          backgroundColor: "#000",
          width: 8,
          height: 8,
          borderRadius: 0,
          borderColor: "#000",
          borderWidth: 1,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        {data.images.map((i) => (
          <View style={styles.slide}>
            <Image style={{ flex: 1 }} source={require(`../assets/lamp.png`)} />
          </View>
        ))}
      </Swiper>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentBrand}>{data.brand}</Text>
          <Pressable onPress={() => console.log("here is a press")}>
            <Pressable onPress={() => setLiked(!liked)}>
              <Ionicons
                name={liked ? "heart" : "heart-outline"}
                color="rgba(0, 0, 0, .9)"
                size={24}
                style={{ backgroundColor: "transparent" }}
              />
            </Pressable>
          </Pressable>
        </View>
        <View>
          <Text style={styles.contentTitle}>{data.title}</Text>
          <Text style={styles.contentprice}>€{data.price}</Text>
        </View>
        <View style={styles.colorsWrapper}>
          {colors.map((element, key) => (
            <Pressable
              style={{ ...styles.color, borderWidth: element.active ? 1 : 0 }}
              key={key}
              onPress={() => selectColor(key)}
            >
              {typeof element.color === "object" ? (
                <View style={styles.colorFill}>
                  <LinearGradient
                    colors={element.color}
                    style={{ flex: 1 }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    ...styles.colorFill,
                    backgroundColor: element.color,
                  }}
                ></View>
              )}
            </Pressable>
          ))}
        </View>
        <Pressable style={styles.addToBag} onPress={() => handleBag()}>
          {addingToBag ? (
            <Animated.View style={{ transform: [{ rotate: spinn }] }}>
              <LoadingSVG />
            </Animated.View>
          ) : (
            <Text style={styles.addToBagText}>Add to bag</Text>
          )}
        </Pressable>
      </View>
      <SwipeUpDown
        enabledContentGestureInteraction={false}
        itemFull={(hide: any) => (
          <Swipeontent swipeUpDownRef={swipeUpDownRef} data={data} />
        )}
        onShowFull={() => console.log("full")}
        animation="spring"
        disableSwipeIcon
        extraMarginTop={Dimensions.get("window").height - 300}
        ref={swipeUpDownRef}
        style={{ backgroundColor: "#fff" }} // style for swipe
      />
    </>
  ) : (
    <AppLoading />
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  swipeHeader: {
    flexDirection: "row",
    padding: 25,
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
  },
  swiperHeaderText: {},
  slide: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "transparent",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  paginationStyle: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  paginationText: {
    color: "white",
    fontSize: 20,
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
  },
  contentBrand: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 12,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  contentTitle: {
    fontFamily: "PlayfairDisplay_800ExtraBold",
    fontSize: 24,
  },
  contentprice: {
    fontFamily: "PlayfairDisplay_400Regular",
    fontSize: 20,
  },
  colorsWrapper: {
    flexDirection: "row",
    marginVertical: 20,
  },
  color: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 20,
    overflow: "hidden",
    padding: 3,
    borderWidth: 0,
  },
  colorFill: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    overflow: "hidden",
  },
  addToBag: {
    width: "100%",
    backgroundColor: "#262422",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 10,
    minHeight: 60,
  },
  addToBagText: {
    color: "#fff",
    fontFamily: "Montserrat_400Regular",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
  trash: {
    height: 25,
    width: 25,
  },
});
export function Swipeontent({ swipeUpDownRef, data }) {
  const rowSwipeAnimatedValues = {};
  Array(20)
    .fill("")
    .forEach((_, i) => {
      rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });
  const [listData, setListData] = useState([data]);

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: any, rowKey: any) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.id === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey: any) => {
    console.log("This row opened", rowKey);
  };

  const onSwipeValueChange = (swipeData: any) => {
    const { key, value } = swipeData;
    rowSwipeAnimatedValues[key].setValue(Math.abs(value));
  };

  const renderItem = (data: any, rowMap: any) => (
    <TouchableHighlight style={styles.rowFront} underlayColor={"#AAA"}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require(`../assets/lamp.png`)}
          style={{ width: 50, height: 50 }}
        />
        <View>
          <Text>{rowMap.title}</Text>
          <Text>{rowMap.brand}</Text>
        </View>
        <Text>€{rowMap.price}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data: any, rowMap: any) => (
    <View style={styles.rowBack}>
      <Text>Left</Text>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.id)}
      >
        <Text style={styles.backTextWhite}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.id)}
      >
        <Animated.View
          style={[
            styles.trash,
            {
              transform: [
                {
                  scale: rowSwipeAnimatedValues[data.item.id].interpolate({
                    inputRange: [45, 90],
                    outputRange: [0, 1],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <Ionicons
            name="trash-outline"
            color="rgba(0, 0, 0, .9)"
            size={24}
            style={{ backgroundColor: "transparent" }}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
  return (
    <>
      <View style={styles.swipeHeader}>
        <Text style={styles.swiperHeaderText}>2 items</Text>
        <Text style={styles.swiperHeaderText}>Bag</Text>
        <Pressable
          style={styles.swiperHeaderText}
          onPress={() => swipeUpDownRef.current.showMini()}
        >
          <Ionicons
            name="close-outline"
            color="rgba(0, 0, 0, .9)"
            size={24}
            style={{ backgroundColor: "transparent" }}
          />
        </Pressable>
      </View>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
        onSwipeValueChange={onSwipeValueChange}
      />
    </>
  );
}
