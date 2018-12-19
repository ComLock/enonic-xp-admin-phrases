import {connect} from '/lib/xp/node';

import {BRANCH_ID, CT_LOCALE, REPO_ID} from '/admin/tools/phrases/constants';


export function getLocales() {
	const connection = connect({
		repoId: REPO_ID,
		branch: BRANCH_ID
	});
	const queryRes = connection.query({
		count: -1,
		filters: {
			boolean: {
				must: [{
					hasValue: {
						field: 'type',
						values: [CT_LOCALE]
					}
				}]
			}
		},
		query: '', //"_parentPath = '/locales'",
		sort: '_name ASC'
	});
	const locales = queryRes.hits.map((hit) => {
		const {
			_name: code, languageCode, countryCode, fallbackLocaleCode = ''
		} = connection.get(hit.id);
		return {
			code, languageCode, countryCode, fallbackLocaleCode
		};
	});
	return locales;
}
