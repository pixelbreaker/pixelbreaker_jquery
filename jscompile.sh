#############################################################
# JAVSCRIPT COMPILE SHELL SCRIPT							#
# Written by Gabriel Bucknall (gabriel@pixelbreaker.com)	#
#############################################################
# optimisation="ADVANCED_OPTIMIZATIONS" # USE WITH CAUTION
# optimisation="SIMPLE_OPTIMIZATIONS"

compile_js()
{
	inputpath="./"
	outputfile="./jquery.takeoverloader-0.1.min.js"
	files=( "jquery.takeoverloader-0.1.js" )
	filesin=""
	
	echo "--------------------------------------------------------------------------------------------"
	echo "compiling files in "$inputpath" to "$outputfile
	echo "--------------------------------------------------------------------------------------------"
	for i in "${files[@]}"
	do
		filesin=$filesin"--js="$inputpath$i" "
		echo "compiling "$i
	done
	
	java -jar compiler.jar $filesin--js_output_file=$outputfile --compilation_level SIMPLE_OPTIMIZATIONS #--externs ../deploy/public/_includes/js/externs/externs.js --externs ../deploy/public/_includes/js/externs/jquery-externs.js --externs ../deploy/public/_includes/js/externs/googlemaps.js
	echo "compiling complete."
}

compile_js
exit