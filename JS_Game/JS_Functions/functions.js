export const pascalCase = pascalString => {
    let stringSplit = pascalString.toLowerCase().split(" "); 
    for (let i = 0; i < stringSplit.length; i++) {
      if (stringSplit[i]) {
        stringSplit[i] = stringSplit[i][0].toUpperCase() + stringSplit[i].substr(1);
      }
    }
    stringSplit = stringSplit.join(" ");
    return stringSplit;
  }

export const CheckName=userName=>
{
    if(userName==""||!isNaN(userName))
    {
        return false;
    }
    else
    {
        return true;
    }
}

