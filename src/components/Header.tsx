import { ButtonMenu } from "./ButtonMenu";

export function Header(){
    return(
        <div className="bg-brand-400 h-auto flex text-white p-3 gap-x-10 items-center">
            <ButtonMenu />
            <p className="mx-auto">Analisador Sintático Top-Down Preditivo Tabular</p>
            <p className="right-5">Arthur H Dorneles - 2022</p>
        </div>
    )
}
