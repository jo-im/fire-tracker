function(newDoc, oldDoc, userCtx) {
  if('_admin' in userCtx.roles) { return; } /* skip anonymous in Admin Party case; */
  if(!userCtx.name){
    throw({forbidden : 'User not authorized to update/delete documents.'});
  }
  if(newDoc._deleted){
    throw({'forbidden': 'User not allowed to delete documents.'});
  }
}

