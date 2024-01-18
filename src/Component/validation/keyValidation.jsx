export const  onlyNumbers = (e) => {
     
    const re = /[0-9]+/g;
      if (!re.test(e.key)) {
        e.preventDefault();
      }
    }
  
   export const onlyAlphabets= (e) => {
      const re = /^[a-zA-Z ]*$/;
      if (!re.test(e.key)) {
        e.preventDefault();
      }
    }
  
    export const  NumbersAndDot = (e) => {
       
      var rgx = /^[0-9]*\.?[0-9]*$/
  
        if (!rgx.test(e.key)) {
          e.preventDefault();
        }
      }