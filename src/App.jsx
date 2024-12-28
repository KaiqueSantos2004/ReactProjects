import React,{ useState } from 'react'
import './App.css'

export default function App() {

  //Components
  const [screenValue,setScreenValue] = useState('')
  const [result, setResult] = useState(0)
  const [acumulator,setAcumulator] = useState(0)
  const [operated, setOperated] = useState(false)

  const Tela = (value,res) =>{
    return(
      <div className='screen'>
        <span className='screen-operation'>{value}</span>
        <span className='screen-res'>{res}</span>
      </div>
    )
  }

  const Btn=(label,onClick)=>{
    return(
      <button className='button' onClick={onClick}>{label}</button>
    )
  }

  //Functions:
  const addDigitToScreen=(d)=>{
    if (['+', '-', '*', '/'].includes(d)) {
      //verifica se o último digito da tela não é um operador:
      if (!screenValue || ['+', '-', '*', '/'].includes(screenValue.slice(-1))) {
        const valueTillChange = screenValue.substring(0,screenValue.length -1 )
        setScreenValue(`${valueTillChange}${d}`)
        return; 
      }
    }
    if(operated){
      setScreenValue(`${acumulator}${d}`)
      setOperated(false)
      return
    }

    if(d==='.'){
      //impede a existencia de um numero com dois pontos flutuantes
      const segment = screenValue.split(/[\+\-\*\/]/).pop();
      if(segment.includes('.')){
        return
      }
    }

    const inputedValue = screenValue + d;
    setScreenValue(inputedValue)
  }

  const cleanMemory=()=>{
    setOperated(false);
    setScreenValue('');
    setResult(0)
    setAcumulator(0)
    return
  }

  const Operations=(oper)=>{
    if(oper=='bs'){
      let vscreen = screenValue;
      vscreen = vscreen.substring(0,(vscreen.length - 1 ));
      setScreenValue(vscreen);
      setOperated(false);
      return  
    }
    try{
      const r = eval(screenValue)
      setAcumulator(r);
      setResult(r)
      setOperated(true);
    }catch{
      setResult('ERROR')

    }
  } 

  return(
    <>
      <div className='container'>
        <h3>Calculadora Matemática Simples</h3>
        {Tela(screenValue,result)}
        <div className='buttons'>
          {Btn('AC',cleanMemory)}
          {Btn('(',()=>addDigitToScreen('('))}
          {Btn(')',()=>addDigitToScreen(')'))}
          {Btn('/',()=>addDigitToScreen('/'))}
          {Btn('7',()=>addDigitToScreen('7'))}
          {Btn('8',()=>addDigitToScreen('8'))}
          {Btn('9',()=>addDigitToScreen('9'))}
          {Btn('*',()=>addDigitToScreen('*'))}
          {Btn('4',()=>addDigitToScreen('4'))}
          {Btn('5',()=>addDigitToScreen('5'))}
          {Btn('6',()=>addDigitToScreen('6'))}
          {Btn('-',()=>addDigitToScreen('-'))}
          {Btn('1',()=>addDigitToScreen('1'))}
          {Btn('2',()=>addDigitToScreen('2'))}
          {Btn('3',()=>addDigitToScreen('3'))}
          {Btn('+',()=>addDigitToScreen('+'))}
          {Btn('0',()=>addDigitToScreen('0'))}
          {Btn('.',()=>addDigitToScreen('.'))}
          {Btn('<-',()=>Operations('bs'))}
          {Btn('=',()=>Operations('='))}

        </div>
      </div>
    </>
  )
}
