import {toStr} from '/lib/enonic/util';
import newRouter from '/lib/router';
import {hasRole} from '/lib/xp/auth';

import {
	PHRASES_TOOL_PATH,
	ROLE_PHRASES_ADMIN
} from '/lib/enonic/phrases/constants';

import {handleCountryPost} from '/lib/enonic/phrases/admin/countries/handleCountryPost';
import {listCountriesPage} from '/lib/enonic/phrases/admin/countries/listCountriesPage';

import {handleLanguagePost} from '/lib/enonic/phrases/admin/languages/handleLanguagePost';
import {listLanguagesPage} from '/lib/enonic/phrases/admin/languages/listLanguagesPage';

import {handleLocalePost} from '/lib/enonic/phrases/admin/locales/handleLocalePost';
import {listLocalesPage} from '/lib/enonic/phrases/admin/locales/listLocalesPage';

import {handlePhrasePost} from '/lib/enonic/phrases/admin/phrases/handlePhrasePost';
import {listPhrasesPage} from '/lib/enonic/phrases/admin/phrases/listPhrasesPage';


const router = newRouter();


router.filter((req) => {
	log.info(toStr({method: req.method}));
	if (!hasRole(ROLE_PHRASES_ADMIN)) { return { status: 401 }; }
	const relPath = req.path.replace(PHRASES_TOOL_PATH, ''); log.info(toStr({relPath}));
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
