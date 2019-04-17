import QSBase from './qs-base';

class QSearch extends QSBase {

  constructor(container, options){
  	super(container, options);
  }
  
  search(value){
  
   	let rxp = new RegExp(value, 'gi');
    let filtered = this._data.filter(item => rxp.test(item.innerText));
    
    this.render(filtered);
  }
  
  render(newList){
    let updatedListGroup = this._container.querySelector('[data-qSearch-list]');
    let updatedList = newList.map(item => item.outerHTML).join('');

    updatedListGroup.innerHTML = updatedList;
  }
}