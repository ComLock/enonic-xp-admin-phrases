//import {toStr} from '/lib/enonic/util';
import {connect} from '/lib/xp/node';
import {BRANCH_ID, CT_COUNTRY, REPO_ID} from '/admin/tools/phrases/constants';
import {listCountriesPage} from '/admin/tools/phrases/countries/listCountriesPage';


export function handleCountryPost({
	params: {
		code,
		englishName,
		localizedName
	},
	path
}) {
	const connection = connect({
		repoId: REPO_ID,
		branch: BRANCH_ID
	});
	const createNodeParams = {
		_parentPath: '/countries',
		_name: code,
		//_indexConfig: {default: 'byType'},
		_inheritsPermissions: true,
		//code,
		//displayName: englishName,
		englishName,
		localizedName,
		type: CT_COUNTRY
	};
	const node = connection.create(createNodeParams);
	connection.refresh();
	//log.info(toStr({node}));
	let status = 200;
	const messages = [];
	if (node) {
		messages.push(`Created country: ${englishName}`);
	} else {
		messages.push(`Failed to create country: ${englishName}!`);
		status = 500;
	}
	return listCountriesPage({
		path
	}, {
		messages,
		status
	});
}
