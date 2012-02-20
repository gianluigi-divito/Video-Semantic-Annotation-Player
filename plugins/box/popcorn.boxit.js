// PLUGIN: boxit

var layerindex = 1;

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
        .boxit({
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

  Popcorn.plugin( "boxit" , {
    
      manifest: {
        about:{
          name: "Popcorn boxit Plugin",
          version: "0.2",
          author: "Gasfirane",
          website: "http://www.malmostosi.it/"
        },
        options:{
          start : {elem:'input', type:'text', label:'In'},
          end : {elem:'input', type:'text', label:'Out'},
          target : 'boxit-container',
          top : {elem:'input', type:'text', label:'Text'},
          left : {elem:'input', type:'text', label:'Text'},
          width : {elem:'input', type:'text', label:'Text'},
          height : {elem:'input', type:'text', label:'Text'},
          border : {elem:'input', type:'text', label:'Text'},
		  id : {elem:'input', type:'text', label:'Text'},
		  type: {elem:'input', type:'text', label:'Text'}
        }
      },
      /**
       * @member boxit
       * The start function will be executed when the currentTime
       * of the video reaches the start time provided by tdhe
       * options variable
       */
      start: function(event, options){
	  
		createLayer(options);
	  
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
       * @member boxit
       * The end function will be executed when the currentTime
       * of the video reaches the end time provided by the
       * options variable
       */
      end: function(event, options){
  		//var txt = document.createTextNode(" Stop Name = " + options.id);	
		//document.getElementById("debug").appendChild(txt);
		//document.getElementById(options.id).style.visibility = "hidden";
		document.getElementById("video").parentNode.removeChild(document.getElementById(options.id));
        //options.container.style.visibility="hidden";
      }
  } );
})( Popcorn );

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
	
	this.container.setAttribute("class","boxit")
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
