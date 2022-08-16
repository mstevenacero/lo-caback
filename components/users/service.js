import abstractService from '../../services/abstractService.js';

import users from './users.js'
import counts from '../counts/counts.js'

//Relations
users.hasMany(counts,{    
    foreignKey: 'id_user'   
 })

class UserService extends abstractService {

    constructor(){
        super()
        const relations = {   
            include: [
                {
                    model :counts,
                   
                }
            ]
        }    

        this.setRelations(relations)
        this.setModel(users)
        
    }

}

export default UserService;