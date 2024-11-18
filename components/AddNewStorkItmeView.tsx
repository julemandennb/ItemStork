
import * as React from 'react';
import { View ,StyleSheet } from 'react-native';
import { Button, Text,Portal,Modal,TextInput  } from 'react-native-paper';
import { useColorScheme } from '@/hooks/useColorScheme';
import StorkItme from '@/model/StorkItme';
import DateTimePicker from 'react-native-ui-datepicker';
import {Picker} from '@react-native-picker/picker';

import StorkItmeServices from "@/services/StorkItmeServices"
import UsergroupServices from '@/services/UsergroupServices';
import Usergroup from '@/model/Usergroup';

export default function AddNewStorkItmeView(storkItmeServices:StorkItmeServices,usergroupServices:UsergroupServices) {

    //#region to show popup box
    const [visible, setVisible] = React.useState<boolean>(false);
    const [showDateTimePicker, setShowDateTimePicker] = React.useState(false);
    const [updataCall, setupdataCall] = React.useState(false);
    const [usergroupList,setusergroupList] = React.useState<Usergroup[]>(usergroupServices.GetUsergroups());


    //#endregion

    //#region get right color
    const colorScheme = useColorScheme();

    const textColor = colorScheme === 'dark' ? "#fff" : "#000"
    const backgroudColor = colorScheme === 'dark' ? "#000" : "#fff"
    //#endregion

    //#region val to StorkItme obj
    const [text, setText] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [type, setType] = React.useState("");
    const [date, setDate] = React.useState(new Date(new Date().setFullYear((new Date().getFullYear() + 1))));
    const [stock, setStock] = React.useState(0);
    const [userGroup, setuserGroup] = React.useState<Usergroup>();
   
    const [storkItme, setstorkItme] = React.useState<StorkItme|null>(null);
    //#endregion

    /**
     * find right userGroup
     * @param userGroupId id on userGroup
     * @param from server this user id is under
     * @returns userGroup
     */
    const findRightUsergroup = (userGroupId:number,from:string) =>{
      return usergroupList.find(x => x.from == from && x.id == userGroupId)
    }
    
    /**
     * set str to only hav number
     * @param str str to check
     */
    const setStockTxtToNmuber = (str:string) =>
    {
        setStock(+str.replace(/[^0-9]/g, ''))
    }

    /**
     * to set new info on itme
     * @param storkItme storkItme itme to updata
     */
    const editorOpen = (storkItme:StorkItme) =>{
        setText(storkItme.name);
        setStock(storkItme.stork);
        setDescription(storkItme.description);
        setShowDateTimePicker(false);
        setDate(storkItme.date);
        setuserGroup(findRightUsergroup(storkItme.userGroupId,storkItme.from));
        setstorkItme(storkItme);
        setupdataCall(true);
        setVisible(true);
    }


    /**
     * set all React.useState to start val and show popup
     */
    const showModel = () =>{
        
        setText("");
        setDescription("");
        setStock(0);
        setShowDateTimePicker(false);
        setDate(new Date(new Date().setFullYear((new Date().getFullYear() + 1))));
        setuserGroup(undefined);
        setstorkItme(null);
        setupdataCall(false);
        setVisible(true);
    }

    /**
     * popup hav date Picker
     * @returns date Picker popup box
     */
    const DateTimePickerView = () => {

        return(

            <Portal>
                <Modal visible={showDateTimePicker} onDismiss={() => {setShowDateTimePicker(false);}} contentContainerStyle={{backgroundColor: backgroudColor, padding: 20}}>

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
     * to make a seleter to userGroup
     * @returns seleter to this
     */
    const MakeUserGroupIdSeleter = () =>{

        return(

            <View>
                <Text style={{color:textColor}}>userGroup</Text>

                <Picker
                    selectedValue={userGroup}
                    onValueChange={(itemValue, itemIndex) =>{
                        if(itemValue != null)
                            setuserGroup(itemValue)
                        }
                    }>
                         <Picker.Item key={0} label="none" value={null} />
                    {usergroupList.map((obj,index) => (
                            <Picker.Item key={index} label={obj.name} value={obj} />
                    ))}
                    
                </Picker>
            </View>


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

    /**
     * make popup to make a new StorkItme
     * @param pushStorkItmes fun to send new StorkItme to 
     * @returns popup to make a popup
     */
    const ModalFrom = () =>
    {

        return(

            <Portal>
                <Modal visible={visible} onDismiss={() => {setVisible(false);}} contentContainerStyle={{backgroundColor: backgroudColor, padding: 20}}>

                    {MakeUserGroupIdSeleter()}

                    <TextInput
                        style={[{color:textColor},styles.space]}
                        placeholder='Name'
                        onChangeText={setText}
                        inputMode={'text'}
                        value={text}
                    />

                    <TextInput
                        multiline
                        style={[{color:textColor,minHeight : 100},styles.space]}
                        placeholder='description'
                        onChangeText={setDescription}
                        inputMode={'text'}
                        value={description}
                    />

                    <Text style={[{color:textColor},styles.space]}>stock</Text>
                    <TextInput
                        style={[{color:textColor}]}
                        placeholder='stock'
                        onChangeText={setStockTxtToNmuber}
                        keyboardType='numeric'
                        value={stock.toString()}
                    />

                    {DateTimePickerView()}

                    <Button style={styles.space} mode="outlined"  onPress={() =>  setShowDateTimePicker(true)}>
                        <Text style={[{color:textColor},styles.space]}>date {date.toLocaleString("da").split(",")[0]} </Text>
                    </Button>

                    <View style={styles.space}>
                        {updataCall ?  
                            <Button icon="plus" mode="contained" onPress={() => callUpdataStorkItme()} style={{color:textColor}}>Updata</Button> :
                            <Button icon="plus" mode="contained" onPress={() => callMakeStorkItme()} style={{color:textColor}}>Save</Button>
                        }
                    </View>

                    
               
                    


                </Modal>
            </Portal>
        
        )

    }

    /**
     * to make a new StorkItme
     */
    const callMakeStorkItme = () =>
    {
        if(userGroup != null)
        {
            storkItmeServices.create(text,description,type,date,stock,userGroup)
            setVisible(false);
        }
    }

    /**
     * to updata StorkItme
     */
    const callUpdataStorkItme = () =>{


        let storkItmeNew = storkItme
        if(storkItmeNew != null && userGroup != null)
        {
            storkItmeNew.name = text;
            storkItmeNew.description = description;
            storkItmeNew.stork = stock;
            storkItmeNew.date = date;
            storkItmeNew.userGroupId = userGroup.id;
            storkItmeServices.updata(storkItmeNew)
        }
        setVisible(false);
    }

    
    const styles = StyleSheet.create({

        space:{
    
            marginTop:10,
        
        },

    
    });

    return {btn,ModalFrom,editorOpen,setusergroupList}

}

