const moment = require('moment');
const express = require('express');
const app = express();

app.set('strict routing', true);
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('json spaces', 4);

app.get('/:id', function(req, res) {
    var date,
    format = {unix: null, natural: null},
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
    
    res.setHeader('Content-Type', 'application/json');
    res.send(format);
});


app.listen( app.get('port'), () => {
    console.log('listening on port: ' + app.get('port'));
});