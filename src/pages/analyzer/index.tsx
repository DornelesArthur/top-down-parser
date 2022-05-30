import { Header } from "../../components/Header";
import { Analyzer } from "./analyzer";

interface AnalyzerIndexProps{
  sentence ?: string;
}
export function AnalyzerIndex(props: AnalyzerIndexProps){
  return(
    <div>
      <Header />
      <Analyzer />
    </div>
  )
}
