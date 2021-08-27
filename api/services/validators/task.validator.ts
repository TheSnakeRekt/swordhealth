
import { body } from 'express-validator';

export class TaskValidator {

    static checkTask(){
      return [ 
            body('description').notEmpty().isLength({max:2500}).withMessage('A task summary is required (max 2500 chars).'), 
            body('done_date').notEmpty().withMessage('A date for when the task was performed must be provided.')
        ];
    }
}