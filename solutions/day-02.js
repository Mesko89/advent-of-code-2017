
const createSpreadsheetFromRows = rows => rows.map(row => row.split(/\s+/));

function calculateChecksum(spreadsheet, rowChecksumFn) {
  return spreadsheet.reduce((totalChecksum, row) => {
    return totalChecksum + rowChecksumFn(row);
  }, 0)
}

module.exports = {
  part1: (inputLines) => calculateChecksum(
    createSpreadsheetFromRows(inputLines),
    (row) => Math.max.apply(null, row) - Math.min.apply(null, row)
  ),
  part2: (inputLines) => calculateChecksum(
    createSpreadsheetFromRows(inputLines),
    (row) => {
      let division = 0;
      for (let i = 0; i < row.length; i++) {
        for (let j = i + 1; j < row.length; j++) {
          const min = Math.min(row[i], row[j]);
          const max = Math.max(row[i], row[j]);
          const divisionResult = max / min;
          if (divisionResult === Math.floor(max / min)) {
            return divisionResult;
          }
        }
      }
      return 0;
    }
  )
}