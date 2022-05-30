import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import { AnalyzerIndex } from './pages/analyzer';
import { GrammarIndex } from './pages/grammar';
import './global.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AnalyzerIndex />}/>
      <Route path="grammar" element={<GrammarIndex />} />
    </Routes>
  </BrowserRouter>
)
