import { Image, StyleSheet, Platform, View } from 'react-native';
import * as React from 'react';
import { Button, DataTable, Text } from 'react-native-paper';

import Container from '@/components/Container'

export default function HomeScreen() {

  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [items] = React.useState([])

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);


  return (

    <Container>

      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
          add itme
      </Button>


    <DataTable>
    <DataTable.Header>
        <DataTable.Title>Dessert</DataTable.Title>
        <DataTable.Title numeric>Calories</DataTable.Title>
        <DataTable.Title numeric>Fat</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
       <DataTable.Cell numeric>1</DataTable.Cell>
       <DataTable.Cell numeric>2</DataTable.Cell>
       <DataTable.Cell numeric>3</DataTable.Cell>
     </DataTable.Row>

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

});
