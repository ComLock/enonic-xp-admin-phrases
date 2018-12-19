import {getToolUrl} from '/lib/xp/admin';
import {sanitize} from '/lib/xp/common';

export const CT_COUNTRY = `${app.name}:country`;
export const CT_FOLDER = `${app.name}:folder`;
export const CT_LANGUAGE = `${app.name}:language`;
export const CT_LOCALE = `${app.name}:locale`;
export const CT_PHRASE = `${app.name}:phrase`;

export const BRANCH_ID = 'master';
export const REPO_ID = sanitize(app.name);
export const ROLE_PHRASES_ADMIN = sanitize(`${app.name}.admin`);
export const TOOL_PATH = getToolUrl(app.name, 'phrases');
