import newRouter from '/lib/router';
import {hasRole} from '/lib/xp/auth';

import {ROLE_PHRASES_ADMIN, TOOL_PATH} from '/admin/tools/phrases/constants';

import {createLanguageFormPage} from '/admin/tools/phrases/languages/createLanguageFormPage';
import {listLanguagesPage} from '/admin/tools/phrases/languages/listLanguagesPage';

import {createPhraseFormPage} from '/admin/tools/phrases/phrases/createPhraseFormPage';
import {listPhrasesPage} from '/admin/tools/phrases/phrases/listPhrasesPage';


const router = newRouter();


router.filter((req) => {
	if (!hasRole(ROLE_PHRASES_ADMIN)) { return { status: 401 }; }
	const relPath = req.path.replace(TOOL_PATH, '');
	if (!relPath) { return listPhrasesPage(req); }

	if (relPath.startsWith('/languages/createform')) { return createLanguageFormPage(req); }
	if (relPath.startsWith('/languages')) { return listLanguagesPage(req); }

	if (relPath.startsWith('/phrases/createform')) { return createPhraseFormPage(req); }
	//if (relPath.startsWith('/phrases')) { return listPhrasesPage(req); }

	return listPhrasesPage(req);
});


export function all(req) {
	return router.dispatch(req);
}
