# Cookie DB

## Synopsis
Cookie DB is a **JavaScript** DataSet class that helps developers to manager **data** by using browser's cookies.

By using this class you will be able to create and edit tables using **DataSet classes pattern** through intuitive methods.

## Requirements

* [jQuery](https://jquery.com)

## Installation

Just get the `cookie-db.min.js` file and attach to your own project.

## API Reference

```
// Creating a new CookieTable object
var table = new CookieTable( 'tableName' );
```
### Methods

#### addField(name,type)

Method to add fields in a table

##### Examples

```
// Adding a new field
table.addField( 'id', ctFieldTypes.NUMBER );
table.addField( 'name', ctFieldTypes.STRING );
table.addField( 'active', ctFieldTypes.BOOL );
```


## License (MIT)

Copyright (c) Valter Junior ("Author")

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
