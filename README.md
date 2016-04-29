# Cookie DB

## Synopsis
Cookie DB is a **JavaScript** DataSet class that helps developers to manager **data** by using browser's cookies.

By using this class you will be able to create and edit tables using **DataSet classes pattern** through intuitive methods.

## Requirements

* [jQuery](https://jquery.com)

## Installation

Just get the `cookie-db.min.js` file and attach to your own project.

## API Reference

```javascript
// Creating a new CookieTable object
var table = new CookieTable( 'tableName' );
```
### Table configuration methods

#### addField(name,type)

Method to add fields in a table

##### Examples

```javascript
// Adding new fields
table.addField( 'id', ctFieldTypes.NUMBER );
table.addField( 'name', ctFieldTypes.STRING );
table.addField( 'active', ctFieldTypes.BOOL );
```

#### open()

Method to open the table whether is it created or not.

##### Examples

```javascript
// Opening the table
table.open();
```

#### close()

Method to close the table saving any peding data.

> **Obs:** This method is going to set the table as **inactive**

##### Examples

```javascript
// Opening the table
table.close();
```

#### commit()

Method to persist all table changes into the **Database**

##### Examples

```javascript
table.edit().getRow().active = false;
table.post().commit();
```

#### rollback()

Method to returns the table to the previous state (after the last **commit()**)

##### Examples

```javascript
table.edit().getRow().active = false;
table.post();
table.rollback();
```

#### truncate()

Method to clean up a table removing all the saved rows

> **CAUTION!** Be careful, the action of this method can not be reverted.

##### Examples

```javascript
// Cleaning the whole table
table.truncate();
```

### Data handling methods

#### append()

Method to create a new row

##### Examples

```javascript
// Creating new row
table.append();
```

#### edit()

Method to edit a row set in the current cursor

##### Examples

```javascript
// Editing the current row
table.edit();
```

#### delete()

Method to delete a row set in the current cursor

##### Examples

```javascript
// Removing the current row
table.delete();
```

#### getRow()

Method to return the current row's object

##### Examples

```javascript
// Reading the current row and retreiving the field "name"'s value
var name = table.getRow().name;
```

#### post()

Method to apply all changes to the table under the automatic transaction block opened.

> All changes will just be physically saved after a **commit** method be called 

##### Examples

```javascript
// Creating a new row to add Mary's informations
table.append();
table.getRow().name   = 'Mary';
table.getRow().active = true;
table.post();
```

#### cancel()

Method to cancel any change made in the current row under a **append** or **edit** situation.

##### Examples

```javascript
// Editing the current row
table.edit();
table.getRow().name = 'Mary Ohana';

if( table.getRow().active ){
   table.post();
}else{
   table.cancel();
}
```

### Browse methods

#### goTo(recNo)

Method to set a new row as the current row by using the index

##### Examples

```javascript
// Editing the row number 3
table.goTo(3);
table.getRow().name = 'Mary Jane';
table.post();
// Another option
table.goTo(3).getRow().name = 'Mary Jane';
table.post();
```

#### locate(fields, values, isCaseSensitive)

Method to locate and set a row searching by specific field values

##### Examples

```javascript
if( table.locate(['name','active'], ['Mary',true]) ){
   table.edit();
   table.getRow().active = false;
   table.post();
}
```

#### first()

Method to move the current cursor to the table's first row

##### Examples

```javascript
table.first();
```

#### last()

Method to move the current cursor to the table's last row

##### Examples

```javascript
table.last();
```

#### prior()

Method to move the current cursor one step back (to the prior row)

##### Examples

```javascript
table.prior();
```

#### next()

Method to move the current cursor one step forward (to the next row)

##### Examples

```javascript
table.next();
```

### Others methods

#### count()

Method that returns the total of rows in a table

##### Examples

```javascript
var length = table.count();

if( length > 10 ){
   alert('The table has reached its limit!');
}
```

#### isBOF()

Method to indicate if the cursor is in the initial row of the given table

##### Examples

```javascript
if( table.isBOF() ){
   alert( 'You're looking into the first row' );
}
```

#### isEOF()

Method to indicate if the cursor is in the final row of the given table

##### Examples

```javascript
var names = [];

table.first();
while( !table.isEOF() ){
   names.push( table.getRow().name );
   table.next();
}
```

## License (MIT)

Copyright (c) Valter Junior ("Author")

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
