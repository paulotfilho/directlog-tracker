import Table from 'cli-table2';

export const printTable = (objects) => {
  // instantiate
  const table = new Table({
    head: [
      'Data',
      'Hora',
      'Operação',
      'Local',
      'Observação',
    ],
  });

  for (let i = 0; i < objects.length; i += 1) {
    table.push([
      objects[i].date,
      objects[i].hour,
      objects[i].op,
      objects[i].location,
      objects[i].obs,
    ]);
  }

  console.log(table.toString());
};

export default {
  printTable,
};
