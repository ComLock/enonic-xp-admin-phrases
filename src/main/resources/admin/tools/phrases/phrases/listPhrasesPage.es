//import {toStr} from '/lib/enonic/util';
import {TOOL_PATH} from '/admin/tools/phrases/constants';
import {htmlResponse} from '/admin/tools/phrases/htmlResponse';
import {getLocales} from '/admin/tools/phrases/locales/getLocales';
import {getPhrases} from '/admin/tools/phrases/phrases/getPhrases';


export function listPhrasesPage(
	{path} = {},
	{messages, status} = {}
) {
	//log.info(toStr({path, messages, status}));
	return htmlResponse({
		path,
		main: `<form action="${TOOL_PATH}/phrases" autocomplete="off" method="POST">
	<fieldset>
		<legend>Add phrase</legend>
		<table>
			<label>
				<span>Key</span>
				<input name="key" type="text"/>
			</label>
			<thead>
				<tr>
					<th>Locale</th>
					<th>Phrase</th>
				</tr>
			</thead>
			<tbody>
				${getLocales().map(({code}) => `<tr>
	<td>${code}</td>
	<td><input name="phrase[${code}]" type="text"/></td>
</tr>`).join('\n')}
			</tbody>
		</table>
		<button type="submit">Add phrase</button>
	</fieldset>
</form>
<table>
	<thead>
		<tr>
			<th>Key</th>
			${getLocales().map(({code}) => `<th>${code}</th>`).join('\n')}
		</tr>
	</thead>
	<tbody>
		${getPhrases().map(({key, locales}) => `<tr>
	<td>${key}</td>
	${getLocales().map(({code}) => `<td>${locales[code]}</td>`).join('\n')}
</tr>`).join('\n')}
	</tbody>
</table>`,
		messages,
		status
	});
}
