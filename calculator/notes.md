=> Features

* DONE

* Increase/decrease font size if the length is more or less to fit on display.
* Adjusted scroll height to see the current values being typed (you can even scroll to see the previous values typed on the display).
* used shunting yard algorithm for evaluation/calculation
* used regex a lot
* replace operator if user click one operator after the other suppose if user tried to do this 4+* then we replaced + with * so it will become 4* 
* made sure a single number can't have more than 1 decimal
* a decimal number can't have more than 10digits after decimal.
* handled division by zero

+ To do

///// old caculator with eval()
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400..700&display=swap" rel="stylesheet">
    <style>
        :root{
            --green: #b1e9cf;
            --cream: #f2ebdc;
            --dark: #2e2f28;
            --l-green:#e2ead8;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Kode Mono", monospace;
        }
        *:focus{
            outline: none;
        }
        body{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100vh;
            background-image: url(../img/calculator-bg.png);
            background-position: center left;
            background-size: cover;
        }
        .box-style{
            border: 3px solid var(--dark);
            border-radius: 10px;
            box-shadow: 4px 4px 0 0 var(--dark);
        }
        form{
            height: max-content;
            width: min-content;
            overflow: hidden;
        }
        .result-box{
            background: var(--cream);
            padding: 10px 15px;
        }
        .result-box input{
            width: 100%;
            padding: 1.5rem 0;
            background: transparent;
            outline: none;
            border: none;
            font-size: 2rem;
            font-weight: 600;
            /* direction: rtl; */
            text-align: right;
        }
        .btns-box{
            padding: 15px 15px 0 15px;
            display: grid;
            grid-template-columns: max-content max-content max-content max-content;
            grid-template-rows: max-content max-content max-content max-content max-content;
            gap: 15px;
            background: var(--green);
        }
        .btns-box input:nth-child(1){
            grid-area:1/1/2/3;
            width: 100%;
        }
        .btns-box img{
            grid-area:1/3/2/5;
            width: 100%;
            object-fit: contain;
            background: var(--cream);
        }
        .btns-box input:nth-child(15){
            grid-area:5/1/7/3;
            width: 100%;
        }
        .btn-sm{
            width: 40px;
            height: 40px;
            font-size: 1rem;
            box-shadow: 2px 2px 0 0 var(--dark);
            background: var(--cream);
            cursor: pointer;
        }
        .font-h{
            font-size: 1.35rem;
        }
    </style>
</head>
<body>

    <form name="form" class="box-style">
        <div class="result-box">
            <input type="text" name="result">
        </div>
        <div class="btns-box">
            <input type="button" value="Clear" class="box-style btn-sm" onclick="form.result.value = ''">
            <img src="../img/delete.png" class="box-style btn-sm" onclick="form.result.value = form.result.value.slice(0, -1)">

            <input type="button" value="1" class="box-style btn-sm" onclick="form.result.value += '1'">
            <input type="button" value="2" class="box-style btn-sm" onclick="form.result.value += '2'">
            <input type="button" value="3" class="box-style btn-sm" onclick="form.result.value += '3'">
            
            <input type="button" value="+" class="box-style btn-sm font-h"  onclick="form.result.value += '+'">
            
            <input type="button" value="4" class="box-style btn-sm" onclick="form.result.value += '4'">
            <input type="button" value="5" class="box-style btn-sm" onclick="form.result.value += '5'">
            <input type="button" value="6" class="box-style btn-sm" onclick="form.result.value += '6'">
            
            <input type="button" value="-" class="box-style btn-sm font-h" onclick="form.result.value += '-'">
            
            <input type="button" value="7" class="box-style btn-sm" onclick="form.result.value += '7'">
            <input type="button" value="8" class="box-style btn-sm" onclick="form.result.value += '8'">
            <input type="button" value="9" class="box-style btn-sm" onclick="form.result.value += '9'">

            <input type="button" value="*" class="box-style btn-sm font-h" onclick="form.result.value += '*'">

            <input type="button" value="Result" class="box-style btn-sm" onclick="form.result.value = eval(form.result.value)">
            <input type="button" value="0" class="box-style btn-sm" onclick="form.result.value += '0'">
            <input type="button" value="/" class="box-style btn-sm" onclick="form.result.value += '/'">
        </div>
    </form>

</body>
</html>