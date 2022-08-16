import abstractService from '../../services/abstractService.js';

import counts from './counts.js'
//import user from '../users/users.js'

//Relations
  //users.hasMany("",{                    
 
///})

class countsService extends abstractService {

    constructor(){
        super()
        const relations = {   
            include: [
                {
                   
                }
            ]
        }    

        //this.setRelations(relations)
        this.setModel(counts)
        
    }

}

export default countsService;