import QSBase from './qs-base';

class QSearch extends QSBase {

    constructor(container, options) {
        super(container, options);
    }

    search(value) {
        let filtered = this._data.filter(item => item.compare.toLowerCase().indexOf(value.toLowerCase()) > -1);

        this.render(filtered);
    }

    render(newList) {
        this._list.innerHTML = newList.map(item => item.elm.outerHTML).join('');
    }
}