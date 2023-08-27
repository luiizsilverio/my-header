import { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Animated, Image } from 'react-native';
import imgLogo from "./src/assets/logo.png";

const data = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
]

const H_MAX_HEIGHT = 150;
const H_MIN_HEIGHT = 50;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

export default function App() {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
    extrapolate: 'clamp'
  })

  const imageScaleHeight = scrollOffsetY.interpolate({
    inputRange: [0, H_MAX_HEIGHT],
    outputRange: [100, 40],
    extrapolate: 'clamp'
  })

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" translucent={false} backgroundColor='#121212' />

      <Animated.View style={{
        width: '100%',
        height: headerScrollHeight,
        padding: 10,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexDirection: 'row'
      }}>
        {/* <Text style={styles.title}>Barber Shop</Text> */}
        <Animated.Image 
          source={imgLogo} 
          resizeMode="contain"
          style={{
            width: 100,
            height: imageScaleHeight
          }}        
        />
      </Animated.View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id} 
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{ item.title }</Text>            
          </View>
        )}

        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollOffsetY }}}
        ], { useNativeDriver: false })}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
    marginRight: 12
  }, 
  item: {
    height: 350,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  image: {
    width: 90,
    height: 90,
  }
});
