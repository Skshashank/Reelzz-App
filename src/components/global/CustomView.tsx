import {FC, ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Colors} from '../../constants/Colors';

// developing HOC
interface CustomViewProps {
  children: ReactNode;
  style?: ViewStyle; // optional
}

const CustomView: FC<CustomViewProps> = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
}; // always pass external always at the end

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default CustomView;
