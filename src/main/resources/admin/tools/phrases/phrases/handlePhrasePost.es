//import {toStr} from '/lib/enonic/util';
import {sanitize} from '/lib/xp/common';
import {connect} from '/lib/xp/node';
import {BRANCH_ID, CT_PHRASE, REPO_ID} from '/admin/tools/phrases/constants';
import {listPhrasesPage} from '/admin/tools/phrases/phrases/listPhrasesPage';


export function handlePhrasePost({
	params: {
		key,
		...rest
	},
	path
}) {
	//log.info(toStr({key, rest, path}));
	const locales = {};
	Object.keys(rest).forEach((p) => {
		//log.info(toStr({p}));
		const locale = p.replace(/phrase\[/, '').replace(/\]$/, '');
		locales[locale] = rest[p];
	});
	//log.info(toStr({locales}));
	const connection = connect({
		repoId: REPO_ID,
		branch: BRANCH_ID
	});
	const _name = sanitize(key);
	const createNodeParams = {
		_parentPath: '/phrases',
		_name,
		_inheritsPermissions: true,
		locales,
		type: CT_PHRASE
	};
	const node = connection.create(createNodeParams);
	connection.refresh();
	//log.info(toStr({node}));
	let status = 200;
	const messages = [];
	if (node) {
		messages.push(`Created phrase: ${_name}`);
	} else {
		messages.push(`Failed to create phrase: ${_name}!`);
		status = 500;
	}
	return listPhrasesPage({
		path
	}, {
		messages,
		status
	});
}
