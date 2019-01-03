import {createRole} from '/lib/xp/auth';
import {connect} from '/lib/xp/node';
import {create as createRepo, createBranch} from '/lib/xp/repo';

import {
	BRANCH_ID, NT_FOLDER, REPO_ID, ROLE_PHRASES_ADMIN,
	ROOT_PERMISSION_PHRASES_ADMIN,
	ROOT_PERMISSION_SYSTEM_ADMIN,
	ROOT_PERMISSION_SYSTEM_EVERYONE_CAN_READ
} from '/lib/enonic/phrases/constants';
import {ignoreErrors} from '/lib/enonic/phrases/ignoreErrors';
import {runAsSu} from '/lib/enonic/phrases/runAsSu';


runAsSu(() => {
	ignoreErrors(() => {
		createRole({
			name: ROLE_PHRASES_ADMIN,
			displayName: 'Phrases Administrator',
			description: 'This role gives permissions to the Phrases Admin application.'
		});
	});

	ignoreErrors(() => {
		createRepo({
			id: REPO_ID,
			rootPermissions: [
				ROOT_PERMISSION_PHRASES_ADMIN,
				ROOT_PERMISSION_SYSTEM_ADMIN,
				ROOT_PERMISSION_SYSTEM_EVERYONE_CAN_READ
			]
		});
	});

	ignoreErrors(() => {
		createBranch({
			branchId: BRANCH_ID,
			repoId: REPO_ID
		});
	});

	const connection = connect({
		repoId: REPO_ID,
		branch: BRANCH_ID
	});
	[
		'countries',
		'languages',
		'locales',
		'phrases'
	].forEach((_name) => {
		ignoreErrors(() => {
			connection.create({
				_name,
				_inheritsPermissions: true,
				type: NT_FOLDER
			});
		});
	});
});
