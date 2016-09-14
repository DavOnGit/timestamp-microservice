const moment = require('moment');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

/*app.get('/', function(req,res) {
    res.send('Hello World!');
});*/

app.get('/:id', function(req, res) {
    var date,
    format = {unix: null, natural:null},
    par = req.params.id;
    
    const filter = [moment.ISO_8601,"MM-DD-YYYY",'MM-DD-YY',"MM DD YYYY",'MM DD YY','LL','ll','MMMM DD, YYYY','MMM DD, YYYY'];
    
    if ( !isNaN(par) && par != 'true' && par != 'false' && +par <= 999999999999999 ) {
        date = moment(+par);
    }
    else if( moment(par, filter, true).isValid() ) {
        date = moment(par, filter, true);
    }
    
    format.unix = date ? date.format('x') : null;
    format.natural = date ? date.format('LL') : null;
    
  res.send(JSON.stringify(format));
});


app.listen(8080, () => { console.log('listening on port 8080...') });