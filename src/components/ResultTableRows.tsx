import { useEffect, useState } from "react";

interface ResultTableRowsProps {
    table: string[][]
}

export function ResultTableRows(props: ResultTableRowsProps) {
    const [isKey, setKey] = useState(Math.random);
    const [isTable, setTable] = useState(props.table);

    useEffect(() => {
        setKey(Math.random);
    }, [])

    useEffect(() => {
        setTable(props.table);
    }, [props.table])

    return (
        <div key={isKey} className="table-row-group">
            {isTable.length > 0 && isTable.map((line, key) =>
                <div key={key} className={"table-row " + key}>
                    <div key={key + "stack"} className={"table-cell px-2 text-center"}>{line[0]}</div>
                    <div key={key + "entry"} className={"table-cell px-2 text-center"}>{line[1]}</div>
                    <div key={key + "action"} className={"table-cell px-2 text-center"}>{line[2]}</div>
                </div>
            )}
        </div>
    )
};