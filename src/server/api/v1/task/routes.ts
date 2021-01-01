import { Router } from 'express';
import { endpointNotFound } from 'server/response';
import ensureLoggedIn from 'server/lib/auth/ensureLoggedIn';

import taskList from './task-list';
import taskDetail from './task-detail';
import taskCreate from './task-create';
import taskUpdate from './task-update';
import taskComplete from './task-complete';
import taskDelete from './task-delete';

const router = Router();

router.all('/*', [ensureLoggedIn]);

router.get('/list/:status/:sortField/:sortDir/:limit/:offset', taskList);
router.get('/:id', taskDetail);

router.post('/', taskCreate);

router.put('/', taskUpdate);
router.put('/complete', taskComplete);

router.delete('/:id', taskDelete);

// route not found
router.all('/*', endpointNotFound);

export default router;
