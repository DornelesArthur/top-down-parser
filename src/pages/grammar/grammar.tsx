import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { First } from "./first";
import { Follow } from "./follow";
import { GrammarTable } from "./grammarTable";

export function Grammar() {
    const [isSentence, setSentence] = useState("S");
    const [isFirstNonTerminal, setFirstNonTerminal] = useState("S");

    function onHandleChange(event: object) {
        setSentence(event.target.value)
    }

    function onFormSentence(input: string) {
        if (input != "" && input != undefined && input.split("->")[1] != "ε"){
            var stringTeste = isSentence.replace(input.split("->")[0],input.split("->")[1]);
            var terminal = stringTeste.replace(/\d|\s+/g, '').charAt(0);
            
            setFirstNonTerminal(terminal);
            setSentence(stringTeste);
        }else if(input.split("->")[1] == "ε"){
            var stringTeste = isSentence.replace(input.split("->")[0],"");
            var terminal = stringTeste.replace(/\d|\s+/g, '').charAt(0);

            setFirstNonTerminal(terminal);
            setSentence(stringTeste);
        }
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
                            <div className={"table-row " + (isFirstNonTerminal == "S" ? "bg-green-200 text-black" : "")}>
                                <div className="table-cell px-2 text-center">S</div>
                                <div className="table-cell px-2 text-center" onClick={() => onFormSentence(isFirstNonTerminal == "S" ? "S->0A0" : "")}>S-{">"}0A0</div>
                                <div className="table-cell px-2 text-center" onClick={() => onFormSentence(isFirstNonTerminal == "S" ? "S->1B" : "")}>S-{">"}1B</div>
                                <div className="table-cell px-2 text-center"></div>
                                <div className="table-cell px-2 text-center" onClick={() => onFormSentence(isFirstNonTerminal == "S" ? "S->3A2" : "")}>S-{">"}3A2</div>
                                <div className="table-cell px-2 text-center"></div>
                            </div>
                            <div className={"table-row " + (isFirstNonTerminal == "A" ? "bg-green-200 text-black" : "")}>
                                <div className="table-cell px-2 text-center">A</div>
                                <div className="table-cell px-2 text-center"></div>
                                <div className="table-cell px-2 text-center" onClick={() => onFormSentence(isFirstNonTerminal == "A" ? "A->1" : "")}>A-{">"}1</div>
                                <div className="table-cell px-2 text-center" onClick={() => onFormSentence(isFirstNonTerminal == "A" ? "A->21D" : "")}>A-{">"}21D</div>
                                <div className="table-cell px-2 text-center" onClick={() => onFormSentence(isFirstNonTerminal == "A" ? "A->3A1" : "")}>A-{">"}3A1</div>
                                <div className="table-cell px-2 text-center"></div>
                            </div>
                            <div className={"table-row " + (isFirstNonTerminal == "B" ? "bg-green-200 text-black" : "")}>
                                <div className="table-cell px-2 text-center">B</div>
                                <div className="table-cell px-2 text-center" onClick={() => onFormSentence(isFirstNonTerminal == "B" ? "B->0AD" : "")}>B-{">"}0AD</div>
                                <div className="table-cell px-2 text-center" onClick={() => onFormSentence(isFirstNonTerminal == "B" ? "B->ε" : "")}>B-{">"}ε</div>
                                <div className="table-cell px-2 text-center" onClick={() => onFormSentence(isFirstNonTerminal == "B" ? "B->ε" : "")}>B-{">"}ε</div>
                                <div className="table-cell px-2 text-center" onClick={() => onFormSentence(isFirstNonTerminal == "B" ? "B->3C" : "")}>B-{">"}3C</div>
                                <div className="table-cell px-2 text-center" onClick={() => onFormSentence(isFirstNonTerminal == "B" ? "B->ε" : "")}>B-{">"}ε</div>
                            </div>
                            <div className={"table-row " + (isFirstNonTerminal == "C" ? "bg-green-200 text-black" : "")}>
                                <div className="table-cell px-2 text-center">C</div>
                                <div className="table-cell px-2 text-center" onClick={() => onFormSentence(isFirstNonTerminal == "C" ? "C->0B" : "")}>C-{">"}0B</div>
                                <div className="table-cell px-2 text-center"></div>
                                <div className="table-cell px-2 text-center" onClick={() => onFormSentence(isFirstNonTerminal == "C" ? "C->2SD" : "")}>C-{">"}2SD</div>
                                <div className="table-cell px-2 text-center" onClick={() => onFormSentence(isFirstNonTerminal == "C" ? "C->31D" : "")}>C-{">"}31D</div>
                                <div className="table-cell px-2 text-center"></div>
                            </div>
                            <div className={"table-row " + (isFirstNonTerminal == "D" ? "bg-green-200 text-black" : "")}>
                                <div className="table-cell px-2 text-center">D</div>
                                <div className="table-cell px-2 text-center"></div>
                                <div className="table-cell px-2 text-center" onClick={() => onFormSentence(isFirstNonTerminal == "D" ? "D->1E3" : "")}>D-{">"}1E3</div>
                                <div className="table-cell px-2 text-center" onClick={() => onFormSentence(isFirstNonTerminal == "D" ? "D->2D" : "")}>D-{">"}2D</div>
                                <div className="table-cell px-2 text-center"></div>
                                <div className="table-cell px-2 text-center"></div>
                            </div>
                            <div className={"table-row " + (isFirstNonTerminal == "E" ? "bg-green-200 text-black" : "")}>
                                <div className="table-cell px-2 text-center">E</div>
                                <div className="table-cell px-2 text-center" onClick={() => onFormSentence(isFirstNonTerminal == "E" ? "E->0" : "")}>E-{">"}0</div>
                                <div className="table-cell px-2 text-center" onClick={() => onFormSentence(isFirstNonTerminal == "E" ? "E->1A2" : "")}>E-{">"}1A2</div>
                                <div className="table-cell px-2 text-center"></div>
                                <div className="table-cell px-2 text-center" onClick={() => onFormSentence(isFirstNonTerminal == "E" ? "E->ε" : "")}>E-{">"}ε</div>
                                <div className="table-cell px-2 text-center"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-brand-400 rounded-lg my-4 mx-40 items-center text-white">
                <h3 className="pl-2 pt-2">Criar sentença:</h3>
                <div className="flex items-center table-fixed">
                    <input readOnly value={isSentence} onChange={onHandleChange} name="sentence" type="text" className="bg-brand-300 rounded-lg h-11 w-screen m-4"></input>
                    <Link className="bg-brand-100 hover:bg-brand-200 rounded-lg m-4 flex items-center p-2 transition-all" to="/" state={{sentence: isSentence}}>
                        <span className="p-1">Verificar</span>
                        <MagnifyingGlass className="p-1" size={32} />
                    </Link>
                </div>
                <div>

                </div>
            </div>

            <div className="flex mx-40">
                <GrammarTable />
                <div className="flex w-full">
                    <First />
                    <Follow />
                </div>
            </div>
        </div>
    )
}