import { Image, StyleSheet, Platform, View } from 'react-native';
import * as React from 'react';
import { Button, DataTable, Text,Icon,MD3Colors  } from 'react-native-paper';

import Container from '@/components/Container'
import StorkItme from '@/model/StorkItme';

export default function HomeScreen() {

  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([10, 20, 30]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const items = [
    new StorkItme(1,"test",5,new Date(2025,5,10),"")
  ]

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);


  return (

    <Container>

      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
          add itme
      </Button>


      <DataTable>

        <DataTable.Header style={{justifyContent:'flex-start',alignItems:'center'}}>
          <DataTable.Title style={styles.DataTableCenterTitle}>Name</DataTable.Title>
          <DataTable.Title style={styles.DataTableCenterTitle}>Stork</DataTable.Title>
          <DataTable.Title style={styles.DataTableCenterTitle}>Date</DataTable.Title>
          <DataTable.Title style={styles.DataTableCenterTitle}>Editor</DataTable.Title>
          <DataTable.Title style={styles.DataTableCenterTitle}>Delete</DataTable.Title>
        </DataTable.Header>



        {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.id} style={{ flex: 1}}>
          <DataTable.Cell style={styles.DataTableCenterCell}>{item.name}</DataTable.Cell>
          <DataTable.Cell style={styles.DataTableCenterCell}>{item.stork}</DataTable.Cell>
          <DataTable.Cell style={styles.DataTableCenterCell}>{item.GetDateStr()}</DataTable.Cell>

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

      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
          add itme
      </Button>

    </Container>

  );
}

const styles = StyleSheet.create({

  DataTableCenterTitle:{
    flex:1, 
    justifyContent:'center',
    alignItems:'center',
    width:60
  },

  DataTableCenterCell:{
    flex:1, 
    justifyContent:'center', 
    alignItems:'center'
  }


});
