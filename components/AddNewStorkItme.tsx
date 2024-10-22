
import * as React from 'react';
import { View } from 'react-native';
import { Button, Text,Portal,Modal } from 'react-native-paper';
import { useColorScheme } from '@/hooks/useColorScheme';
import StorkItme from '@/model/StorkItme';

export default function NewStockItem() {

    const [visible, setVisible] = React.useState<boolean>(false);

    const colorScheme = useColorScheme();

    const textColor = colorScheme === 'dark' ? "#fff" : "#000"
    const backgroudColor = colorScheme === 'dark' ? "#000" : "#fff"

    
    /**
     * make a button to make a new itme
     * @returns button 
     */
    const btn = () =>
    {
        return(
            <View>
                <Button icon="plus" mode="contained" onPress={() => {setVisible(true);}} style={{color:textColor}}>
                    add new stork itme
                </Button>
            </View>
        )
    }

    const ModalFrom = () =>
    {
        return(

            <Portal>
                <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={{backgroundColor: backgroudColor, padding: 20}}>
                    <Text style={{color:textColor}}>Example Modal.  Click outside this area to dismiss.</Text>
                </Modal>
            </Portal>
        
        )

    }


    return {btn,ModalFrom}

}
