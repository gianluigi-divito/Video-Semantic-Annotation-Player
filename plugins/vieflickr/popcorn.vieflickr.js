// PLUGIN: vieflickr

var scriptlevel = 1;
var layerindex  = 1;

(function (Popcorn) {
  
  /**
   * Lower Third popcorn plug-in 
   * Displays information about a speaker over the video, or in the target div
   * Options parameter will need a start, and end.
   * Optional parameters are target, salutation, name and role.
   * Start is the time that you want this plug-in to execute
   * End is the time that you want this plug-in to stop executing
   * Target is the id of the document element that the content is
   *  appended to, this target element must exist on the DOM
   * salutation is the speaker's Mr. Ms. Dr. etc.
   * name is the speaker's name.
   * role is information about the speaker, example Engineer.
   * 
   * @param {Object} options
   * 
   * Example:
     var p = Popcorn('#video')
        .vieflickr({
          start:    5,                 // seconds, mandatory
          end:      15,                // seconds, mandatory
          x:     	0,          	   // x coordinate, mandatory
          y:        0,			       // y coordinate, mandatory
		  width:    0,			       // box width, mandatory
		  height:   0,			       // box height, mandatory
          border:   'solid',      	   // optional
          target:   'subtitlediv'      // optional,
		  type:		'circle'		   // optional
        } )
   *
   */
   
  var path = "http://pc-notubedev:8080/popvideotest/";
  
Popcorn.getScript(
	path+"plugins/vieflickr/lib/jquery-ui-1.8.16.js",
	function() {
	Popcorn.getScript(
	path+"plugins/vieflickr/lib/underscore.js",
  function() {
  Popcorn.getScript(
	path+"plugins/vieflickr/lib/backbone.js",
  function() {
  Popcorn.getScript(
	path+"plugins/vieflickr/lib/vie.js",
  function() {
  Popcorn.getScript(
	path+"plugins/vieflickr/lib/schema.json",
  function() {
  Popcorn.getScript(
	path+"plugins/vieflickr/lib/wrapper.js",
  function() {
  Popcorn.getScript(
	path+"plugins/vieflickr/lib/vie.widget.image_search.js",
  function() {
	//console.log("ok","ok");
  }
);
  }
);
  }
);
  }
);
  }
);
  }
);
}
);

  Popcorn.plugin( "vieflickr" , {
    
      manifest: {
        about:{
          name: "Popcorn vieflickr Plugin",
          version: "0.2",
          author: "Gasfirane",
          website: "http://www.malmostosi.it/"
        },
        options:{
          start : {elem:'input', type:'text', label:'In'},
          end : {elem:'input', type:'text', label:'Out'},
          target : 'vieflickr-container',
          about : {elem:'input', type:'text', label:'Text'},
          typeof : {elem:'input', type:'text', label:'Text'},
		  property : {elem:'input', type:'text', label:'Text'},
		  propvalue : {elem:'input', type:'text', label:'Text'}
		  }
      },
	  _setup : function( options ) {
	  /*
		if (layerindex==1){	  
			importclass(path+"plugins/vieflickr/lib/jquery-ui-1.8.16.js");
			importclass(path+"plugins/vieflickr/lib/underscore.js");
			importclass(path+"plugins/vieflickr/lib/backbone.js");
			importclass(path+"plugins/vieflickr/lib/vie.js");
			importclass(path+"plugins/vieflickr/lib/schema.json");
			importclass(path+"plugins/vieflickr/lib/wrapper.js");
			importclass(path+"plugins/vieflickr/lib/vie.widget.image_search.js");
			layerindex++;
		}
	  */
	  
		this.viesupp = document.createElement('span');
		this.viesupp.setAttribute("typeof",options.typeof);
		this.viesupp.setAttribute("about",options.about);
		var viestyle = "display: none; visibility: hidden;";
		this.viesupp.setAttribute("style",viestyle);
		
		this.viesupp2 = document.createElement('span');
		this.viesupp2.setAttribute("property",options.property);
		//console.log("options.text",options.propvalue);
		newContent = document.createTextNode(options.propvalue);
		this.viesupp2.appendChild(newContent);
		this.viesupp.appendChild(this.viesupp2);
		document.getElementById(options.target).appendChild(this.viesupp);
		
		  },
      /**
       * @member vieflickr
       * The start function will be executed when the currentTime
       * of the video reaches the start time provided by tdhe
       * options variable
       */
      start: function(event, options){
	  		
		// initialize a global VIE object only the fust time
		if (scriptlevel==1)
		{
  		var myVIE = window.myVIE = new VIE();
		myVIE.loadSchemaOrg();

		// read RDFa from the text below
		myVIE.use(new myVIE.RdfaService);
		
		myVIE.load({element: $('[about]')})
		.from('rdfa').execute();	

		$('#' + options.target)
		.vieImageSearch({
			vie    : myVIE,
			bin_size: 8,
			services : {
				flickr : {
					api_key : "ffd6f2fc41249feeddd8e62a531dc83e",
					use: true
				},
				gimage : {
					use: true
				}
			}
		});
		scriptlevel++;
		}
		var uri = options.about;
		//console.log("URI: ", uri);
//		alert('#' + options.target);

		$('#' + options.target)
		.vieImageSearch({
			entity: uri
		});
	  
        //options.container.style.visibility="visible";
		/*
        this.container.style.top = document.getElementById("mp4").style.top + this.position().top + "px";
		this.container.style.left = document.getElementById("mp4").style.left + this.position().left + "px";
		
		var txt = document.createTextNode("TOP = " + document.getElementById("mp4").style.top + " - " + this.container.style.top);
		document.getElementById("debug").appendChild(txt);
		var txt = document.createTextNode("LEFT = " + document.getElementById("mp4").style.left + " - " + this.container.style.left);
		document.getElementById("debug").appendChild(txt);
		*/
		
      },
      /**
       * @member vieflickr
       * The end function will be executed when the currentTime
       * of the video reaches the end time provided by the
       * options variable
       */
      end: function(event, options){
  		//var txt = document.createTextNode(" Stop Name = " + options.id);	
		//document.getElementById("debug").appendChild(txt);
		//document.getElementById(options.id).style.visibility = "hidden";
		//document.getElementById("video").parentNode.removeChild(document.getElementById(options.id));
        //options.container.style.visibility="hidden";
		//console.log("END");
		//console.log("#" + options.target);
		$('#' + options.target).html("");
      }
  } );
})( Popcorn );

/*
function createLayer(options)
{

	this.layout = document.createElement('div');
	this.layout.setAttribute("id",options.id);
	
	var bstyle = "position:absolute;width:480px;height:360px;z-index:2;left: 20px;top: 20px; overflow: hidden; z-index:" + layerindex;
	
	this.layout.setAttribute("style",bstyle);
	
	this.container = document.createElement('div');
	
	if (options.type=='circle')
	{
		var cstyle = "background-color: "+options.color+";-moz-border-radius: "+options.width/2+"px;-webkit-border-radius: "+options.width/2+"px;";
		this.container.setAttribute("style",cstyle);
		this.container.style.width = options.width + "px";
		this.container.style.height = options.width + "px";
		this.container.style.top = (parseInt(options.top)-(options.width/2)) + "px";  
		this.container.style.left = (parseInt(options.left)-(options.width/2)) + "px";
		//alert(cstyle);
	}
	else
	{
		this.container.style.width = options.width + "px";
		this.container.style.height = options.height + "px";
		this.container.style.top = options.top + "px";  
		this.container.style.left = (parseInt(options.left) + 25) + "px";
	}
	
	this.container.setAttribute("class","vieflickr")
	this.container.style.opacity = 0.4;
	this.container.style.filter = 'alpha(opacity=40)';
	//this.container.setAttribute("id",options.id)

	this.container.style.position = "relative";
	this.container.style.color = "#"+options.color;
	this.container.style.backgroundColor = "#"+options.color;
	this.container.style.borderStyle = options.border;
	this.container.style.borderWidth = "2px";
	
	this.layout.appendChild(this.container);
	document.getElementById("video").parentNode.appendChild(this.layout);
	layerindex++;
}
*/

function importclass(jsFile) {
	var km_scripts = new Object();
	if (km_scripts[jsFile] != null) return;
	var scriptElt = document.createElement('script');
	scriptElt.type = 'text/javascript';
	scriptElt.src = jsFile;
	document.getElementsByTagName('head')[0].appendChild(scriptElt);
	km_scripts[jsFile] = jsFile; // or whatever value your prefer
	//alert(jsFile);
}