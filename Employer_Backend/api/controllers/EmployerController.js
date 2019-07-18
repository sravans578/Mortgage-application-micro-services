/**
 * BrokerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var request = require('request');
const { performance } = require('perf_hooks')
module.exports = {

login : async function(req,res){
  
  var uname = req.body.username;
  var pwd = req.body.password;
		if(uname == "" || pwd == "") {
			res.send("No username or password specified!",500);
    }
    else{
     await Employer.find( { "employeeID": uname , "password": pwd}).exec(function(err,result){
          if (err) {
                sails.log.debug('Some error occured ' + err);
                return res.json(500, { error: 'Please enter valid user name and password' });
            }
            else
                {
                  if(result != ""){
                sails.log.debug('Success', JSON.stringify(result));
                   res.json(200, {login : "success"});
                  }
                else
                  {
                    return res.json(500, { error: 'Please enter valid user name and password' });
                  }
                 
                } 
      });

    }

},

recieveFromEmployer : async function(req,res) {
  console.log("REached here");
  var t0 = performance.now(); // starting timer 
  var empid = req.body.employeeID;
  var appno = req.body.appno;
  var url = req.body.url;
  var employee;
  if( empid != ""){
    employee = await Employer.findOne({employeeID:empid}) 
  }
  else{
    res.json(500, { error: 'Enter employee id' });
  }
  //console.log(employee,"when employee is mnull");

  if(employee != " " && employee != undefined)
  {  
//url="https://prod-29.canadacentral.logic.azure.com:443/workflows/17dc5a6fb1fc44f294e45298b92d38c4/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZTKHLHeZ2Jj-eWAbey1FGbgQuiDGoKbmOiQh6bZgBCY";
request.post(url, { json : { appno : appno , "salary": employee.salary , "employment_len": employee.length}
}, function(error, response, body) {
  
if (error) {
  sails.log.error(error);
  return res.json(500, { error: 'Unable to make post call' });
}
else {
console.log("success");
}
});

var t1 = performance.now();
console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")

return res.send("ok");
}
else 
{
  return res.json(500, { error: 'Enter valid employee id' });
}
},

test : async function(req,res) {

  var t0 = performance.now();

  // write code here 

  var t1 = performance.now();

  return res.json({response : (t1- t0)});

}


};

