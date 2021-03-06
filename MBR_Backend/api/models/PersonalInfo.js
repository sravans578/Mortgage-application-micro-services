/**
 * PersonalInfo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
    name:{
        type : 'string',
        required: true
    },
    address:{
        type:'string',
        required: true
    },
    phone:{
        type:'string',
        required: true
    },
    aboutEmployer:{
        type:'string'
    },
    status:{
        type:'string',
        defaultsTo: "Pending"
    }
}
};