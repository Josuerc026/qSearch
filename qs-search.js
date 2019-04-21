import QSBase from './qs-base';

class QSearch extends QSBase {

    constructor(container, options) {
        super(container, options);
    }

    // Search data by using compare string defined in the items object
    // Checking if value exists within string by checking its index
    search(value) {
        let filtered = this._data.filter(item => item.compare.toLowerCase().indexOf(value.toLowerCase()) > -1);

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