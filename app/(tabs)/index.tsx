import { Image, StyleSheet, Platform, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as React from 'react';
import { Button, DataTable, Text,Icon,MD3Colors,Divider  } from 'react-native-paper';

import Container from '@/components/Container'
import StorkItme from '@/model/StorkItme';
import NewStorkItme from "@/components/AddNewStorkItme"

import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function HomeScreen() {

  const colorScheme = useColorScheme();

  const textColor = colorScheme === 'dark' ? "#fff" : "#000"

  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([10, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [items, setItme] = React.useState([
    new StorkItme(1,"test",5,new Date(2025,5,10),""),
    new StorkItme(2,"test",5,new Date(2025,5,10),""),
    new StorkItme(3,"test",5,new Date(2025,5,10),""),
    new StorkItme(4,"test",5,new Date(2025,5,10),""),
    new StorkItme(5,"test",5,new Date(2025,5,10),""),
    new StorkItme(6,"test",5,new Date(2025,5,10),""),
    new StorkItme(7,"test",5,new Date(2025,5,10),""),
    new StorkItme(8,"test",5,new Date(2025,5,10),""),
    new StorkItme(9,"test",5,new Date(2025,5,10),""),
    new StorkItme(10,"test",5,new Date(2025,5,10),""),
    new StorkItme(11,"test",5,new Date(2025,5,10),""),
    new StorkItme(12,"test",5,new Date(2025,5,10),""),
    new StorkItme(13,"test",5,new Date(2025,5,10),""),
    new StorkItme(14,"test",5,new Date(2025,5,10),""),
    new StorkItme(15,"test",5,new Date(2025,5,10),""),
    new StorkItme(16,"test",5,new Date(2025,5,10),""),
    new StorkItme(17,"test",5,new Date(2025,5,10),""),
    new StorkItme(18,"test",5,new Date(2025,5,10),""),
    new StorkItme(19,"test",5,new Date(2025,5,10),""),
    new StorkItme(20,"test",5,new Date(2025,5,10),""),
    new StorkItme(21,"test",5,new Date(2025,5,10),""),
    new StorkItme(22,"test",5,new Date(2025,5,10),""),
    new StorkItme(23,"test",5,new Date(2025,5,10),""),
    new StorkItme(24,"test",5,new Date(2025,5,10),""),
    new StorkItme(25,"test",5,new Date(2025,5,10),""),
    new StorkItme(26,"test",5,new Date(2025,5,10),""),
    new StorkItme(27,"test",5,new Date(2025,5,10),""),
    new StorkItme(28,"test",5,new Date(2025,5,10),""),

    new StorkItme(29,"test",5,new Date(2025,5,10),""),
    new StorkItme(30,"test",5,new Date(2025,5,10),""),
     new StorkItme(31,"test",5,new Date(2025,5,10),""),
    new StorkItme(32,"test",5,new Date(2025,5,10),""),
    new StorkItme(33,"test",5,new Date(2025,5,10),""),
    new StorkItme(34,"test",5,new Date(2025,5,10),""),
    new StorkItme(35,"test",5,new Date(2025,5,10),""),
    new StorkItme(36,"test",5,new Date(2025,5,10),""),
    new StorkItme(37,"test",5,new Date(2025,5,10),""),
    new StorkItme(38,"test",5,new Date(2025,5,10),""),
    new StorkItme(39,"test",5,new Date(2025,5,10),""),
    new StorkItme(40,"test",5,new Date(2025,5,10),""),
    new StorkItme(41,"test",5,new Date(2025,5,10),""),
    new StorkItme(42,"test",5,new Date(2025,5,10),""),
    new StorkItme(43,"test",5,new Date(2025,5,10),""),
    new StorkItme(44,"test",5,new Date(2025,5,10),""),
    new StorkItme(45,"test",5,new Date(2025,5,10),""),
    new StorkItme(46,"test",5,new Date(2025,5,10),""),
    new StorkItme(47,"test",5,new Date(2025,5,10),""),
    new StorkItme(48,"test",5,new Date(2025,5,10),""),
    new StorkItme(49,"test",5,new Date(2025,5,10),""),
    new StorkItme(50,"test",5,new Date(2025,5,10),""),
    new StorkItme(51,"test",5,new Date(2025,5,10),""),
    new StorkItme(52,"test",5,new Date(2025,5,10),""),
    new StorkItme(53,"test",5,new Date(2025,5,10),""),
    new StorkItme(54,"test",5,new Date(2025,5,10),""),
    new StorkItme(55,"test",5,new Date(2025,5,10),""),
    new StorkItme(56,"test",5,new Date(2025,5,10),""),
  ])

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  const newStorkItme = NewStorkItme()

  return (
      <Container>

        {newStorkItme.btn()}

        <View>
          <DataTable>

            <DataTable.Header>
              <DataTable.Title style={styles.DataTableCenterTitle} textStyle={{color:textColor}}>Name</DataTable.Title>
              <DataTable.Title style={styles.DataTableCenterTitle} textStyle={{color:textColor}}>Stork</DataTable.Title>
              <DataTable.Title style={styles.DataTableCenterTitle} textStyle={{color:textColor}}>Date</DataTable.Title>
              <DataTable.Title style={styles.DataTableCenterTitle} textStyle={{color:textColor}}>Editor</DataTable.Title>
              <DataTable.Title style={styles.DataTableCenterTitle} textStyle={{color:textColor}}>Delete</DataTable.Title>
            </DataTable.Header>



            {items.slice(from, to).map((item) => (
              <DataTable.Row key={item.id} >
                <DataTable.Cell style={styles.DataTableCenterCell} textStyle={{color:textColor}}>{item.name}</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableCenterCell} textStyle={{color:textColor}}>{item.stork}</DataTable.Cell>
                <DataTable.Cell style={styles.DataTableCenterCell} textStyle={{color:textColor}}>{item.GetDateStr()}</DataTable.Cell>

                <DataTable.Cell onPress={() => console.log('Editor')} style={styles.DataTableCenterCell}>
                    <Icon source="pen" color={MD3Colors.primary50} size={20}/>
                </DataTable.Cell>

                <DataTable.Cell onPress={() => console.log('Delete')} style={styles.DataTableCenterCell}>
                    <Icon source="delete" color={MD3Colors.error50} size={20}/>
                </DataTable.Cell>


              </DataTable.Row>
            ))}


            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(items.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} of ${items.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={'Rows per page'}
            />


          </DataTable>

        </View>

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
