class qSearch{
  
  constructor(containerName, options){
    let qsContainer = `[data-qSearch-set=${containerName}]`; 
    let itemName = `[data-qSearch-item=${options.dataAttr}]`;

    this._container = document.querySelector(qsContainer);
    
    if(options.hasOwnProperty('dataAttr')){
      this._items = document.querySelectorAll(itemName);
    }
    
    this._data = Array.prototype.slice.call(this._items);
  }
  
  search(value){
    let list = this._data;
    let rxp = new RegExp(value, 'gi');
    let filtered = list.filter(item => rxp.test(item.innerText));

    this.render(filtered);
  }
  
  render(newList){
    let updatedListGroup = this._container.querySelector('[data-qSearch-list]');
    let updatedList = newList.map(item => item.outerHTML).join('');

    updatedListGroup.innerHTML = updatedList;
  }
}