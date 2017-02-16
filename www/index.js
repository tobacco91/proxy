import handle from './app.js';
import route from './lib/route.js';
import server from './lib/server.js';
import {list} from './lib/list.js';
handle();
server(route, list); 