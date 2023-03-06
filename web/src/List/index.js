import { useEffect, useState } from "react";
import React from "react";
import './style/index.scss'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import db from "../firebaseConfig/firebase_config";
import { Link, Route, useNavigate } from 'react-router-dom';
import { getDownloadURL } from "firebase/storage";
import { async } from "@firebase/util";
import UpPage from "../Components/Up_page_log";
import { AiOutlineHome } from 'react-icons/ai';




const Listuser = () => {
    const imgPage = 'https://firebasestorage.googleapis.com/v0/b/avalicao-taugor.appspot.com/o/imgsPage%2Flogo.png?alt=media&token=99101e00-db61-4072-a8bf-3046ce947146';
    const [users, setUsers] = useState([])
    const [cancel, setCancel] = useState(false);
    const docRef = collection(db, "users");

    const DownloadCv = () => {
        
    }
 
  

//   const creatUser = async () =>{
//      const newUser =  await addDoc(docRef,{'dados':'dados'})
//        if(newUser){
//          alert('sucesso')
//        } 
//    }

   

    const delet = async (id) => {
const valite = window.confirm('Tem certeza que deseja excluir?')

        if (valite == true) {
            const userid = doc(db, "users", id);
            const teste = await deleteDoc(userid);
          console.log(teste)
            

        } else {

            console.log('resgiter not fall')
        }
             
        window.location.reload();
    }

    const ativarCv = async (id) => {

          const userdoc = doc(db, "users", id);
          const updatedice = await { ativo: cancel }

         console.log(id,cancel)
         await updateDoc(userdoc, updatedice);
          
          
    }


    useEffect(() => {
        const getUser = async () => {
            const data = await getDocs(docRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        }
        getUser();
       


    }, [cancel]);
   
    

    return (
        <main id="main_home">
            
            <div className="up_home_container">
              <UpPage icon={<AiOutlineHome to={'/'}/>} img={imgPage} title={'Lista De Registros'}/>
              <span className="blue_line">.</span>
            </div>
            <section className="listAll_home_container">

                {
                    
                    users.map((user) => {
                        return (
                            <div className="all_container_user" key={user.id}>
                                <span className="name_link">
                                    <Link to={`Register/${user.id}`} > Editar </Link>
                                    <p><a href="" target={'_blank'}  onClick={() => { delet(user.id) }}>Excluir</a></p>
                                </span>

                                <div className={user.ativo == true ? "container_user" : "container_user_off"}>
                                    <span className="foto">
                                        <img src={user.foto}/>
                                    </span>

                                    <div className="two_div_dice_list">
                                        <span className="big_name"><h3>{user.nome} {user.sobrenome}</h3></span>
                                        <div className="container_dice">
                                            <span>
                                                <p>Email: {user.email}</p>

                                                <p> Endereco: {user.endereco}</p>

                                                <p>  Data de nascimento: {user.dataNascimento}</p>
                                            </span>
                                            <span>
                                                <p>Sexo: {user.sexo}</p>

                                                <p> Telefone: {user.telefone}</p>

                                                <p> nacionalidade: {user.nacionalidade}</p>
                                            </span>

                                            <span>
                                                <p>Cargo: {user.cargo}</p>

                                                <p>Setor: {user.setor}</p>

                                                <p>Data de Admissão: {user.dataAdmissao}</p>
                                            </span>

                                            <span>
                                                <p>Salario: {user.salario}</p>
                                            </span>

                                        </div>


                                    </div>

                                    <div className="three_div_resume">
                                        <h3>{user.resumoProfissional}</h3>
                                    </div>
                                </div>
                                <span className="name_link">
                                    <p><button target="_blank"  onClick={() => { setCancel(!cancel); ativarCv(user.id) }}>{user.ativo ?  'Cancelar contrato' : 'Ativar contrato' }</button></p>
                                </span>
                            </div>
                        )
                    })
                }


            </section>

        </main>
    )

}




export default Listuser;