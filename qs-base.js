export default class QSBase {
  
  constructor(containerName, options){
    this._container = document.querySelector(`[data-qSearch-set=${containerName}]`);
    this._data = this.dataHandler(options);
  }
  
  dataHandler(options){
    if(!options.hasOwnProperty('data')) return;

    if(typeof options.data == 'string'){
      return this.setSingleData(options.data);
    }
    
    if(typeof options.data == 'object'){
     return this.setMultipleData(options.data);
    }
  }
  
  setSingleData(data){
    let itemName = `[data-qs-item=${data}]`;
    this._items = document.querySelectorAll(itemName);
    
    return Array.prototype.slice.call(this._items);
  }
 
  setMultipleData(dataArray){
    let list = this._container.querySelector(`[data-qs-list]`);
    let allItems = Array.prototype.slice.call(list.children);
    
    this._data = allItems.map(elm => {
      let values = {};
      for(let i = 0; i < dataArray.length; i++){
        values[dataArray[i]] = elm.querySelector(`[data-qs-item=${dataArray[i]}]`).innerText;
      }
      
      return values;
    });
  }
}