/**
 * MBRController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    loginmbr019: function(req,res){
        var uname = req.query.username;
        var pwd = req.query.password;
        if(uname == ""){
            res.send("No username");
        }
		if(uname == "" && pwd == "") {
			res.send("No username or password specified!");
        }
        else{
            MBR.find( { "employeeID": uname , "password": pwd}).exec(function(err,result){
                console.log("result",result);
            if (err) {
                sails.log.debug('Some error occurred ' + err);
                return res.json(300, { error: 'Some error occurred' });
            }
            else
            {
                if(result != ""){
                sails.log.debug('Success', JSON.stringify(result));
                return res.json({ success: 'Login Successful' });
                }
                else
                {
                return res.json({ error: 'Some error occurred' });
                }
            } 
      });

    }
    },
    personalinfo019: function(req, res){

        var name = req.query.name;
        var address = req.query.address;
        var phone = req.query.phone;
        var aboutEmployer = req.query.aboutEmployer;
        // please provide alert for the below errors da anu
        if(name == ""){
            res.send("No name",500);
        }
        if(name == ""){
            res.send("No address",500);
        }
        if(phone == ""){
            res.send("No phoneNumber",500);
        }
        if(aboutEmployer == ""){
            res.send("No Details",500);
        }
        if(aboutEmployer == "" && name == "" && name == "" && phone == ""){
            res.send("Fill in all the details",500);
        }

        PersonalInfo.create({name: name, address: address, phone:phone, aboutEmployer:aboutEmployer}).exec(function(err){
            if(err){
                console.log("error",err);
            }
            PersonalInfo.find( { "name": name,"address":address,"phone":phone}).exec(function(err,result){
                console.log(result);
                if(result.length <=0){
                    res.json({result: false});
                }
                res.json({result: 'Successfully Saved all details',
                            appid: result[0].id,
                            webservice: "https://prod-29.canadacentral.logic.azure.com:443/workflows/17dc5a6fb1fc44f294e45298b92d38c4/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZTKHLHeZ2Jj-eWAbey1FGbgQuiDGoKbmOiQh6bZgBCY"});
            });
        });
    },
    getStatus: function(req,res){
        var appid =req.query.appid;
        console.log("anurag:::",appid);
        PersonalInfo.find({"id":appid}).exec(function(err,result){
            if(err){
                console.log("error",err);
            }
            if(result == ""){
                res.json({ mortgageStatus: "ID not found"});
            }
            else{            
                res.json({ mortgageStatus: result[0].status});
        }
            //console.log(result.status);
        });
    },
    updatestatus: function(req,res){
        var appno =req.body.appno;
        var salary =req.body.salary;
        console.log(req.body);
        if(salary > 25000){
            PersonalInfo.find({"id":appno}).exec(function(err,result){
                if(err){
                    console.log("error",err);
                }
                if(result == ""){
                    res.json({ applicationid: "ID not found"});
                }
                else{            
                    PersonalInfo.updateOne({"id" : appno}).set({status : 'Approved'}).exec(function(err,result){
                        console.log(result);
                        if(err){
                            console.log("error",err);
                        }
                        else if(result != ""){  
                            res.ok();
                        }
                        else{
                            res.json({ statusupdate : "ID not found"});
                        }
                    });
            }
        });
        }
        else{
            res.send("Sorry Not eligible");
        }

    }

};

