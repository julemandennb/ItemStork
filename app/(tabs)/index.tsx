import { StyleSheet} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as React from 'react';
import { DataTable, Text,Icon,MD3Colors,Divider  } from 'react-native-paper';

import Container from '@/components/Container'
import StorkItme from '@/model/StorkItme';
import AddNewStorkItmeView from "@/components/AddNewStorkItmeView"
import StorkItmeServices from "@/services/StorkItmeServices"
import { useFocusEffect} from '@react-navigation/native';
import UsergroupServices from '@/services/UsergroupServices';
import Usergroup from '@/model/Usergroup';

import Toast from 'react-native-toast-message';


export default function HomeScreen() {

  const colorScheme = useColorScheme();


  const textColor = colorScheme === 'dark' ? "#fff" : "#000"

  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([10, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );


  const storkItmeServices = React.useRef(new StorkItmeServices()).current;
  const [storkItems, setStorkItems] = React.useState<StorkItme[]>(storkItmeServices.GetStorkItmes());

  const usergroupServices = React.useRef(new UsergroupServices()).current;
  const [usergroups, setUsergroups] = React.useState<Usergroup[]>(usergroupServices.GetUsergroups());


  const newStorkItme = AddNewStorkItmeView(storkItmeServices,usergroupServices)


  React.useEffect(() => {
    // Register the callback to update the state when new items are added
    storkItmeServices.onUpdate((updatedItems: StorkItme[]) => {
      setStorkItems([...updatedItems]); // Update the React state
    });
  }, [storkItmeServices]);

  React.useEffect(() => {
    // Register the callback to update the state when new items are added
    usergroupServices.onUpdate((updatedItems: Usergroup[]) => {
      setUsergroups([...updatedItems]); // Update the React state
      newStorkItme.setusergroupList(updatedItems)
    });
  }, [usergroupServices]);


  useFocusEffect(
    React.useCallback(() => {
      // Function to run when HomeScreen is focused
      storkItmeServices.UpdataListAfterLogin();
      usergroupServices.UpdataListAfterLogin();


    }, []) // Empty dependency array ensures this runs when the screen is focused
  );


  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, storkItems.length);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
  }

  return (
      <Container>

        {newStorkItme.btn()}

        
          <DataTable>

            <DataTable.Header>
              <DataTable.Title style={styles.DataTableCenterTitle} textStyle={{color:textColor}}>Name</DataTable.Title>
              <DataTable.Title style={styles.DataTableCenterTitle} textStyle={{color:textColor}}>Stork</DataTable.Title>
              <DataTable.Title style={styles.DataTableCenterTitle} textStyle={{color:textColor}}>Date</DataTable.Title>
              <DataTable.Title style={styles.DataTableCenterTitle} textStyle={{color:textColor}}>Editor</DataTable.Title>
              <DataTable.Title style={styles.DataTableCenterTitle} textStyle={{color:textColor}}>Delete</DataTable.Title>
            </DataTable.Header>



            {storkItems.slice(from, to).map((item) => (
              <DataTable.Row key={item.id} >
                <DataTable.Cell style={styles.DataTableCenterCell} textStyle={{color:textColor}}>{item.name}</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableCenterCell} textStyle={{color:textColor}}>{item.stork}</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableCenterCell} textStyle={{color:textColor}}>{item.GetDateStr()}</DataTable.Cell>

                <DataTable.Cell onPress={() => newStorkItme.editorOpen(item)} style={styles.DataTableCenterCell}>
                    <Icon source="pen" color={MD3Colors.primary50} size={20}/>
                </DataTable.Cell>

                <DataTable.Cell onPress={() => showToast()} style={styles.DataTableCenterCell}>
                    <Icon source="delete" color={MD3Colors.error50} size={20}/>
                </DataTable.Cell>


              </DataTable.Row>
            ))}


            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(storkItems.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={<Text style={{color:textColor}}>{from + 1}-{to} of {storkItems.length}</Text> }
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

        

        {newStorkItme.btn()}

        {newStorkItme.ModalFrom()}

      </Container>
  );
}



const styles = StyleSheet.create({

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
