export default class QSBase {

  constructor(containerName, options) {
    this._container = this.setContainer(containerName);
    this._list = this.setList();
    this._data = this.dataHandler(options);
  }

  // Stores the qs-set container
  setContainer(containerName) {
    return document.querySelector(`[data-qs-set=${containerName}]`);
  }

  // Stores the qs-list within container
  setList() {
    return this._container.querySelector(`[data-qs-list]`);
  }

  // Handles type checking for the passed data in options
  // continues only if data is an array
  dataHandler(options) {
    if (!options.hasOwnProperty('data')) return;

    let data = options.data;

    if (typeof data != 'object') {
      data = this.convertToArray(data);
    }

    if (typeof data == 'object') {
      return this.setData(data);
    }else{
      throw Error('data option is not an array.');
    }
  }

  // Converts data string to required array, if necessary
  convertToArray(data) {
    return data.split(' ');
  }

  // Converts items in lists to readable data objects
  setData(dataArray) {
    let allItems = Array.prototype.slice.call(this._list.children);
    let propertySetup = this.setDataProperties(dataArray);

    return allItems.map(elm => propertySetup(elm));
  }

  // Object setup for each element in list by storing:
  // * qs-item as key/value pair (e.g. <span data-qs-item="name">John<span> -> name: john)
  // * compare property is the string that will be compared by search method
  // * elm is the list item that will be stored to re-render
  setDataProperties(dataArray) {
    return (elm) => {
      let values = {};

      values.elm = elm;
      for (let i = 0; i < dataArray.length; i++) {
        values[dataArray[i]] = elm.querySelector(`[data-qs-item=${dataArray[i]}]`).innerText;
        values.compare = elm.innerText;
      }
      return values;
    }
  }
}