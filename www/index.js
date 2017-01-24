import handle from './app.js';
import route from './route.js';
import server from './server.js';
import {list} from './list.js';
handle();
server(route, list);