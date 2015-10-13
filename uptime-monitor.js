var PushBullet = require('pushbullet');                                                                                                              
                                                                                                                                                     
var UP = 'Available';                                                                                                                                
var DOWN = 'Unreachable';                                                                                                                            
                                                                                                                                                     
if( process.env.PUSHBULLET ) {                                                                                                                       
  var pusher = new PushBullet(process.env.PUSHBULLET);                                                                                               
} else {                                                                                                                                             
  console.error("Unable to find PUSHBULLET environment variable, exiting...");                                                                       
  process.exit(1);                                                                                                                                   
}                                                                                                                                                    
                                                                                                                                                     
var notify = function(config, status) {                                                                                                              
  console.log(config.name+": status is "+status);                                                                                                    
  if( typeof config.status === 'undefined' ) {                                                                                                       
    console.log(config.name+": First check, assume no notification needed");                                                                         
    config.status = status;                                                                                                                          
  }                                                                                                                                                  
  if ( config.status == status) {                                                                                                                    
    console.log(config.name+": website already in this state, no notification sent");   
} else {                                                                                                                                           
    pusher.note(undefined, 'UpTime: '+config.name+' ' +status, config.name+' uptime changed and is now '+status, function(error, response) {         
      if( error ) {                                                                                                                                  
        console.error(config.name+': Failed to send notification to pushbullet');                                                                    
      } else {                                                                                                                                       
         console.info(config.name+': Successfully sent notification to pushbullet');                                                                 
         config.status = status;                                                                                                                     
      }                                                                                                                                              
    });                                                                                                                                              
  }                                                                                                                                                  
};                                                                                                                                                   
                                                                                                                                                     
var Monitor = require('ping-monitor');                                                                                                               
var createMonitor = function(config, callback) {                                                                                                     
  var website = new Monitor(config);                                                                                                                 
  website.on('error', function (msg) {                                                                                                               
    notify(config, DOWN);                                                                                                                            
  });                                                                                                                                                
  website.on('down', function (msg) {                                                                                                                
    notify(config, DOWN);                                                                                                                            
  });                                                                                                                                                
  website.on('up', function (msg) {                                                                                                                  
    notify(config, UP);                                                                                                                              
  });                                                                                                                                                
  callback(null);                                                                                                                                    
}                                                                                                                                                    
                                                                                                                                                     
var async = require('async');                                                                                                                        
var config = require('./config.json');                                                                                                               
async.each( config, createMonitor );      
