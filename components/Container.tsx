import { View,StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren)
{
    return(
        <View style={style.container}>
            {children}
        </View>
    )
}


const style = StyleSheet.create({
    container:{
        marginTop: 10,
        marginLeft:10

    }
    


})