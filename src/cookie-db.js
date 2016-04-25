/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var ctStates = {
    INSERT: 0,
    EDIT  : 1,
    BROWSE: 2,
    DELETE: 3
};

var ctFieldTypes = {
    NUMBER: 0,
    STRING: 1,
    BOOL  : 2
}

function CookieTable( name ){
    
    this.name = name;
    this.fields      = [];
    this.values      = [];
    this.row         = {};
    this.recNo       = 1;
    this._lastRecNo  = 1;
    this.active      = false;
    this.PREFIX_NAME = 'ct_';
    
    this.recNoIsValid = function(){
        return this.recNo >= 1 && this.recNo <= this.values.length;
    };
    
    this.setEmptyRow = function(){
        
        this.row = {};

        for( var i in this.fields ){
            this.row[this.fields[i].name] = null;
        }
        
    };
    
    this.processRow = function(){
        
        switch( this.state ){
            case ctStates.INSERT:
                
                this.recNo = this.values.length + 1;
                this.setEmptyRow();
                
                break;
                
            case ctStates.EDIT:
            case ctStates.BROWSE:
                
                if( this.recNoIsValid() ){
                    
                    this.convertTypes();
                    this.setEmptyRow();
                    
                    for( var i in this.fields ){
                        this.row[this.fields[i].name] = this.values[this.recNo - 1][this.fields[i].name];
                    }
                    
                }
                
                break;
                
        }
        
    };
    
    this.arrayEscape = function( arrayOfJSON ){
        
        for( var i in arrayOfJSON ){
            
            for( var key in arrayOfJSON[i] ){
                arrayOfJSON[i][key] = escape(arrayOfJSON[i][key]);
            }
            
        }
        
        return arrayOfJSON;
        
    };
    
    this.arrayUnescape = function( arrayOfJSON ){
        
        for( var i in arrayOfJSON ){
            
            for( var key in arrayOfJSON[i] ){
                arrayOfJSON[i][key] = unescape(arrayOfJSON[i][key]);
            }
            
        }
        
        return arrayOfJSON;
        
    };
    
    this.resetData = function(){
        
        this.values     = [];
        this.recNo      = 1;
        this._lastRecNo = 1;
        this.setEmptyRow();
        
    };
    
    this.convertTypes = function(){
      
        for( var i in this.values ){
            
            for( var x in this.fields ){
                
                switch(Number(this.fields[x].type)){
                    case ctFieldTypes.NUMBER:
                        this.values[i][this.fields[x].name] = Number( this.values[i][this.fields[x].name] );
                        break;
                    case ctFieldTypes.STRING:
                        this.values[i][this.fields[x].name] = String( this.values[i][this.fields[x].name] );
                        break;
                    case ctFieldTypes.BOOL:
                        this.values[i][this.fields[x].name] = String( this.values[i][this.fields[x].name] ) === 'true';
                        break;
                        
                }
                
            }
            
        }
        
    };
    
    this.fromJSON = function( json ){
        
        try{
            
            this.resetData();
            
            if( json.fields && json.fields.length > 0 ){
                this.fields = this.arrayUnescape( json.fields );
            }
            
            if( json.values && json.values.length > 0 ){
                this.values = this.arrayUnescape( json.values );
            }
            
            this.convertTypes();
                        
        }catch(err){
            throw 'JSON does not match';
        }
        
        
    };
    
    this.toJSON = function(){
        
        return { 
            fields: this.arrayEscape( this.fields ), 
            values: this.arrayEscape( this.values ) 
        };
        
    };
    
    this.resetData();
    
};

CookieTable.prototype.isActive = function(){
    return this.active;
};

CookieTable.prototype.exists = function(){
    return this.isActive() && this.fields && (this.fields.length > 0) && this.values;
};

CookieTable.prototype.open = function(){
    
    if( !this.active ){
        
        this.start();
        this.active = true;
        
    }
    
    return this;
    
};

CookieTable.prototype.close = function(){
    
    if( this.active ){
    
        this.commit();
        this.active = false;
    
        this.resetData();
        
    }
    
};

CookieTable.prototype.addField = function( name, type ){
    
    if( !this.active ){
        this.fields.push( { name: name, type: type } );
    }
    
    return this;
    
};

CookieTable.prototype.append = function(){
    
    if( this.active ){

        this.state = ctStates.INSERT;
        this.processRow();
        
    }
    
    return this;
    
};

CookieTable.prototype.edit = function(){
    
    if( this.active ){
        
        this.state = ctStates.EDIT;
        this.processRow();
        
    }
    
    return this;
    
};

CookieTable.prototype.getRow = function(){
    return this.row;
};

CookieTable.prototype.goTo = function( recNo ){
    
    if( this.active ){
    
        this._lastRecNo = this.recNo;

        this.recNo = recNo;

        if( this.recNoIsValid() ){
            this.state      = ctStates.BROWSE;
            this._lastRecNo = this.recNo;
            this.processRow();
        }else{
            this.recNo = this._lastRecNo;
        }
        
    }
    
    return this;
    
};

CookieTable.prototype.locate = function( fields, values, isCaseSensitive ){
    
    var isFieldArray = Object.prototype.toString.call( fields ) === '[object Array]';
    var isValueArray = Object.prototype.toString.call( values ) === '[object Array]';
    
    if( isNull(fields) || isNull(values) ){
        throw 'Fields and values must be informed';
    }else if( (isFieldArray && !isValueArray) || ( !isFieldArray && isValueArray ) ){ //nor
        throw 'Fields and values do not match';
    }else if( isFieldArray && fields.length !== values.length ){
        throw 'The amount of fields and values must be the same';
    }else{
    
        if( isNull( isCaseSensitive ) ){
            isCaseSensitive = false;
        }

        for( var i in this.values ){

            var row = this.values[i];

            if( isFieldArray ){

                var result       = true;
                var isStringType = (typeof row[fields[x]] === 'string') && (typeof values[x] === 'string');
                for( var x in fields ){

                    result = result && (isStringType && !isCaseSensitive ? (String(row[fields[x]]).toLowerCase() === String(values[x]).toLowerCase()) : row[fields[x]] === values[x]);

                    if( !result ){
                        return false;
                    }

                }

                this.goTo(Number(i)+1);
                return true;

            }else{
                var isStringType = (typeof row[fields] === 'string') && (typeof values === 'string');
                if( (isStringType && !isCaseSensitive ? (String(row[fields]).toLowerCase() === String(values).toLowerCase()) : String(row[fields]) === String(values)) ){
                    this.goTo(Number(i)+1);
                    return true;
                }
            }

        }
        
    }
    
};

CookieTable.prototype.post = function(){
    
    if( this.active ){
    
        switch( this.state ){

            case ctStates.INSERT:
                this.values.push( this.row );
                this.goTo( this.count() );
                break;
            case ctStates.EDIT:
                this.values[this.recNo-1] = this.row;
                this.goTo( this.recNo );
                break;
            case ctStates.DELETE:
                this.values.splice( this.recNo - 1, 1 );
                this.goTo( this.recNo - 1 );
                break;

        }
        
        this._lastRecNo = this.recNo;

    }
    
    return this;
    
};

CookieTable.prototype.delete = function(){
    
    if( this.active && this.state === ctStates.BROWSE ){
        this.state = ctStates.DELETE;
    }else{
        this.cancel();
    }
    
    return this;
    
};

CookieTable.prototype.truncate = function(){
    
    $.removeCookie( this.PREFIX_NAME + this.name );
    this.start();
    
    return this;
    
};

CookieTable.prototype.cancel = function(){

    if( this.active ){
        this.recNo = this._lastRecNo;
        this.processRow();
    }
    
    return this;
    
};

CookieTable.prototype.count = function(){
    return this.values.length;
};

CookieTable.prototype.first = function(){
    return this.goTo(1);
};

CookieTable.prototype.last = function(){
    return this.goTo(this.count());
};

CookieTable.prototype.prior = function(){
  
    if( this.recNo > 1 ){
        this.goTo(this.recNo - 1);
    }else if( this.recNo === 1){
        this.recNo -= 1;
        this.setEmptyRow();
    }
    
    return this;
    
};

CookieTable.prototype.next = function(){
   
    if( this.recNo < this.count() ){
        this.goTo(this.recNo + 1);
    }else if( this.recNo === this.count() ){
        this.recNo += 1;
        this.setEmptyRow();
    }
    
    return this;
        
};

CookieTable.prototype.isBOF = function(){
    return this.recNo < 1;
};

CookieTable.prototype.isEOF = function(){
    return this.recNo > this.count();
};

CookieTable.prototype.start = function(){
    
    $.cookie.json = true;
    
    var json = $.cookie( this.PREFIX_NAME + this.name );
    
    this.resetData();
    
    if( json ){
        this.fromJSON( json );
    }
    
    this.state = ctStates.BROWSE;
    return this;
    
};

CookieTable.prototype.commit = function(){
  
    if( this.active ){
        $.cookie.json = true;
        $.cookie( this.PREFIX_NAME + this.name, this.toJSON(), { path: '/' } );
        this.state = ctStates.BROWSE;
    }
    
    return this;
    
};

CookieTable.prototype.rollback = function(){
    
    if( this.active ){
        this.start();
    }
    
    return this;
    
};