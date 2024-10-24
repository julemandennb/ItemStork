
import * as React from 'react';
import { View  } from 'react-native';
import { Button, Text,Portal,Modal,TextInput  } from 'react-native-paper';
import { useColorScheme } from '@/hooks/useColorScheme';
import StorkItme from '@/model/StorkItme';

import DateTimePicker from 'react-native-ui-datepicker';

export default function NewStockItem() {

    //#region to show popup box
    const [visible, setVisible] = React.useState<boolean>(false);
    const [showDateTimePicker, setShowDateTimePicker] = React.useState(false);
    //#endregion

    //#region get right color
    const colorScheme = useColorScheme();

    const textColor = colorScheme === 'dark' ? "#fff" : "#000"
    const backgroudColor = colorScheme === 'dark' ? "#000" : "#fff"
    //#endregion

    //#region val to StorkItme obj
    const [text, setText] = React.useState("");
    const [stock, setStock] = React.useState(0);
    const [date, setDate] = React.useState(new Date(new Date().setFullYear((new Date().getFullYear() + 1))));
    //#endregion
    

    /**
     * set str to only hav number
     * @param str str to check
     */
    const setStockTxtToNmuber = (str:string) =>
    {
        setStock(+str.replace(/[^0-9]/g, ''))
    }

    /**
     * set all React.useState to start val and show popup
     */
    const showModel = () =>{
        
        setText("");
        setStock(0);
        setShowDateTimePicker(false);
        setDate(new Date(new Date().setFullYear((new Date().getFullYear() + 1))));

        setVisible(true);
    }

    /**
     * popup hav date Picker
     * @returns date Picker popup box
     */
    const DateTimePickerView = () => {

            return(

                <Portal>
                    <Modal visible={showDateTimePicker} onDismiss={() => {setShowDateTimePicker(false); console.log(54654654)}} contentContainerStyle={{backgroundColor: backgroudColor, padding: 20}}>

                        <View>

                            <DateTimePicker
                                mode="single"
                                date={date}
                                onChange={(params) =>setDate(new Date(params.date))}
                            />

                            <Button icon="plus" mode="contained" onPress={() => setShowDateTimePicker(false)} style={{color:textColor}}>
                                Done
                            </Button>


                        </View>
                    </Modal>
                </Portal>
            )



    }


    
    /**
     * make a button to make a new itme
     * @returns button 
     */
    const btn = () =>
    {
        return(
            <View>
                <Button icon="plus" mode="contained" onPress={showModel} style={{color:textColor}}>
                    add new stork itme
                </Button>
            </View>
        )
    }



    const ModalFrom = (pushStorkItmes:(itme:StorkItme) => void) =>
    {


        return(

            <Portal>
                <Modal visible={visible} onDismiss={() => {setVisible(false); console.log(54654654)}} contentContainerStyle={{backgroundColor: backgroudColor, padding: 20}}>
                    <Text style={{color:textColor}}>Example Modal.  Click outside this area to dismiss.</Text>

                    <TextInput
                        style={{color:textColor}}
                        placeholder='Name'
                        onChangeText={setText}
                        inputMode={'text'}
                        value={text}
                    />

                    <TextInput
                        style={{color:textColor}}
                        placeholder='stock'
                        onChangeText={setStockTxtToNmuber}
                        keyboardType='numeric'
                        value={stock.toString()}
                    />

                       

                    {DateTimePickerView()}

                    <Button mode="elevated" onPress={() =>  setShowDateTimePicker(true)} style={{textAlign: 'left',padding: '0', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        <Text style={{color:textColor}}>date {date.toLocaleString("da").split(",")[0]} </Text>
                    </Button>

                    <Button icon="plus" mode="contained" onPress={() => console.log("gg")} style={{color:textColor}}>
                        Save
                    </Button>


                </Modal>
            </Portal>
        
        )

    }


    return {btn,ModalFrom}

}
