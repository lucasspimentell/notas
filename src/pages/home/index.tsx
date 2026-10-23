import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import './home.css';

type Nota ={
    id:number,
    content:string,
    fixed:boolean,
    cor:string
    
} 

interface ContextType{
    searchTerm:string;
}


export function Home(){
    const { searchTerm} = useOutletContext<ContextType>();
    const [temas,setTemas] = useState<string>(()=>{return localStorage.getItem("@tema")||""})
    

    useEffect(()=>{
        localStorage.setItem("@tema",temas)
        if (temas==="claro") {

            document.documentElement.setAttribute("data-tema","claro")
            
        }else{
            document.documentElement.removeAttribute("data-tema")
        }

    },[temas])


    

    // iniciando o estado com oque esta salvo no localStorage
    const [notas,setNotas] = useState<Nota[]>(()=>{

        const notasSalvas = localStorage.getItem("@notas")
        if (notasSalvas) {
            return (JSON.parse(notasSalvas) as Nota[])
        }
        
        return []
        
    });

    const [ input,setInput]=useState("");
   



    useEffect(()=>{
        localStorage.setItem("@notas",JSON.stringify(notas))
        
    },[notas])

 
   
    
    const notasAdd = () =>{
        if(input==""){
            alert("adicione um texto")
            return
        }
        const noteObjet:Nota={
            id:Date.now(),
            content:input,
            fixed:false,
            cor:""
            
        }
        
        setNotas([...notas,noteObjet])
        setInput("");
        
    }
    
    const fixar=(id:number)=>{
        const note = notas.map((item)=>{

            if(item.id === id ) {
                
                return{...item,fixed:!item.fixed}

            }

            return item

            
    })
    
    
        order(note)
    }

    const order = (note:Nota[]) =>{
        const orderNotas = [...note].sort((a,b)=>(a.fixed > b.fixed ? -1 : 1))
         setNotas(orderNotas)
    }
    

  
   
      const apagar = (id:number) =>{
        const novaLista =  notas.filter((item)=>item.id != id)
        setNotas(novaLista)
      }

      const copiar = (id:number)=>{
        const listaCopia =  notas.filter((item)=>item.id === id)[0]

        const copiaObj ={
            id:Date.now(),
            content:listaCopia.content,
            fixed:false,
            cor:""
            
        }

        setNotas([...notas,copiaObj])

      }

      const editando =(id:number,texto:string)=>{
        const listaEditada = notas.map((item)=>{
            if (item.id === id){

                return{...item,content:texto}
            }
            return item
        })

        setNotas(listaEditada);
        
        
      }

      const notasFilter = notas.filter((item)=>
    item.content.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))

      const amarelo =(id:number)=>{
        const mudarCor = notas.map((item)=>{
            
            if(item.id==id){
                return{...item,cor:"amarelo"}
            }
            return item
        
        })

        setNotas(mudarCor)


      }

      const azul =(id:number)=>{
        const mudarCor = notas.map((item)=>{
            
            if(item.id==id){
                return{...item,cor:"azul"}
            }
            return item
        
        })

        setNotas(mudarCor)


      }

      const verde =(id:number)=>{
        const mudarCor = notas.map((item)=>{
            
            if(item.id==id){
                return{...item,cor:"verde"}
            }
            return item
        
        })

        setNotas(mudarCor)


      }

      const rosa =(id:number)=>{
        const mudarCor = notas.map((item)=>{
            
            if(item.id==id){
                return{...item,cor:"rosa"}
            }
            return item
        
        })

        setNotas(mudarCor)


      }

      const tema = () =>{
            setTemas(atual =>(atual === "claro" ? "" : "claro"))
      }
    


    return(
        <main>
                <button className='tema' onClick={()=>{tema()}}><i className="bi bi-lightbulb-fill"></i></button>
            <section className='add_notas'>

            <input type="text"  className='note-content' placeholder='O que deseja anotar?' value={input} onChange={(e)=>setInput(e.target.value)}/>

            

            <button className='add_button' onClick={notasAdd}><i className="bi bi-plus"></i></button>
            </section>

            <section className='notes_container'>

            {notasFilter.map((item)=>(

                <div className={`note ${item.fixed ? "fixa":""} ${item.cor} `}   key={item.id}>
                <textarea placeholder='Adicione algum texto'   value={item.content} onChange={(e)=>editando(item.id,e.target.value)}>
                </textarea>
                <div className='cores_container'>
                <button  className={`cores amarelo`} onClick={()=>{amarelo(item.id)}}></button>
                <button className={`cores azul`} onClick={()=>{azul(item.id)}}></button>
                <button className={`cores rosa`} onClick={()=>{rosa(item.id)}}></button>
                <button className={`cores verde`} onClick={()=>{verde(item.id)}}></button>
                </div>
                    <i className="bi bi-pin-fill" onClick={()=>{
                        fixar(item.id)
                    }}></i>
                    <i className="bi bi-x-lg" onClick={()=>{
                        apagar(item.id)
                    }}></i>
                    <i className="bi bi-files" onClick={()=>{
                        copiar(item.id)}}></i>

            </div>


            ))}

            
            
            
            </section>
            
            

        </main>
    )
}