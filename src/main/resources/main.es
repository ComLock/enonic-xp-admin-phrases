import {createRole} from '/lib/xp/auth';
import {run} from '/lib/xp/context';

import {ROLE_PHRASES_ADMIN} from '/admin/tools/phrases/constants';


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
});
