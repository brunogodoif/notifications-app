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
    // Divido a string pelo único espaço que tem, depois divido o primeiro item do array pela barra '/', reverto a string e, finalmente, junto todos os itens da matriz com um hífen.
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