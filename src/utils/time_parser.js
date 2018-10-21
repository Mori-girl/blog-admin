let date={};
let timeParser=function(millSecond){
	var dObj=new Date(millSecond);
	date.year=dObj.getFullYear();
	date.month=dObj.getMonth()+1;
	date.day=dObj.getDate();
	return date;
}
export default timeParser;