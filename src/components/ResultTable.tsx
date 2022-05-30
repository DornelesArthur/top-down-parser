import { useEffect, useState } from "react";
import { Rows } from "../pages/analyzer/rows";
import { ResultTableRows } from "./ResultTableRows";

interface ResultTableProps {
    sentence: string,
    line: number
}

export function ResultTable(props: ResultTableProps) {
    const [isTable, setTable] = useState();
    var tableData: string[][] = [];
    var validTokens = ["0", "1", "2", "3"];
    var countLine: number;
    var stack: string[] = [];

    var entry = "";
    var table = new Map();
    

    useEffect(() => {
        countLine = 0;
        entry = props.sentence + "$";
        stack.push("$");
        stack.push("S");
        var tableLine = new Map();
        tableLine.set("0", "0A0");
        tableLine.set("1", "1B");
        tableLine.set("3", "3A2");
        table.set("S", new Map(tableLine));
        tableLine.delete("0");
        tableLine.delete("1");
        tableLine.delete("3");
        //
        tableLine.set("1", "1");
        tableLine.set("2", "21D");
        tableLine.set("3", "3A1");
        table.set("A", new Map(tableLine));
        tableLine.delete("1");
        tableLine.delete("2");
        tableLine.delete("3");
        //
        tableLine.set("0", "0AD");
        tableLine.set("1", "ε");
        tableLine.set("2", "ε");
        tableLine.set("3", "3C");
        tableLine.set("$", "ε");
        table.set("B", new Map(tableLine));
        tableLine.delete("0");
        tableLine.delete("1");
        tableLine.delete("2");
        tableLine.delete("3");
        tableLine.delete("$");
        //
        tableLine.set("0", "0B");
        tableLine.set("2", "2SD");
        tableLine.set("3", "31D");
        table.set("C", new Map(tableLine));
        tableLine.delete("0");
        tableLine.delete("2");
        tableLine.delete("3");
        //
        tableLine.set("1", "1E3");
        tableLine.set("2", "2D");
        table.set("D", new Map(tableLine));
        tableLine.delete("1");
        tableLine.delete("2");
        //
        tableLine.set("0", "0");
        tableLine.set("1", "1A2");
        tableLine.set("3", "ε");
        table.set("E", new Map(tableLine));
        tableLine.delete("0");
        tableLine.delete("1");
        tableLine.delete("3");

        generateResultTable()
    }, []);

    useEffect(() => {
        console.log("aqui")
        console.log(props.sentence)
        console.log(props.line)
        console.log(tableData)
        console.log(tableData.slice(0,props.line))
        if(props.line == 0){
            setTable(tableData);
        }else{
            setTable(tableData.slice(0,props.line));
        }
    }, [props.line]);

    function generateResultTable() {
        while (!(stack[stack.length - 1] == "$" && entry.charAt(0) == "$")) {
            var line:string[] = [];
            line.push(stack.toString().replace(/,/g, ''));
            line.push(entry);

            var topStack:string = String(stack.pop());
            var firstChar = entry.charAt(0);

            countLine++;
            try {
                var str: string = table.get(topStack).get(firstChar);
                if (str != undefined) {
                    line.push(topStack + "->" + str);
                    tableData.push(line);

                    var strReverse = str.replace(/ε/g, '').split("");
                    strReverse = strReverse.reverse();
                    stack = stack.concat(strReverse);
                } else {
                    throw "Undefined";
                }
            } catch (e) {
                if (validTokens.indexOf(topStack) + 1) {
                    line.push("LER " + topStack);
                    tableData.push(line);
                    entry = entry.substring(1);

                    if (entry == "$" && stack[stack.length - 1] == "$") {
                        countLine++;
                        var final: string[] = [];
                        final.push(stack[stack.length - 1]);
                        final.push(entry);
                        final.push("Aceito em " + countLine);
                        tableData.push(final);
                    }
                } else {
                    line.push("Não Aceito em " + countLine + " iterações");
                    tableData.push(line);

                    stack = ["$"]
                    entry = "$";
                }
            }
        }
        if(props.line == 0 ){
            setTable(tableData);
        }else{
            setTable(tableData.slice(0,props.line));
        }
    }

    
    if(props.line == 0){
        return ( 
            <Rows table={tableData}/>
        )
    }else{
        return (
            <>
            {(isTable !== undefined) &&
                <ResultTableRows table={isTable}/>}
            </>
        )
    }
    
}