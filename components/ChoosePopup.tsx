import * as React from 'react';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StyleSheet, View } from 'react-native';


export default function useChoosePopup(){

    const [visible, setVisible] = React.useState<boolean>(false);

    //#region get right color
    const colorScheme = useColorScheme();

    const textColor = colorScheme === 'dark' ? "#fff" : "#000"
    const backgroudColor = colorScheme === 'dark' ? "#000" : "#fff"
    //#endregion

    const [titel, setTitel] = React.useState<string>("");
    const [text, setText] = React.useState<string>("");
    const [okBtnText, setOkBtnText] = React.useState<string>("OK");
    const [noBtnText, setNoBtnText] = React.useState<string>("Cancel");

    const [okBtnColor, setOkBtnColor] = React.useState<string>("#008000");
    const [noBtnColor, setNoBtnColor] = React.useState<string>("#FF0000");

    const [okBtnShow, setOkBtnShow] = React.useState<boolean>(true);
    const [noBtnShow, setNoBtnShow] = React.useState<boolean>(true);

    const [okBtnFun, setOkBtnFun] = React.useState<() => void>(() => {});
    const [noBtnFun, setNoBtnFun] = React.useState<() => void>(() => {});

    const show = (params:ChoosePopupShowParams) =>{

        if (params.titel !== undefined) setTitel(params.titel);
        if (params.text !== undefined) setText(params.text);
        if (params.okBtnText !== undefined) setOkBtnText(params.okBtnText);
        if (params.noBtnText !== undefined) setNoBtnText(params.noBtnText);

        if (params.okBtnColor !== undefined) setOkBtnColor(params.okBtnColor);
        if (params.noBtnColor !== undefined) setNoBtnColor(params.noBtnColor);

        if (params.okBtnShow !== undefined) setOkBtnShow(params.okBtnShow);
        if (params.noBtnShow !== undefined) setNoBtnShow(params.noBtnShow);
        if (params.okBtnFun !== undefined) setOkBtnFun(() => params.okBtnFun);
        if (params.noBtnFun !== undefined) setNoBtnFun(() => params.noBtnFun);

        setVisible(true);
    }




    const ChoosePopup = () =>
    {
        const okFun = () => {
            setVisible(false);
            if(okBtnFun != undefined)
                okBtnFun()
        }

        const noFun = () => {
            setVisible(false);
            if(noBtnFun != undefined)
                noBtnFun()
        }

        return(

            <Portal>
                <Modal visible={visible} onDismiss={() => {setVisible(false);}} contentContainerStyle={{backgroundColor: backgroudColor, padding: 20}}>

                    <View style={{display:"flex",flexDirection:"row", justifyContent:"center"}}>
                        <View style={{display:"flex",flexDirection:"column"}}>

                            <Text style={[{color:textColor, fontSize:25},styles.space]}>{titel}</Text>

                            <Text style={[{color:textColor},styles.space]}>{text}</Text>

                        </View>
                    </View>

                    <View style={[styles.space,styles.btnBody]}>

                        {okBtnShow &&(

                            <Button buttonColor={okBtnColor} mode="outlined"  onPress={() => okFun()}>
                                <Text style={[{color:textColor},styles.space]}>{okBtnText}</Text>
                            </Button>

                        )}

                        {noBtnShow &&(
                            <Button buttonColor={noBtnColor} mode="outlined" onPress={() =>  noFun()}>
                                <Text style={[{color:textColor},styles.space]}>{noBtnText}</Text>
                            </Button>
                        )}

                    </View>

                </Modal>
            </Portal>
        )

    }



    const styles = StyleSheet.create({

        space:{
    
            marginTop:10,
        
        },

        btnBody:{
            display: "flex" ,
            flexDirection:"row",
            justifyContent:"space-evenly"
        }

    
    });


    return [ChoosePopup, show] as const;

}


export declare type ChoosePopupShowParams ={

    titel?: string;

    text?: string;

    okBtnText?: string;

    noBtnText?: string;

    okBtnColor?:string;

    noBtnColor?:string;

    okBtnShow?: boolean;

    noBtnShow?:boolean;

    okBtnFun?: () => void;

    noBtnFun?: () => void;

}
