# angularjs-sdco-slides

## Description

Angular library to help create your own slides.

## System Requirements

<ul>
 <li>node/npm</li>
 <li>global bower executable</li>
 <li>global gulp executable</li>
</ul>

## Installation

<h3> Create a local bower project with needed dependencies </h3>

<ul>
	<li>Initialize a new bower project: bower init</li>
	<li>Add the angular-sdco-slides dependency: bower --save install angular-sdco-slides</li>
</ul>

<h2> Create and edit your entry point html file </h2>

<p> Your html file will need to import some stylesheets and js files in order to use this library. </p>
<p> Include stylesheets (path depends where you bower dependencies are located and how you serve them) </p>
<pre>
&lt;link rel="stylesheet" href="/bootstrap/dist/css/bootstrap.css"&gt;
&lt;link rel="stylesheet" href="/angular-sdco-tools/dist/styles/angular-sdco-tools.css"&gt;
&lt;link rel="stylesheet" href="/angular-sdco-slides/dist/styles/angular-sdco-slides.css"&gt;
</pre>

<p> Include javascript </p>
<pre>
&lt;script src="/jquery/dist/jquery.js"&gt;&lt;/script&gt;
&lt;script src="/angular/angular.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script src="/angular-route/angular-route.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script src="/angular-animate/angular-animate.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script src="/angular-sanitize/angular-sanitize.min.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script src="/angular-bootstrap/ui-bootstrap-tpls.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script src="/angular-sdco-tools/dist/js/angular-sdco-tools.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script src="/angular-sdco-slides/dist/js/angular-sdco-slides.js" type="text/javascript"&gt;&lt;/script&gt;	
</pre>

<p> Use the directive which owns all the behavior </p>
<pre>
	&lt;sdco-slidescontainer
            progress-bar-display="global"
        &gt;
	&lt;/sdco-slidescontainer&gt;
</pre>

<h2>Edit your slides</h2>

<p> 
 At this point, you only have to edit your new slides. Have a look at <b>src/sample</b> to view the folder structure (don't report to this sample to know which js/css files you have to include, it uses the splited file which are not distributed through bower instead of the whole library).
<p>

<ul>
 <li> Create a <b>data/slides.json</b> and define your templates pathes 
 (each template is a slide, by default "templateName" will be resolved as "views/partials/teplateName.html")
  <pre>
{
	"templates":[
		"templateOne", 
		"templateTwo"
	]
}
  </pre>
 </li>
 <li> Define your slides content.  In <b>views/partials/</b>, create the file <b>templateOne.html</b> 
 and <b>templateTwo.html</b> and add them the following content:
  <pre>
&lt;div&gt;
 This is my slide content
&lt;/div&gt;
  </pre>
 </li> 
</ul>
</p>

That's it, you can now serve your app.

## API Documentation

Available <a href="http://worldline.github.io/angularjs-sdco-slides/doc/" target="_blank">here</a>

## Sample

<p>
<a href="http://worldline.github.io/angularjs-sdco-slides/sample/" target="_blank">Here</a> is a sample
of slides containing commponents from <a href="https://github.com/worldline/angularjs-sdco-tools" target="_blank">
</p>

<p>
For a full application, have a look at <a href="https://github.com/got5/TrainingAngularJS/tree/slides" target="_blank"> this repo </a>
</p>


