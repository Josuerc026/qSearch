import QSBase from './qs-base';

class QSearch extends QSBase {

    constructor(container, options) {
        super(container, options);
    }

    search(value) {
        let rxp = new RegExp(value, 'gim');
        let filtered = this._data.filter(item => rxp.test(item.compare));

        this.render(filtered);
    }

    render(newList) {
        this._list.innerHTML = newList.map(item => item.elm.outerHTML).join('');
    }
}