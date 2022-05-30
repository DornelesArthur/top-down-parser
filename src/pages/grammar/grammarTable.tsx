export function GrammarTable(){
    return(
        <div className="bg-brand-400 rounded-lg w-full mr-2 items-center text-white pb-1">
            <h3 className="pl-2 pt-2">Gramática:</h3>
            <div className="bg-brand-300 rounded-lg m-4 p-2">
                <div className="table text-center">
                    <div className="table-header-group">
                        <div className="table-row">
                            <div className="table-cell"></div>
                            <div className="table-cell"></div>
                            <div className="table-cell"></div>
                            <div className="table-cell"></div>
                        </div>
                    </div>
                    <div className="table-row-group">
                        <div className="table-row">
                            <div className="table-cell px-2">S</div>
                            <div className="table-cell px-2">::=</div>
                            <div className="table-cell px-2">0A0</div>
                            <div className="table-cell">|</div>
                            <div className="table-cell px-2">1B</div>
                            <div className="table-cell">|</div>
                            <div className="table-cell px-2">3A2</div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell px-2">A</div>
                            <div className="table-cell px-2">::=</div>
                            <div className="table-cell px-2">21D</div>
                            <div className="table-cell">|</div>
                            <div className="table-cell px-2">3A1</div>
                            <div className="table-cell">|</div>
                            <div className="table-cell px-2">1</div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell px-2">B</div>
                            <div className="table-cell px-2">::=</div>
                            <div className="table-cell px-2">0AD</div>
                            <div className="table-cell">|</div>
                            <div className="table-cell px-2">3C</div>
                            <div className="table-cell">|</div>
                            <div className="table-cell px-2">ε</div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell px-2">C</div>
                            <div className="table-cell px-2">::=</div>
                            <div className="table-cell px-2">25D</div>
                            <div className="table-cell">|</div>
                            <div className="table-cell px-2">0B</div>
                            <div className="table-cell">|</div>
                            <div className="table-cell px-2">31D</div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell px-2">D</div>
                            <div className="table-cell px-2">::=</div>
                            <div className="table-cell px-2">2D</div>
                            <div className="table-cell">|</div>
                            <div className="table-cell px-2">1E3</div>
                            <div className="table-cell"></div>
                            <div className="table-cell px-2"></div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell px-2">E</div>
                            <div className="table-cell px-2">::=</div>
                            <div className="table-cell px-2">0</div>
                            <div className="table-cell">|</div>
                            <div className="table-cell px-2">1A2</div>
                            <div className="table-cell">|</div>
                            <div className="table-cell px-2">ε</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}