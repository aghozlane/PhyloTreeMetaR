HTMLWidgets.widget({

  name: 'PhyloTreeMetaR',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        // TODO: code to render the widget, e.g.
        //el.innerText = x.message;
        console.log("PhyloTreeMetaR");
         // initialise the page 
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }  
        
        var divphylo = document.createElement("div"); 
        divphylo.id ="phylocanvas";
        //divphylo.setAttribute("style","width: +1000");
        //divphylo.setAttribute("style","height: 1000");

        var treeDiv = document.createElement("div");
        treeDiv.id = "treeDiv";
        //body.setAttribute("style","width: 1000");
        //body.setAttribute("style","height: 1000");
        

        
        var btn = document.createElement("BUTTON");
        btn.onClick="phylocanvas.viewMetadataColumns();"
        btn.addEventListener('click', function(event) {
            phylocanvas.setTreeType('circular');
            //phylocanvas.draw();
        });
        var btn2 = document.createElement("BUTTON");
        btn2.onClick="phylocanvas.viewMetadataColumns();"
        btn2.addEventListener('click', function(event) {
            phylocanvas.setTreeType('diagonal');
            phylocanvas.draw();
        });
        var btn3 = document.createElement("BUTTON");
        btn3.onClick="phylocanvas.viewMetadataColumns();"
        btn3.addEventListener('click', function(event) {
            phylocanvas.setTreeType('radial');
            phylocanvas.draw();
        });
        var btn5 = document.createElement("BUTTON");
        btn5.onClick="phylocanvas.viewMetadataColumns();"
        btn5.addEventListener('click', function(event) {
            //phylocanvas.alignLabels = false;
            //phylocanvas.draw();
        });
        var btn4 = document.createElement("BUTTON");
        btn4.onClick="phylocanvas.viewMetadataColumns();"
        btn4.addEventListener('click', function(event) {
            //phylocanvas.fitInPanel(phylocanvas.findLeaves(/OTU_144/));
            //phylocanvas.draw();
        });
       
        var slider = document.createElement("input");
        slider.addEventListener(
           'change',
           function() { phylocanvas.setTextSize(this.value); },
           false
        );
        slider.width= "100";
        slider.type ="range";
        slider.min = "10";
        slider.value ="20";
        slider.max = "80";
        slider.step ="1";
        slider.setAttribute("width","100");

        treeDiv.appendChild(btn);
        treeDiv.appendChild(btn2);
        treeDiv.appendChild(btn3);
        treeDiv.appendChild(slider);
        
        //body.appendChild(btn5);
        //body.appendChild(btn4);
        treeDiv.appendChild(divphylo);
        el.appendChild(treeDiv);


       // <button id="col1" onClick="phylocanvas.viewMetadataColumns(['Column1']);">Show Column1</button>
        //console.log (x.dataf);
        var matrix = x.dataf;

        //function changeLayout(){
        //  phylocanvas.setTreeType('circular');

        //}

        // Load the phylogenetic tree        
        function addData() {
          //console.log("redraw");
          var newick_str = x.data;
          console.log("redraw"+ newick_str);
          //newick_str ='(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;'
          //console.log(newick_str);
          phylocanvas = new PhyloCanvas.Tree('phylocanvas',{});
          //phyloCanvas.history.expand();
          // Rectancgular tree
          //phylocanvas.setTreeType('rectangular');
          phylocanvas.setTreeType('rectangular');
          phylocanvas.setTextSize(20);
          //tree.fitInPanel(tree.findLeaves(/C|D/));
          //tree.draw();
          
          phylocanvas.nodeAlign = true;
          // Load and draw tree
          //phylocanvas.load(newick_str);
          //var newick_file = "http://localhost/newick.txt";
          phylocanvas.load(newick_str);
          
          //for (i = 0; i < x.dataf.length; i++) { 
          //console.log("mat length "+ matrix.length);
          //console.log(typeof(matrix));
          //console.log(matrix);

          // if there is an heatmap
          //console.log('matrix '+matrix);
          if (matrix !=null){
            var arr =[];
            var index=0;
            for( var i in matrix ) {
                if (matrix.hasOwnProperty(i)){
                   //console.log(matrix[i]);
                   arr.push(matrix[i]);
                   index++;
                }
            }



            console.log("arrlength "+ arr.length);
            for (i = 0; i < arr.length; i++) { 
                var myrow = arr[i];
                //console.log(myrow.length);
                for (j = 0; j < myrow.length; j++) { 
                    console.log(i+ " "+j+ " "+myrow[j]);
                }
            }
            
            var arr2 =arr;

            function transpose(a) {

              // Calculate the width and height of the Array
              var w = a.length ? a.length : 0,
                h = a[0] instanceof Array ? a[0].length : 0;

              // In case it is a zero matrix, no transpose routine needed.
              if(h === 0 || w === 0) { return []; }

              /**
               * @var {Number} i Counter
               * @var {Number} j Counter
               * @var {Array} t Transposed data is stored in this array.
               */
              var i, j, t = [];

              // Loop through every item in the outer array (height)
              for(i=0; i<h; i++) {

                // Insert a new row (array)
                t[i] = [];

                // Loop through every item per item in outer array (width)
                for(j=0; j<w; j++) {

                  // Save transposed data.
                  t[i][j] = a[j][i];
                }
              }

              return t;
            };
            
            arr = transpose(arr2);

            var max =-1;


            for (i = 1; i < arr.length; i++) { 
                var myrow = arr[i];
                //console.log(myrow.length);
                for (j = 1; j < myrow.length; j++) { 
                    console.log("a "+i+ " "+j+ " "+myrow[j]);
                    max =Math.max(max,myrow[j]);
                }
            }
            

      
            /*for( var i in matrix ) {
              var t = matrix[i];

              for( var j  in t ) {
                console.log(j+" "+t[j]);
              }
            }*/
            var columns =[];
            
            var rowtmp =  arr[0];	
  	        console.log('arrr '+arr[0]);
            for (i = 1; i < rowtmp.length; i++) { 
                  columns[i]=rowtmp[i];
                  console.log("column "+rowtmp[i]);
        
            }

           


            /*phylocanvas.branches['OTU_623'].data = {'Column1': 1, 'Column2': 0};
            phylocanvas.branches['OTU_697'].data = {'Column1': 0, 'Column2': 1};
            phylocanvas.branches['OTU_492'].data = {'Column1': 0, 'Column2': 1};
            */

            // add max to compute
            //var max =20;
            console.log(max+" "+ Math.log2(max));
            max =  Math.log2(max);
            var test = Math.log2(40000);
            console.log("test2 "+test);
            
            //deltaS = generateColor("#138337","#f5f5f5",1000);
            //deltaS = generateColor("#00ff00","#ff5247",1000);
            deltaS = generateColor( "#000cff","#eaeeb1",100);
            deltaS[0] ="#FFFFFF";
            for (i = 1; i < arr.length; i++) { 
                var myrow = arr[i];
                
                var randomColor ='#'+Math.floor(Math.random()*16777215).toString(16);

                var tabCol = {};
                for (j = 1; j < myrow.length; j++) { 
                    //console.log(i+ " "+j+ " "+myrow[j]);
                    //var myArray = [];
                    var columnName = columns[j];
                    //var pourc = (myrow[j]/max )*1000;
                    var pourc = 0;
                    if (myrow[j] != 0){
                        pourc = (Math.log2(myrow[j])/max ) *100;
                        //console.log("p "+" "+myrow[j]+" "+Math.log2(myrow[j])+" "+pourc);// Math.round(
                    }
                    //console.log(Math.round(pourc));
                    //console.log(deltaS[Math.round(pourc)]);
                    //tabCol[columnName] =randomColor;
                    tabCol[columnName] =deltaS[Math.round(pourc)];
                    
                }
                console.log("!! " +myrow[0]);
                phylocanvas.branches[myrow[0]].data = tabCol;
            }

            /*phylocanvas.
              // config defaults 
              scalebar: {
                active: true,
                width: 100,
                height: 20,
                fillStyle: 'black',
                strokeStyle: 'black',
                lineWidth: 1,
                font: '16px Sans-serif',
                textBaseline: 'bottom',
                textAlign: 'center',
                digits: 2,
                position: {
                  bottom: 10,
                  left: 10,
                },
              }
            })*/

            phylocanvas.viewMetadataColumns();
          }
        }
        addData();
        //window.onload = addData;

        function getRandomArbitrary(min, max) {
          return Math.random() * (max - min) + min;
        }
        function hex (c) {
          var s = "0123456789abcdef";
          var i = parseInt (c);
          if (i == 0 || isNaN (c))
            return "00";
          i = Math.round (Math.min (Math.max (0, i), 255));
          return s.charAt ((i - i % 16) / 16) + s.charAt (i % 16);
        }

        /* Convert an RGB triplet to a hex string */
        function convertToHex (rgb) {
          return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
        }

        /* Remove '#' in color hex string */
        function trim (s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }

        /* Convert a hex string to an RGB triplet */
        function convertToRGB (hex) {
          var color = [];
          color[0] = parseInt ((trim(hex)).substring (0, 2), 16);
          color[1] = parseInt ((trim(hex)).substring (2, 4), 16);
          color[2] = parseInt ((trim(hex)).substring (4, 6), 16);
          return color;
        }

        function generateColor(colorStart,colorEnd,colorCount){

          // The beginning of your gradient
          var start = convertToRGB (colorStart);    

          // The end of your gradient
          var end   = convertToRGB (colorEnd);    

          // The number of colors to compute
          var len = colorCount;

          //Alpha blending amount
          var alpha = 0.0;

          var saida = [];
          
          for (i = 0; i < len; i++) {
            var c = [];
            alpha += (1.0/len);
            
            c[0] = start[0] * alpha + (1 - alpha) * end[0];
            c[1] = start[1] * alpha + (1 - alpha) * end[1];
            c[2] = start[2] * alpha + (1 - alpha) * end[2];

            saida.push("#"+convertToHex (c));
            
          }
          
          return saida;
          
        }
        function changeSize(){
          var slider = document.getElementById('input');
          phylocanvas.setTextSize(slider.value);
        }

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }
      


    };
  }
});
