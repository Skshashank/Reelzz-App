import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView'
import Lottie from 'lottie-react-native'
import Animation from '../../assets/animations/login.json'
import { RFValue } from 'react-native-responsive-fontsize'

const LoginScreen = () => {
  return (
    <CustomSafeAreaView style = {styles.container}>
      <View style = {styles.lottieContainer}>
        <Lottie source ={Animation} autoPlay loop style = {styles.lottie} />
      </View>
    </CustomSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container : {
    alignItems: 'center',
    paddingTop: 40,
  },
  lottieContainer:{
    width: RFValue(220),
    height: RFValue(220)
  },
  lottie:{
    width:'100%',
    height:'100%'
  }
})

export default LoginScreen
