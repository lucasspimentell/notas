import './header.css';

interface HeaderProps{
    searchTerm:string,
    onSearchTerm:(value:string)=>void;


}

type Nota ={
    id:number,
    content:string,
    fixed:boolean
}



export function Header({searchTerm,onSearchTerm}:HeaderProps){

    const exportar = () =>{
        const notasSalvas = localStorage.getItem("@notas")
        if (notasSalvas) {
              const notas = JSON.parse(notasSalvas) as Nota[]

            const csv = [
                ["ID","CONTEUDO","FIXED"],
                ...notas.map((nota)=>[nota.id,nota.content,nota.fixed])
            ].map((e)=>e.join(",")).join("\n")

            console.log(csv)

            const element = document.createElement("a");
            element.href="data:text/csv;charset=UTF-8," + encodeURI(csv);
            element.target = "_blank";
            element.download = "notas.csv"
           element.click();

        }
        
        return []

        
    }

    



    return(
        <header>
            <h1>Notas</h1>
            <div className='search_container'>
                <i className='bi bi-search'></i>
                <input type="text" placeholder='Buscar uma nota'  className='search_input'
                value={searchTerm}
                onChange={(e)=>onSearchTerm(e.target.value)}
                />
                
            </div>
            <button className='export'onClick={exportar}> Exportar CSV <i className="bi bi-box-arrow-down" ></i></button>
        </header>
    )
}
