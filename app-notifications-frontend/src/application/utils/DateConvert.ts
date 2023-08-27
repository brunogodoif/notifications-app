const convertDateFromDateJsToDbFormat = (dateString: string): string => {
    if(dateString === undefined || dateString === null){
        return "";
    }
    const date = new Date(dateString);
    const dd: string = String(date.getDate()).padStart(2, '0');
    const mm: string = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy: string = date.getFullYear().toString();
    return yyyy + "-" + mm + "-" + dd;
}
const convertDateFromDbFormatToPatternBr = (dateString: string): string => {
    if(dateString === undefined || dateString === null){
        return "";
    }
    const date = new Date(dateString);
    const dd: string = String(date.getDate()).padStart(2, '0');
    const mm: string = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy: string = date.getFullYear().toString();
    return dd + "/" + mm + "/" + yyyy;

}
const convertDateFromPatternBrToDb = (dateString: string): string => {

    if(dateString === undefined || dateString === null){
        return "";
    }
    const date = dateString.split(" ")[0].split("/").reverse().join('-');
    return date;
}
const convertDateFromDbFormatToDateJs = (dateString: string): Date => {
    return new Date(dateString + "T00:00:00");
}


export default {
    convertDateFromDateJsToDbFormat,
    convertDateFromDbFormatToPatternBr,
    convertDateFromPatternBrToDb,
    convertDateFromDbFormatToDateJs
}