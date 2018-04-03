var PREC = 5;

function calculate() {

    var a=0, b=0, c=0;
    var result_field = document.getElementById('result_field');
    var details_field = document.getElementById('details_field');
    var result, details;

    var equation = document.getElementById('equation').value;
    while (equation.indexOf("XX") + 1)
       equation = equation.replace("XX", "X");
    while (equation.indexOf("++") + 1)
        equation = equation.replace("++", "+");
    while (equation.indexOf("--") + 1)
        equation = equation.replace("--", "-");
    while (equation.indexOf("**") + 1)
        equation = equation.replace("**", "*");
    while (equation.indexOf("^^") + 1)
        equation = equation.replace("^^", "^");
    while (equation.indexOf("==") + 1)
        equation = equation.replace("==", "=");
    if (equation.search('=') === -1 || equation.search('X') === -1){
        console.log("FAIL");
        alert("Enter the correct equation");
        return;
    }
    equation = equation.split('=');
    if (equation[1][0] !== '-' && equation[1][0] !== '+'){
        equation[1] ="+" + equation[1];
    }
    equation[1] = equation[1].replace(/-/g, 'p');
    equation[1] = equation[1].replace(/\+/g, 'm');
    equation[1] = equation[1].replace(/m/g, '-');
    equation[1] = equation[1].replace(/p/g, '+');
    equation[1] = equation[1].replace(/\*\*/g, '*');
    equation = equation.join('');
    equation = equation.replace(/\+/g," +");
    equation = equation.replace(/-/g, " -");
    equation = equation.split(' ');

    var err = 0;
    equation.forEach(function (item, i, equation) {
        if (equation[i].indexOf("X^2")+1) {
            equation[i] = equation[i].replace("X^2", "");
            equation[i] = equation[i].replace("*", "");
            a += Number(equation[i]);
            !a ? a = 1 : 0;
        }
        else if ((equation[i].indexOf("X^1") + 1)){
            equation[i] = equation[i].replace("X^1", "");
            equation[i] = equation[i].replace("*", "");
            b += Number(equation[i]);
            !b ? b = 1 : 0;
        }
        else if ((equation[i].indexOf("X") + 1) && !(equation[i].indexOf("X^") + 1)) {
            equation[i] = equation[i].replace("X", "");
            equation[i] = equation[i].replace("*", "");
            b += Number(equation[i]);
            !b ? b = 1 : 0;
        }
        else if (equation[i].indexOf("X^0") + 1){
            equation[i] = equation[i].replace("X^0", "");
            equation[i] = equation[i].replace("*", "");
            c += Number(equation[i]);
            !c ? c = 1 : 0;
        }
        else if ((equation[i].indexOf("X^") + 1)){
            alert("The polynomial degree is stricly greater than 2 ("+equation[i]+"), I can't solve.");
            err = 1;
        }
        else
            c += Number(equation[i]);
    });
    if (err === 1)
        return; //TODO: error msg
    details = "Reduced form: ";
    details += a+"*X<sup>2</sup> ";
    if (b >= 0)
        details += "+ ";
    details += b+"*X ";
    if (c >= 0)
        details += "+ ";
    details += +c+" = 0;<br>";
    console.log(a,b,c);
    details += "a = "+a+"; b = "+b+"; c = "+c+";<br>";

    var x1,x2;
    details += "Polynomial degree: ";
    if (a !== 0) {
        details += "2<br>";
        var D = (b*b) - (4*a*c);
        console.log("D="+D);
        details +="D = b<sup>2</sup> - 4*a*c ="+D+"<br>";
        if (D < 0) {
            details += "Discriminant is strictly negative, the two complex solutions are:<br>";
            details += "X<sub>1 2</sub>=(-b/2a, ±sqrt(-D)/2a).<br>";
            result = "X<sub>1</sub> = (";
            result += (- b / ( 2 * a )).toFixed(PREC);
            result += ", ";
            result += ((-D)**(0.5) / ( 2 * a )).toFixed(PREC);
            result += ")<br> X<sub>2</sub> = (";
            result += (- b / ( 2 * a)).toFixed(PREC);
            result += ", ";
            result += (-((-D)**(0.5) / ( 2 * a ))).toFixed(PREC);
            result += ").";
        }
        else if (D > 0)
        {
            details += "Discriminant is strictly positive, the two solutions are:<br>";
            details += "X<sub>1 2</sub>=(-b ± sqrt(D)) / 2a.<br>";
            x1 = (-b - D**(0.5)) / (2*a);
            x1 = x1.toFixed(PREC);
            x2 = (-b + D**(0.5)) / (2*a);
            x2 = x2.toFixed(PREC);
            result = "X<sub>1</sub> = "+x1+"<br>X<sub>2</sub> = "+x2+"";
            console.log("x1="+x1+";x2="+x2);
        }
        else if (D === 0)
        {
            details += "Discriminant is 0, the solutions is:<br>";
            details += "X = -b/2a.<br>";
            x1 = ((-b) / (2*a));
            console.log("x="+x1);
            result = "X = "+x1;
        }
    }
    else if (b !== 0) {
        details += "1<br>";
        x1 = -c / b;

        details += "The solution is:<br>";
        details += "X = -c/b.<br>";
        result = "X = "+x1;
    }
    else {
        alert("X any number");
        return false;
    }

    result_field.innerHTML = result;
    details_field.innerHTML = details;
}

function check_input(input) {
    input.value = input.value.replace(/[^\d\.\X\\+\-\\=\^\\*]/g, '');
}

