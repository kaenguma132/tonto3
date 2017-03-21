var formElement = null;
var res_dbz1_text = null;
var res_dbz2_text = null;
var res_dbz3_sel = null;
var res_dbz4_sel = null;
var res_dbz5_mul = [];
var res_dbz6_rad = null;
var res_dbz7_chb = [];
var res_dbz8_chb = [];
var res_dbz9_rad = null;
var res_dbz10_mul = [];
var nota = 0;  //nota de la prueba sobre 10 puntos (hay 10 preguntas)
var docXML; //variable para documento XML global, para modificarlo y serializarlo (y sacarlo por pantalla)
var docXSL = null; // variable para documento XSL
var useranswer = null; // variables para crear el elemento de respuesta del usuairo en el XML

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function()
{
	//LEER XML de xml/questions.xml
	var httpXML = new XMLHttpRequest();
	httpXML.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			gestionarXml(this);
		}
	};
	httpXML.open("GET", "xml/questions.xml", true);
	httpXML.send();

	//LEER XSL de xml/questions.xml
	var httpXSL = new XMLHttpRequest();
	httpXSL.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200)
		{
			docXSL=this.responseXML;
		}
	};
	httpXSL.open("GET", "xml/questions.xsl", true);
	httpXSL.send();
	//CORREGIR al apretar el botón
	formElement=document.getElementById('formDBZ');
	formElement.onsubmit=function()
	{
		inicializar();
		// correcion pregunta 1
		corregirTexto(formElement.getElementsByClassName("texto")[0].value, 
			res_dbz1_text, docXML.getElementById("dbz01"));
		// correcion pregunta 2
		corregirTexto(formElement.getElementsByClassName("texto")[1].value, 
			res_dbz2_text, docXML.getElementById("dbz02"));
		// correcion pregunta 3
		corregirSelectSimple(formElement.getElementsByTagName("select")[0], 
			res_dbz3_sel, docXML.getElementById("dbz03"));
		// correcion pregunta 4
		corregirSelectSimple(formElement.getElementsByTagName("select")[1], 
			res_dbz4_sel, docXML.getElementById("dbz04"));
		mostrarNota();
		return false;
	}
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// docXML es el documento leido XML. 
function gestionarXml(datosXML)
{
	docXML = datosXML.responseXML; //Parse XML to xmlDoc

	//pregunta 1
	preguntaXML = docXML.getElementsByTagName("title")[0].innerHTML;
	preguntaHTML = document.getElementById("dbz01");
	ponerDatosInputHtml(preguntaHTML, preguntaXML);
	res_dbz1_text = docXML.getElementById("dbz01").getElementsByTagName("answer")[0].innerHTML;

	//pregunta 2
	preguntaXML = docXML.getElementsByTagName("title")[1].innerHTML;
	preguntaHTML = document.getElementById("dbz02");
	ponerDatosInputHtml(preguntaHTML, preguntaXML);
	res_dbz2_text = docXML.getElementById("dbz02").getElementsByTagName("answer")[0].innerHTML;

	//pregunta 3
	preguntaXML = docXML.getElementsByTagName("title")[2].innerHTML;
	preguntaHTML = document.getElementById("dbz03");
	selectHTML = document.getElementsByTagName("select")[0];
	xpath = "/questions/question[@id='dbz03']/option";
	num_opciones = docXML.evaluate(xpath, docXML, null, XPathResult.ANY_TYPE, null);
	ponerDatosSelectHtml(preguntaHTML, preguntaXML, selectHTML, num_opciones);
	res_dbz3_sel = parseInt(docXML.getElementById("dbz03").getElementsByTagName("answer")[0].innerHTML);

	//pregunta 4
	preguntaXML = docXML.getElementsByTagName("title")[3].innerHTML;
	preguntaHTML = document.getElementById("dbz04");
	selectHTML = document.getElementsByTagName("select")[1];
	xpath = "/questions/question[@id='dbz04']/option";
	num_opciones = docXML.evaluate(xpath, docXML, null, XPathResult.ANY_TYPE, null);
	ponerDatosSelectHtml(preguntaHTML, preguntaXML, selectHTML, num_opciones);
	res_dbz4_sel = parseInt(docXML.getElementById("dbz04").getElementsByTagName("answer")[0].innerHTML);
}

//****************************************************************************************************
// poner los datos recibidos en el HTML
function ponerDatosInputHtml(elementoHTML, elementoXML)
{
	elementoHTML.innerHTML = elementoXML;
}

function ponerDatosSelectHtml(elementoHTML, elementoXML, selectHTML, nodos)
{
	elementoHTML.innerHTML = elementoXML;
	var i = 0;
	for (var resultado = nodos.iterateNext(); resultado; resultado = nodos.iterateNext())
	{
		option = document.createElement("option");
		option.text = resultado.innerHTML;
		option.value = i; i++;
		selectHTML.options.add(option);
	}
}

//****************************************************************************************************
//implementación de la corrección

function corregirTexto(valor, correcta, preguntaXML)
{
	if(valor.toLowerCase() == correcta.toLowerCase())
	{
		nota += 1;
	}
	useranswer = docXML.createElement("useranswer");
	useranswer.innerHTML = valor;
	preguntaXML.appendChild(useranswer);
}

function corregirSelectSimple(select, correcta, preguntaXML)
{
	/* 
		respuestaUser es el indice que ha seleccionado el usuario
	*/
	var respuestaUser = select.selectedIndex;
	if(respuestaUser == correcta)
	{
		nota += 1;
	}
	useranswer = docXML.createElement("useranswer");
	useranswer.innerHTML = select[respuestaUser].innerHTML;
	preguntaXML.appendChild(useranswer);
}

function mostrarCorreccion(texto)
{
	var parrafo = document.createElement("p");
	var contenido = document.createTextNode(texto);
	parrafo.appendChild(contenido);
	document.getElementById('correcciones').appendChild(parrafo);
}

function mostrarNota()
{
	document.getElementById('correcciones').style.display = "block";
	//Código transformación xslt con xmlDoc y xslDoc
	if (document.implementation && document.implementation.createDocument)
	{
		xsltProcessor = new XSLTProcessor();
		xsltProcessor.importStylesheet(docXSL);
		resultDocument = xsltProcessor.transformToFragment(docXML, document);
		document.getElementById('correcciones').appendChild(resultDocument);
	}
	mostrarCorreccion("Tu nota es de " + nota + " punto(s) sobre 10.");
	//bloquear formulario (recargar para volver a empezar)
	var e = formElement.elements;
	for (var i = 0, len = e.length; i < len; ++i)
	{
		e[i].disabled = true;
	}
}

function inicializar()
{
	document.getElementById('correcciones').innerHTML = "Aqui ira la nota final";
	nota = 0;
}