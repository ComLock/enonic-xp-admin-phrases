import {toStr} from '/lib/enonic/util';
import newRouter from '/lib/router';
import {hasRole} from '/lib/xp/auth';

import {ROLE_PHRASES_ADMIN, TOOL_PATH} from '/admin/tools/phrases/constants';

import {handleCountryPost} from '/admin/tools/phrases/countries/handleCountryPost';
import {listCountriesPage} from '/admin/tools/phrases/countries/listCountriesPage';

import {handleLanguagePost} from '/admin/tools/phrases/languages/handleLanguagePost';
import {listLanguagesPage} from '/admin/tools/phrases/languages/listLanguagesPage';

import {handleLocalePost} from '/admin/tools/phrases/locales/handleLocalePost';
import {listLocalesPage} from '/admin/tools/phrases/locales/listLocalesPage';

import {handlePhrasePost} from '/admin/tools/phrases/phrases/handlePhrasePost';
import {listPhrasesPage} from '/admin/tools/phrases/phrases/listPhrasesPage';


const router = newRouter();


router.filter((req) => {
	log.info(toStr({method: req.method}));
	if (!hasRole(ROLE_PHRASES_ADMIN)) { return { status: 401 }; }
	const relPath = req.path.replace(TOOL_PATH, ''); log.info(toStr({relPath}));
	if (!relPath) { return listPhrasesPage(req); }

	if (relPath.startsWith('/countries')) {
		if (req.method === 'POST') { return handleCountryPost(req); }
		return listCountriesPage(req);
	}

	if (relPath.startsWith('/languages')) {
		if (req.method === 'POST') { return handleLanguagePost(req); }
		return listLanguagesPage(req);
	}

	if (relPath.startsWith('/locales')) {
		if (req.method === 'POST') { return handleLocalePost(req); }
		return listLocalesPage(req);
	}

	if (relPath.startsWith('/phrases')) {
		if (req.method === 'POST') { return handlePhrasePost(req); }
		return listPhrasesPage(req);
	}

	return listPhrasesPage(req);
});


export function all(req) {
	return router.dispatch(req);
}
