import {connect} from '/lib/xp/node';

import {BRANCH_ID, CT_PHRASE, REPO_ID} from '/admin/tools/phrases/constants';


export function getPhrases() {
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
						values: [CT_PHRASE]
					}
				}]
			}
		},
		query: '', //"_parentPath = '/phrases'",
		sort: '_name ASC'
	});
	const phrases = queryRes.hits.map((hit) => {
		const {_name: key, locales} = connection.get(hit.id);
		return {
			key,
			locales
		};
	});
	return phrases;
}
