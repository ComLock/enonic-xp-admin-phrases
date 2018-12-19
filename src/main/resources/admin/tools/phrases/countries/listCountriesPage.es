//import {toStr} from '/lib/enonic/util';
import {connect} from '/lib/xp/node';

import {
	BRANCH_ID, CT_COUNTRY, REPO_ID, TOOL_PATH
} from '/admin/tools/phrases/constants';
import {htmlResponse} from '/admin/tools/phrases/htmlResponse';


export function listCountriesPage(
	{path} = {},
	{messages, status} = {}
) {
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
						values: [CT_COUNTRY]
					}
				}]
			}
		},
		query: '', //"_parentPath = '/countries'",
		sort: '_name ASC'
	});
	const countryRows = queryRes.hits.map((hit) => {
		const {_name: code, englishName, localizedName} = connection.get(hit.id);
		return `<tr>
	<td>${code}</td>
	<td>${englishName}</td>
	<td>${localizedName}</td>
</tr>`;
	}).join('\n');

	return htmlResponse({
		title: 'Countries',
		path,
		main: `<form action="${TOOL_PATH}/countries" autocomplete="off" method="POST">
	<fieldset>
		<legend>Add country</legend>
		<label>
			<span>Country code (ISO 3166-1 Alpha-2)</span>
			<input name="code" type="text"/>
		</label>
		<label>
			<span>English name of Country</span>
			<input name="englishName" type="text"/>
		</label>
		<label>
			<span>Localized name of Country</span>
			<input name="localizedName" type="text"/>
		</label>
		<a href="https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes" target="_blank">List of ISO 3166 country codes</a>
		<button type="submit">Add country</button>
	</fieldset>
</form>
<table>
	<thead>
		<tr>
			<th>Code</th>
			<th>English name</th>
			<th>Localized name</th>
		</tr>
	</thead>
	<tbody>
		${countryRows}
	</tbody>
</table>`,
		messages,
		status
	});
}
