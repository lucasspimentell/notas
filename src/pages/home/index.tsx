import { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router';
import './home.css';

type Nota ={
    id:number,
    titulo:string,
    content:string,
    fixed:boolean,
    cor:string,
    btnFont:boolean,
    font:string
    
} 

interface ContextType{
    searchTerm:string;
}


export function Home(){
    const inputRef = useRef<HTMLTextAreaElement>(null)
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
            const notasParse = JSON.parse(notasSalvas) as Nota[]

            const notaAtualizada = notasParse.map((item)=>{
                return{...item,btnFont:false}
            })

            return notaAtualizada
        }
        
        return []
        
    });

    const [ input,setInput]=useState("");
    const [titulo,setTitulo] =useState("");



    useEffect(()=>{
        localStorage.setItem("@notas",JSON.stringify(notas))
        
    },[notas])

 
   
    
    const notasAdd = () =>{
        if(titulo==""){
            alert("adicione um texto")
            return
        }
        const noteObjet:Nota={
            id:Date.now(),
            titulo:titulo,
            content:input,
            fixed:false,
            cor:"",
            btnFont:false,
            font:""

            
        }
        
        setNotas([...notas,noteObjet])
        setTitulo("");
        setInput("")
        
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
            titulo:titulo,
            content:listaCopia.content,
            fixed:false,
            cor:"",
            btnFont:false,
            font:""
            
        }

        setNotas([...notas,copiaObj])

      }

      const editando =(id:number,texto:string)=>{
        /* inputRef.current?.focus() */
        const listaEditada = notas.map((item)=>{
            if (item.id === id){

                return{...item,content:texto}
            }
            return item
        })

        setNotas(listaEditada);
        
        
      }

       const editandoTitulo = (id:number,titulo:string) =>{

        const listaEditada = notas.map((item)=>{
            if (item.id === id){

                return{...item,titulo:titulo}
            }
            return item
        })

        setNotas(listaEditada);
        
      }

      const notasFilter = notas.filter((item)=>
    (item.titulo??"").toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))

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

      const cardo =(id:number)=>{
        const mudarFont = notas.map((item)=>{
            
            if(item.id==id){
                return{...item,font:"cardo"}
            }
            return item
        
        })

        setNotas(mudarFont)


      }

   
      const caveat =(id:number)=>{
        const mudarFont = notas.map((item)=>{
            
            if(item.id==id){
                return{...item,font:"caveat"}
            }
            return item
        
        })

        setNotas(mudarFont)


      }

      const helvetica =(id:number)=>{
        const mudarFont = notas.map((item)=>{
            
            if(item.id==id){
                return{...item,font:"helvetica"}
            }
            return item
        
        })

        setNotas(mudarFont)


      }

      const tema = () =>{
            setTemas(atual =>(atual === "claro" ? "" : "claro"))
      }

    const mostrar = (id:number,font:boolean) =>{
        const mudarFont = notas.map((item)=>{
             if (item.id == id ) {
            return{...item,btnFont:!font}
        }
        return item
        })

        setNotas(mudarFont)
        console.log(notas)
    } 
  
    

    return(
        <main>
                <button className='tema' onClick={()=>{tema()}}><i className="bi bi-lightbulb-fill"></i></button>
            <section className='add_notas'>

            <input type="text"  className='note-content' placeholder='criar post-it ' value={titulo} onChange={(e)=>setTitulo(e.target.value)}/>

            

            <button className='add_button' onClick={notasAdd}><i className="bi bi-plus"></i></button>
            </section>

            <section className='notes_container'>

            {notasFilter.map((item)=>(

                <div className={`note ${item.fixed ? "fixa":""} ${item.cor} `}   key={item.id}>
                <input className={`inputTitulo ${item.font}`} value={item.titulo} onChange={(e)=>editandoTitulo(item.id,e.target.value)}/>
                <textarea className={`conteudo ${item.font}` }placeholder='Adicione algum texto'   value={item.content} onChange={(e)=>editando(item.id,e.target.value)} ref={inputRef}>
                    
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


                     <div className='container_fonts'>
                        <i className='bi bi-file-font' onClick={()=>{mostrar(item.id,item.btnFont)}}>
                        
                     </i>   
                    <div className={`font_container ${item.btnFont ? "mostrar":"esconder"}`}>
                        
                        <button className={`cardo ${item.font == "cardo" ? "font_selecionada" :""}`}  onClick={()=>cardo(item.id)}>I</button>
                        <button className={`caveat ${item.font == "caveat" ? "font_selecionada" :""}`}onClick={()=>caveat(item.id)} >C</button>
                        <button className={`helvetica ${item.font == "helvetica" ? "font_selecionada" :""}`}onClick={()=>helvetica(item.id)}>H</button>
                    </div>
                     </div>
            </div>


            ))}

            
            
            
            </section>
            
            

        </main>
    )
}