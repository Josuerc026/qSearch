# qSearch
List Search/Filter Class with data-attribute driven API

## Example

```javascript
// A new list instance
let list = new QSearch('list_one', {
  data: ['name','date']
});

let input = document.querySelector('.search');

input.addEventListener('keyup', function(){
  list.search(this.value);
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
      <span data-qs-item="name">Avengers: Endgame</span>
      <br/>
      <span data-qs-item="date">2019</span>
    </li>
    <li>
      <span data-qs-item="name">Spiderman: Homecoming</span>
      <br/>
      <span data-qs-item="date">2017</span>
    </li>
    <li>
      <span data-qs-item="name">Iron-man</span>
      <br/>
      <span data-qs-item="date">2008</span>
    </li>
    <li>
      <span data-qs-item="name">Titanic</span>
      <br/>
      <span data-qs-item="date">1999</span>
    </li>
    <li>
      <span data-qs-item="name">My Birthday</span>
      <br/>
      <span data-qs-item="date">1995</span>
    </li>
    <li>
      <span data-qs-item="name">JavaScript Created</span>
      <br/>
      <span data-qs-item="date">1995</span>
    </li>
  </ul>
</div>
```
