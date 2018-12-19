import {createRole} from '/lib/xp/auth';
import {run} from '/lib/xp/context';
import {connect} from '/lib/xp/node';
import {create as createRepo, createBranch} from '/lib/xp/repo';

import {
	BRANCH_ID, CT_FOLDER, REPO_ID, ROLE_PHRASES_ADMIN
} from '/admin/tools/phrases/constants';


function runAsSu(fn, {
	branch = 'master',
	repository = 'system-repo'
} = {}) {
	return run({
		branch,
		repository,
		user: {
			login: 'su',
			userStore: 'system'
		},
		principals: ['role:system.admin']
	}, () => fn());
}


function ignoreErrors(fn) {
	let rv;
	try {
		rv = fn();
	} catch (e) {
		// no-op
	}
	return rv;
}


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
			rootPermissions: [{
				principal: 'role:system.admin',
				allow: [
					'READ',
					'CREATE',
					'MODIFY',
					'DELETE',
					'PUBLISH',
					'READ_PERMISSIONS',
					'WRITE_PERMISSIONS'
				],
				deny: []
			}, {
				principal: `role:${ROLE_PHRASES_ADMIN}`,
				allow: [
					'READ',
					'CREATE',
					'MODIFY',
					'DELETE'
				],
				deny: []
			}, {
				principal: 'role:system.everyone', //'role:system.authenticated',
				allow: ['READ'],
				deny: []
			}]
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
				type: CT_FOLDER
			});
		});
	});
});
