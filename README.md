# qSearch
List Search/Filter Class with data-attribute driven API


## Methods available

### Searching

| Method                                                                           | Summary                                                                                                                                                                                               |
|----------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| .search( searchValue: string, afterSearch(filteredElements, filteredCount) : fn) | Triggers a search that returns items matching the provided value.  afterSearch() is a callback that gets called after search, but before render                                                       |
| .filter( filterValue: string, keepState: boolean)                                | Filters out items that match the provided value. Note: .search() returns items that match, while .filter() excludes them.  KeepState stores the filtered list and saves it to use across all actions. |
| .restoreAll()                                                                    | Restores filtered list to its original state. Primarily to reset filtered lists that have keepState enabled.                                                                                          |


## Creating a new searchable list instance

A set is the overarching container that wraps around the searchable list. Set a name for the set using the *data-qs-set* attribute.

Specify a searchable list by setting the *data-qs-list*. A list doesn't have to be an ordered/unordered HTML list. It can simply be a div that's directly wrapping around the items that are going to be searched.

An attribute can be considered as a column in a table. It's the data that'll be searched for items, which can be considered rows of data. Attach *data-qs-attr* to attributes that'll be searched.

```html
// HTML

<div data-qs-set="list_one">
  <ul data-qs-list>
    <li>
      <span data-qs-attr="name">Example 1</span>
      <br/>
      <span data-qs-attr="date">2019</span>
    </li>
    <li>
      <span data-qs-attr="name">Example 2</span>
      <br/>
      <span data-qs-attr="date">2017</span>
    </li>
    <li>
      <span data-qs-attr="name">Example 3</span>
      <br/>
      <span data-qs-attr="date">2008</span>
    </li>
  </ul>
</div>
```

Instaniate a new QSearch list by provided the name of the list as the first argument and pass in the attributes in the second one.

```javascript
  // A new list instance
  new QSearch('list_name_goes_here', {
    //
    atts: ['example_one','example_two']
  });
```
### Sorting

| Method                                   | Summary                                                                          |
|------------------------------------------|----------------------------------------------------------------------------------|
| .sort(attribute: string, sortBy: string) | Sort a given attribute by either DESC or ASC, passed in as the second parameter. |

## Basic Example

```javascript
// A new list instance
let list = new QSearch('list_one', {
  atts: ['name','date']
});

let input = document.querySelector('.search');

input.addEventListener('keyup', function(){
  
  // Search takes in a value to compare
  // Callback is executed right before the filtered list is rendered on the page
  list.search(this.value, (elms, count) => {
    console.log(`Search occurred! There are ${elms.length} items found`);
    
    if(elms.length === count){
        elms.forEach(item => item.classList.remove('new-item'));
    }else{
        elms.forEach(item => item.classList.add('new-item'));
    }
  });
});
```

```html
// HTML

// Search bar
<input class="search">

//List of random name and dates
<div data-qs-set="list_one">
  <ul data-qs-list>
    <li>
      <span data-qs-attr="name">Avengers: Endgame</span>
      <br/>
      <span data-qs-attr="date">2019</span>
    </li>
    <li>
      <span data-qs-attr="name">Spiderman: Homecoming</span>
      <br/>
      <span data-qs-attr="date">2017</span>
    </li>
    <li>
      <span data-qs-attr="name">Iron-man</span>
      <br/>
      <span data-qs-attr="date">2008</span>
    </li>
    <li>
      <span data-qs-attr="name">Titanic</span>
      <br/>
      <span data-qs-attr="date">1999</span>
    </li>
    <li>
      <span data-qs-attr="name">My Birthday</span>
      <br/>
      <span data-qs-attr="date">1995</span>
    </li>
    <li>
      <span data-qs-attr="name">JavaScript Created</span>
      <br/>
      <span data-qs-attr="date">1995</span>
    </li>
  </ul>
</div>
```
