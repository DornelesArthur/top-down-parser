import { Eraser, MagnifyingGlass, SkipBack, SkipForward } from "phosphor-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Switch } from '@headlessui/react'
import { Rows } from "./rows";

interface AnalyzerProps {
    sentence?: string;
}

export function Analyzer(props: AnalyzerProps) {
    const [isStepByStep, setStepByStep] = useState(false);
    const [isVerifyClicked, setVerifyClicked] = useState(false);
    const [isStepByStepClicked, setStepByStepClicked] = useState(false);
    const [isLine, setLine] = useState(0);
    const [isResultTable, setResultTable] = useState();
    const [isTableLength, setTableLength] = useState(0);
    const [isTable, setTable] = useState(new Map());
    
    var validTokens = ["0", "1", "2", "3"];
    var stack: string[] = [];


    var entry = "";
    

    let sentence: string = "";
    const { state } = useLocation();
    if (state != null) {
        sentence = state.sentence;
    }
    const [isSentence, setSentence] = useState(sentence);

    useEffect(() => {
        var table = new Map();
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
        setTable(table);
    }, []);

    useEffect(() => {
        if(!isStepByStep){
            setLine(isTableLength)
        }
        console.log("effect")
        console.log(isResultTable)
    }, [isTable]);

    function generateResultTable() {
        var tableData: string[][] = [];
        var countLine = 0;
        stack.push("$");
        stack.push("S");
        entry = isSentence + "$";
        while (!(stack[stack.length - 1] == "$" && entry.charAt(0) == "$")) {
            var line:string[] = [];
            line.push(stack.toString().replace(/,/g, ''));
            line.push(entry);

            var topStack:string = String(stack.pop());
            var firstChar = entry.charAt(0);

            countLine++;
            try {
                var str: string = isTable.get(topStack).get(firstChar);
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
        setTableLength(countLine);
        setResultTable(tableData);
        if(isStepByStep){
            setStepByStepClicked(true);
            setLine(1);
        }else{
            setLine(countLine);
        }
        setVerifyClicked(true);
    }

    function onHandleChange(event) {
        setSentence(event.target.value)
    }

    function verifySentence() {
        generateResultTable()   
    }

    function nextStep() {
        if(isLine < isTableLength){
            setLine(isLine+1);
            console.log(`length ${isLine} -- ${isTableLength}`)
        }
    }

    function previousStep() {
        console.log(isLine)
        if(isLine != 1){
            setLine(isLine-1);
        }
    }

    function erase() {
        setVerifyClicked(false);
        setStepByStepClicked(false);
        setLine(0);
        setTableLength(0);
    }

    return (
        <div>
            <div className="bg-brand-400 rounded-lg my-4 mx-40 items-center text-white pb-1">
                <h3 className="pl-2 pt-2">Tabela Preditiva:</h3>
                <div className="bg-brand-300 rounded-lg m-4 p-2">
                    <div className="table w-full">
                        <div className="table-header-group">
                            <div className="table-row items-center">
                                <div className="table-cell px-2 text-center"></div>
                                <div className="table-cell px-2 text-center">0</div>
                                <div className="table-cell px-2 text-center">1</div>
                                <div className="table-cell px-2 text-center">2</div>
                                <div className="table-cell px-2 text-center">3</div>
                                <div className="table-cell px-2 text-center">$</div>
                            </div>
                        </div>
                        <div className="table-row-group">
                            <div className={"table-row" + ((isStepByStepClicked && (isResultTable[isLine-1][2].charAt(0) == "S")) ? " bg-green-200 text-black" : "")}>
                                <div className="table-cell px-2 text-center">S</div>
                                <div className="table-cell px-2 text-center">S-{">"}0A0</div>
                                <div className="table-cell px-2 text-center">S-{">"}1B</div>
                                <div className="table-cell px-2 text-center"></div>
                                <div className="table-cell px-2 text-center">S-{">"}3A2</div>
                                <div className="table-cell px-2 text-center"></div>
                            </div>
                            <div className={"table-row" + ((isStepByStepClicked && (isResultTable[isLine-1][2].charAt(0) == "A" && isResultTable[isLine-1][2].charAt(1) != "c")) ? " bg-green-200 text-black" : "")}>
                                <div className="table-cell px-2 text-center">A</div>
                                <div className="table-cell px-2 text-center"></div>
                                <div className="table-cell px-2 text-center">A-{">"}1</div>
                                <div className="table-cell px-2 text-center">A-{">"}21D</div>
                                <div className="table-cell px-2 text-center">A-{">"}3A1</div>
                                <div className="table-cell px-2 text-center"></div>
                            </div>
                            <div className={"table-row" + ((isStepByStepClicked && (isResultTable[isLine-1][2].charAt(0) == "B")) ? " bg-green-200 text-black" : "")}>
                                <div className="table-cell px-2 text-center">B</div>
                                <div className="table-cell px-2 text-center">B-{">"}0AD</div>
                                <div className="table-cell px-2 text-center">B-{">"}ε</div>
                                <div className="table-cell px-2 text-center">B-{">"}ε</div>
                                <div className="table-cell px-2 text-center">B-{">"}3C</div>
                                <div className="table-cell px-2 text-center">B-{">"}ε</div>
                            </div>
                            <div className={"table-row" + ((isStepByStepClicked && (isResultTable[isLine-1][2].charAt(0) == "C")) ? " bg-green-200 text-black" : "")}>
                                <div className="table-cell px-2 text-center">C</div>
                                <div className="table-cell px-2 text-center">C-{">"}0B</div>
                                <div className="table-cell px-2 text-center"></div>
                                <div className="table-cell px-2 text-center">C-{">"}2SD</div>
                                <div className="table-cell px-2 text-center">C-{">"}31D</div>
                                <div className="table-cell px-2 text-center"></div>
                            </div>
                            <div className={"table-row" + ((isStepByStepClicked && (isResultTable[isLine-1][2].charAt(0) == "D")) ? " bg-green-200 text-black" : "")}>
                                <div className="table-cell px-2 text-center">D</div>
                                <div className="table-cell px-2 text-center"></div>
                                <div className="table-cell px-2 text-center">D-{">"}1E3</div>
                                <div className="table-cell px-2 text-center">D-{">"}2D</div>
                                <div className="table-cell px-2 text-center"></div>
                                <div className="table-cell px-2 text-center"></div>
                            </div>
                            <div className={"table-row" + ((isStepByStepClicked && (isResultTable[isLine-1][2].charAt(0) == "E")) ? " bg-green-200 text-black" : "")}>
                                <div className="table-cell px-2 text-center">E</div>
                                <div className="table-cell px-2 text-center">E-{">"}0</div>
                                <div className="table-cell px-2 text-center">E-{">"}1A2</div>
                                <div className="table-cell px-2 text-center"></div>
                                <div className="table-cell px-2 text-center">E-{">"}ε</div>
                                <div className="table-cell px-2 text-center"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-brand-400 rounded-lg my-4 mx-40 items-center text-white overflow-hidden">
                <div className="flex items-center">
                    <h3 className="pl-2 pt-2">Digitar sentença:</h3>
                    { !(isVerifyClicked || isStepByStepClicked)?
                        <div className="ml-auto mr-2 items-center flex">
                            <Switch
                                checked={isStepByStep}
                                onChange={setStepByStep}
                                className={`${isStepByStep ? 'bg-blue-500' : 'bg-brand-100'}
                                relative inline-flex h-5 w-11 shrink-0 cursor-pointer rounded-xl border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                            >
                                <span
                                    aria-hidden="true"
                                    className={`${isStepByStep ? 'translate-x-5' : 'translate-x-0'}
                                    pointer-events-none inline-block h-4 w-5 transform rounded-xl bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                />
                            </Switch>
                        </div>
                        :
                        <div>
                        </div>
                    }
                </div>
                <div className="flex items-center table-fixed">
                    { (isVerifyClicked) ?
                        <input readOnly onChange={onHandleChange} name="sentece" type="text" className="bg-brand-300 rounded-lg h-11 w-screen m-4" value={isSentence}></input>
                        :
                        <input onChange={onHandleChange} name="sentece" type="text" className="bg-brand-300 rounded-lg h-11 w-screen m-4" value={isSentence}></input>
                    }
                    {(isStepByStep) ?
                        ((isVerifyClicked)?
                        <div className="flex">
                            <button onClick={previousStep} className="bg-blue-500 hover:bg-blue-600 rounded-lg m-4 flex items-center p-2 transition-all">
                                <SkipBack className="p-1" size={32} />
                            </button>
                            <button onClick={nextStep} className="bg-blue-500 hover:bg-blue-600 rounded-lg m-4 flex items-center p-2 transition-all">
                                <SkipForward className="p-1" size={32} />
                            </button>
                        </div>
                        :
                        <button onClick={verifySentence} className="bg-blue-500 hover:bg-blue-600 rounded-lg m-4 flex items-center p-2 transition-all">
                            <span className="p-1 w-28">Passo a Passo</span>
                            <MagnifyingGlass className="p-1" size={32} />
                        </button>
                        )
                        :
                        <button onClick={verifySentence} className="bg-brand-100 hover:bg-brand-200 rounded-lg m-4 flex items-center p-2 transition-all">
                            <span className="p-1">Verificar</span>
                            <MagnifyingGlass className="p-1" size={32} />
                        </button>
                    }
                    <button onClick={erase} className="bg-brand-300 hover:bg-white hover:text-black rounded-lg m-4 flex items-center p-2 transition-all">
                        <Eraser className="p-1" size={32} />
                    </button>
                </div>
            </div>
            <div className="bg-brand-400 rounded-lg my-4 mx-40 items-center text-white pb-1 overflow-hidden">
                    <h3 className="pl-2 pt-2">Tabela Resultado:</h3>
                    <div className="bg-brand-300 rounded-lg m-4 p-2">
                        <div className="table w-full">
                            <div className="table-header-group">
                                <div className="table-row items-center">
                                    <div className="table-cell px-2 text-center">Pilha</div>
                                    <div className="table-cell px-2 text-center">Entrada</div>
                                    <div className="table-cell px-2 text-center">Ação</div>
                                </div>
                            </div>
                            { !(isVerifyClicked) ?
                                <div className="table-row-group">
                                    <div className="table-row">
                                        <div className="table-cell px-2 text-center">$S</div>
                                        <div className="table-cell px-2 text-center">$</div>
                                        <div className="table-cell px-2 text-center">-</div>
                                    </div>
                                </div>
                                :
                                isResultTable != undefined &&
                                <Rows table={isResultTable.slice(0,isLine)} />
                            }
                    </div>
                </div>
            </div>
        </div>
    )
}