// App.js
import React, { useState } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View,TextInput, Button, Alert, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { DataTable, Text,Icon,MD3Colors,Divider  } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TokenLogin from '@/model/TokenLogin';
import GetRightLoginServices from '@/services/GetRightServices';
import LoginList from '@/model/LoginList';

const  App = () => {

    const colorScheme = useColorScheme();

    const textColor = colorScheme === 'dark' ? "#fff" : "#000"


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedApi, setSelectedApi] = useState(0);



    const [page, setPage] = React.useState<number>(0);
    const [numberOfItemsPerPageList] = React.useState([10, 20, 30]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );

    const getRightLoginServices = React.useRef(new GetRightLoginServices()).current;
    const [LoginList, setLoginList] = React.useState<LoginList[]>([]);
    getRightLoginServices.GetLoginList().then(result => {
        setLoginList(result);
    })


    React.useEffect(() => {
        // Register the callback to update the state when new items are added
        getRightLoginServices.onUpdate((updatedItems: LoginList[]) => {
            setLoginList([...updatedItems]); // Update the React state
        });
    }, [getRightLoginServices]);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, LoginList.length);
 


    const handleLogin = async () => {
        try {

            let returnInfoFromWebServer = getRightLoginServices.Login(username,password,getRightLoginServices.apiUrls[selectedApi])

            Alert.alert((await returnInfoFromWebServer).text);

        } catch (error) {
        console.error('Error:', error);
        Alert.alert('An error occurred');
        }
    };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Login</Text>


        <Picker
            selectedValue={selectedApi}
            onValueChange={(itemValue, itemIndex) =>
                setSelectedApi(itemValue)
            }>
            {getRightLoginServices.apiUrls.map((obj,index) => (
                    <Picker.Item key={obj.idSaveOnStorage} label={obj.displayName} value={index} />
            ))}
        </Picker>




        <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} />


        <View>


    <DataTable>

        <DataTable.Header>
            <DataTable.Title style={styles.DataTableCenterTitle} textStyle={{color:textColor}}>Name</DataTable.Title>
            <DataTable.Title style={styles.DataTableCenterTitle} textStyle={{color:textColor}}></DataTable.Title>
        
        </DataTable.Header>



        {LoginList.slice(from, to).map((item) => (
        <DataTable.Row key={item.id} >
            <DataTable.Cell style={styles.DataTableCenterCell} textStyle={{color:textColor}}>{item.name}</DataTable.Cell>
            <DataTable.Cell onPress={() => console.log('log ud')} style={styles.DataTableCenterCell}>
                <Text style={{color:MD3Colors.error50}}>log ud</Text>

            </DataTable.Cell>
        </DataTable.Row>
        ))}


        <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(LoginList.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={<Text style={{color:textColor}}>{from + 1}-{to} of {LoginList.length}</Text> }
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={<Text style={{color:textColor}}>Rows per page</Text>}
        theme={{
            colors: {
            text: '#616161',
            onSurface: '#616161',
            elevation: { level2: '#000' },
            },
        }}

        
        />


    </DataTable>




        </View>



    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 },

  DataTableCenterTitle:{

    justifyContent:'center',
    alignItems:'center',
    width:60
  },

  DataTableCenterCell:{

    justifyContent:'center', 
    alignItems:'center'
  }



});

export default App;
