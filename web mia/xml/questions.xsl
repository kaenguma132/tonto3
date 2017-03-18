<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<head>
				<link rel='stylesheet' href='../css/xsl.css' />
			</head>
			<body>
				<h2>Corrección</h2>
				<table>
					<tr>
						<th>Pregunta</th>
						<th>Opción</th>
						<th>Respuesta</th>
					</tr>
					<xsl:for-each select="questions/question">
						<tr>
							<td><xsl:value-of select="title"/></td>
							<td>
								<xsl:for-each select="answer">
									<xsl:choose>
										<xsl:when test="../type = 'text'">
											<xsl:value-of select="text()"/>
										</xsl:when>
									</xsl:choose>
								</xsl:for-each>
								<xsl:for-each select="option">
									<xsl:variable name="posicion" select="position()-1"/>
									Opción <xsl:value-of select="$posicion+1"/>: <xsl:value-of select="text()"/>
									<br/>
									<xsl:for-each select="../answer">
										<xsl:variable name="respuestacorrecta" 
											select="text()"/>
											<xsl:if test="$posicion=$respuestacorrecta">
												<span>&#x2713;</span>
											</xsl:if>
									</xsl:for-each>
								</xsl:for-each>
							</td>
						</tr>
					</xsl:for-each>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>

