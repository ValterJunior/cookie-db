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

#### start()

Method to load the table from the browser's cookies.

> **Obs:** This method is already used in the **open()** method

##### Examples

```javascript
table.start();
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

## License (MIT)

Copyright (c) Valter Junior ("Author")

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
