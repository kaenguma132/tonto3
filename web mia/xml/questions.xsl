<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<head>
				<style rel="stylesheet" type="text/css">
					table{width:100%;border:1px solid}
					th{background-color:#cdd8f6}
					td,tr,th{border:1px solid;padding:2px;vertical-align:top}
					span{color:green;padding-left:5px}
				</style>
			</head>
			<body>
				<h2>Corrección</h2>
				<table>
					<tr>
						<th>Pregunta</th>
						<th>Opción</th>
						<th>Respuesta</th>
					</tr>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>

