import { Grammar } from "./grammar";
import { Header } from "../../components/Header";

interface GrammarIndexProps{
  sentence ?: string;
}
export function GrammarIndex(props: GrammarIndexProps){
  return(
    <div>
      <Header />
      <Grammar/>
    </div>
  )
}
