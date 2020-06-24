export const groupBy = (objectArray, property) => {
    if (objectArray) {
      return objectArray.reduce((acc, obj) => {
        var key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    }
  }