import {getToolUrl} from '/lib/xp/admin';
import {sanitize} from '/lib/xp/common';


export const ROLE_PHRASES_ADMIN = sanitize(`${app.name}.admin`);
export const TOOL_PATH = getToolUrl(app.name, 'phrases');
