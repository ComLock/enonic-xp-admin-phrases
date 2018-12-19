import {TOOL_PATH} from '/admin/tools/phrases/constants';
//import {assetUrl} from '/lib/xp/portal';


export function htmlResponse({
	main = '',
	path = TOOL_PATH,
	title = '',
	status = 200
} = {}) {
	//const assetUri = getAssetsUri(); log.info(toStr({assetUri}));
	const relPath = path.replace(TOOL_PATH, ''); //log.info(toStr({relPath}));
	const preTitle = title ? `${title} - ` : '';
	return {
		body: `<html>
	<head>
		<title>${preTitle}Phrases admin</title>
		<style type="text/css">
			* {
				box-sizing: border-box;
			}
			body {
				margin: 0
			}
			nav {
				background-color: #595959;
			}
			nav ul {
				list-style-type: none;
				margin: 0;
				padding: 0;
			}
			nav ul li {
				display: inline-block;
			}
			nav ul li a {
				color: #ffffff;
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
				display: inline-block;
				padding: 15px;
				text-decoration: none;
			}
			nav ul li a.current {
				background-color: #ffffff;
				color: #595959;
			}
			nav ul li a:hover {
				background-color: #2e2eff;
				color: #ffffff;
			}
			main {
				padding: 15px;
			}
			label {
				display: block;
			}
			table {
				border-collapse: collapse;
			}
			th {
				text-align: left;
			}
			th, td {
				border: 1px solid #595959;
				padding: 5px;
			}
		</style>
	</head>
	<body>
		<nav>
			<ul>
				<li><a class="${relPath === '' ? 'current' : ''}" href="${TOOL_PATH}">Phrases</a></li>
				<li><a class="${relPath.startsWith('/languages') ? 'current' : ''}" href="${TOOL_PATH}/languages">Languages</a></li>
			</ul>
		</nav>
		<main>${main}</main>
	</body>
</html>`,
		contentType: 'text/html; charset=utf-8',
		status
	};
}
