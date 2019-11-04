class QSearch {

    constructor(containerName, options) {
        this._set = this.storeSet(containerName);
        this._list = this.storeList();
        this._data = this.dataHandler(options);
        this._backupData = this._data;
    }

    // Stores the qs-set container
    storeSet(containerName) {
        if(typeof containerName !== 'string' || !containerName){
            throw Error('A QSearch Set hasnt been properly defined.');
        }
        return  document.querySelector(`[data-qs-set=${containerName}]`) ? 
                document.querySelector(`[data-qs-set=${containerName}]`) : 
                { 
                    name: containerName, 
                    exists: false
                };
    }

    // Stores the qs-list within container
    storeList() {
        if(this._set.hasOwnProperty('exists') && !this._set.exists){
            throw Error(`${this._set.name} doesnt exist.`);
        }
        return this._set.querySelector(`[data-qs-list]`);
    }

    // Handles type checking for the passed data in options
    // continues only if data is an array
    dataHandler(options) {
        if (!options.hasOwnProperty('attrs')) return;

        const data = options.attrs;

        if (!Array.isArray(data) && typeof data == 'string') {
            data = this.convertToArray(data);
        }

        if (Array.isArray(data)) {
            return this.setData(data);
        } else {
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
    setDataProperties(dataArray) {
        return (elm) => {
            let values = {};
            // * elm is the list item element that will be stored to re-render
            values.elm = elm;
            // * compare property is the string that will be compared by search method
            values.text = elm.innerText;

            // * qs-item as key/value pair (e.g. <span data-qs-item="name">John<span> -> name: john)
            for (let i = 0; i < dataArray.length; i++) {
                values[dataArray[i]] = elm.querySelector(`[data-qs-attr=${dataArray[i]}]`) ? elm.querySelector(`[data-qs-attr=${dataArray[i]}]`).innerText : null;
            }
            return values;
        }
    }

    // Search data by using compare string defined in the items object
    // Checking if value exists within string by checking its index
    search(value, callback) {
        console.log(this._data);
        let searched = this._data.filter( item => {
            return item.text.toLowerCase().indexOf(value.toLowerCase()) > -1
        });

        callback(searched.map(item => item.elm), this._data.length);
        this.render(searched);
    }

    // Filter items by provided value
    // keepState will maintain the lists new filtered state across actions
    filterOut(value, keepState) {
        let filtered = this._data.filter( item => {
            return !(item.text.toLowerCase().indexOf(value.toLowerCase()) > -1)
        });

        if(keepState){
            this._data = filtered;
        }
        this.render(filtered);
    }

    // Restores filtered lists to original state before keepState was enabled
    restoreAll(){
        this._data = this._backupData;
        this.render(this._data);
    }

    // Sort handler checks if both arguments are defined
    // checks the order type for sorting and re-renders the list
    sort(key, order) {
        if (!(key && order)) {
            throw Error("Missing an argument - sort(key, order)");
        }
        if(!this._data.find(item => item[key])){
            throw Error(`The column/attribute value'${key}' not found in list '${this._set.dataset.qsSet}'`);
        }
        switch (order) {
            case 'ASC':
                this.sortAsc(key);
                break;
            case 'DESC':
                this.sortDesc(key);
                break;
            default:
                throw Error("Order not ASC or DESC");
        }
        this.render(this._data);
    }

    //Sorts ASC - lowest to greatest value
    sortAsc(key) {
        this._data.sort((curr, next) => {
            if (curr[key] < next[key]) {
                return -1;
            }
            if (curr[key] > next[key]) {
                return 1;
            }

            return 0;
        });
    }

    //Sorts DESC - greatest to lowest value
    sortDesc(key) {
        this._data.sort((curr, next) => {
            if (curr[key] < next[key]) {
                return 1;
            }
            if (curr[key] > next[key]) {
                return -1;
            }

            return 0;
        });
    }

    // Renders the updated data list by 
    // the stored element reference within each data object
    render(newList) {
        this._list.innerHTML = newList.map(item => item.elm.outerHTML).join('');
    }
}