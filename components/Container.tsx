import { StyleSheet,View } from 'react-native';
import { PropsWithChildren } from 'react';
import { ThemedView } from '@/components/ThemedView';
import Animated, {
    useAnimatedRef,
} from 'react-native-reanimated';


export default function Container({ children }: PropsWithChildren)
{

  const scrollRef = useAnimatedRef<Animated.ScrollView>();

    return(
        <View style={styles.container}>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                {children}
            </Animated.ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin:10

    }
})