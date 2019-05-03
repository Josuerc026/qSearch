class QSearch {

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
            values.compare = elm.innerText;

            // * qs-item as key/value pair (e.g. <span data-qs-item="name">John<span> -> name: john)
            for (let i = 0; i < dataArray.length; i++) {
                values[dataArray[i]] = elm.querySelector(`[data-qs-item=${dataArray[i]}]`).innerText;
            }

            return values;
        }
    }

    // Search data by using compare string defined in the items object
    // Checking if value exists within string by checking its index
    search(value, callback) {
        let filtered = this._data.filter(item => item.compare.toLowerCase().indexOf(value.toLowerCase()) > -1);

        // The callback gets called before render for flexibility
        callback(filtered.map(item => item.elm), this._data.length);
        
        this.render(filtered);
    }

    // Sort handler checks if both arguments are defined
    // checks the order type for sorting and re-renders the list
    sort(key, order) {
        if (!(key && order)) {
            throw Error("Missing an argument - sort(key, order)");
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