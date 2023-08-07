const columnToNumber = (column) => {
    let result = 0;
    const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letters = column.split("").reverse();
    
    for (let i = 0; i < letters.length; i++) {
      const letterValue = base.indexOf(letters[i]) + 1;
      result += letterValue * Math.pow(26, i);
    }
    
    return result;
  }

  module.exports = {
    columnToNumber
  }