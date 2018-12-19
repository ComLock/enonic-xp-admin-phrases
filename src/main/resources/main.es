import {createRole} from '/lib/xp/auth';
import {sanitize} from '/lib/xp/common';
import {run} from '/lib/xp/context';


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
			name: sanitize(`${app.name}.admin`),
			displayName: 'Phrases Administrator',
			description: 'This role gives permissions to the Phrases Admin application.'
		});
	});
});
