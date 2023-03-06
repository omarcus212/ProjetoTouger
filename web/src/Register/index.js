import React, { useEffect, useState } from 'react';
import Input from '../Components/Input';
import db from '../firebaseConfig/firebase_config';
import { AiOutlineClose, AiOutlineHome } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md'
import { useNavigate, useParams, } from 'react-router-dom';
import UpPage from '../Components/Up_page_log';
import ContainerInfo from '../Components/Containerinfo';
import { getDownloadURL, ref, uploadBytesResumable, getStorage, UploadTask, uploadBytes } from 'firebase/storage';
import './style/index.scss'
import { doc, updateDoc, collection, update } from 'firebase/firestore';








const Register = () => {

  const [usersResgister, setUsersResgister] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    telefone: '',
    endereco: '',
    dataAniversario: '',
    dataAdmissao: '',
    sexo: '',
    cargo: '',
    setor: '',
    salario: '',
    nacionalidade: '',
    resumoProfissional: '',
    experiencia: '',
    foto: 'https://firebasestorage.googleapis.com/v0/b/avalicao-taugor.appspot.com/o/imgsPage%2FexpPerfil.jpg?alt=media&token=8f52c7e7-7cf5-42b9-9f6b-c4548420970b',
    educacao: '',
    idioma: '',
    habilidades: '',
    curriculo: '',
    ativo: true,

  })

  const imgPage = 'https://firebasestorage.googleapis.com/v0/b/avalicao-taugor.appspot.com/o/imgsPage%2Flogo.png?alt=media&token=99101e00-db61-4072-a8bf-3046ce947146';
  const exFoto = 'https://firebasestorage.googleapis.com/v0/b/avalicao-taugor.appspot.com/o/imgsPage%2FexpPerfil.jpg?alt=media&token=8f52c7e7-7cf5-42b9-9f6b-c4548420970b'
  const navigation = useNavigate();
  const [cont, setCont] = useState(1);
  const [cancel, setCancel] = useState(false)
  const [File, setFile] = useState(exFoto);
  const id = useParams()



  const handleSubmit = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
   
    

    const storage = getStorage();
     const storageRef = ref(storage, `fotos/${file.name}`);

    
    await uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });



    await getDownloadURL(storageRef).then((downloadURL) => {
      setFile(downloadURL);
      setUsersResgister({ ...usersResgister, "foto": downloadURL })

    })


  };


  const handlePdf = async (event) => {
    event.preventDefault();
    const file = event.target[0]?.files[0];



    const storage = getStorage();
    const storageRef = ref(storage, `curriculos/${file.name}`);

    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded pdf!');
    });


    await getDownloadURL(storageRef).then((downloadURL) => {
      setUsersResgister({ ...usersResgister, "curriculo": downloadURL })

    })

  }


  const updateUser = async (id,data) => {
    
  var valite = true
   const washingtonRef = doc(db, "users", id);



    if(!usersResgister.nome){
      window.alert("Campos Obrigatorios");
      valite = false
    }

    if(valite){
      setCont(cont + 1);
      await updateDoc(washingtonRef, data);
      navigation('/')
    }else{
      setCont(1);
    }
  
   


  }



  useEffect(() => {
    
  }, [usersResgister])


  return (
    <main id='main_home_register'>

      <div className='up_home_container'>
        <UpPage icon={<AiOutlineHome onClick={() => { navigation('/') }} />} img={imgPage} title={'Lista De Registros'} />
        <span className={cont == 1 ? "blue_line" : "blue_line1" || cont == 2 ? "" : "" || cont == 3 ? "" : ""}>.</span>
      </div>
      <div className='container_register'>
        <section className='register_user'>
          {

            cont == 1 &&
            <>

              <div className='etap_first'>
                <div className='container_inputs'>
                  <div className='inputs_and_foto'>
                    <div className='name_secondname'>
                      <Input divclass={""} type={""} name="nome" title={"Nome"} extiltle={'Ex:Fernando'} value={usersResgister.nome} onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }} />
                      <Input divclass={""} type={""} name="sobrenome" title={"sobrenome"} extiltle={'Ex:Silva'} value={usersResgister.sobrenome} onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }} />
                    </div>
                    <div className='img_container'>
                      <img src={File} />
                    
                        <input type="file" id="image"  name="foto" onChange={(event)=>{handleSubmit(event)}}/>
                     
                    </div>
                  </div>
                  <Input divclass={""} type={""} name="cargo" title={"Emprego"} extiltle={'Ex:Vendedor'} value={usersResgister.cargo} onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }} />
                  <Input divclass={""} type={""} name="endereco" title={"Endereco"} extiltle={'Ex:av. Goiais'} value={usersResgister.endereco} onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }} />
                  <div className='tel_email_nac_data'>
                    <div>
                      <Input divclass={""} type={"tel"} name="telefone" title={"Telefone"} extiltle={'Ex:(11)93258741'} value={usersResgister.telefone} onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }} />
                      <Input divclass={""} type={"email"} name="email" title={"Email"} extiltle={'Taugor@gmail.com'} onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }} />
                    </div>
                    <div>
                      <Input divclass={""} type={""} name="nacionalidade" title={"Nacionalidade"} extiltle={'Ex:Brasil'} value={usersResgister.nacionalidade} onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }} />
                      <Input divclass={""} type={"date"} name="dataAniversario" title={"Data"} extiltle={'Ex:00/00/00'} value={usersResgister.dataAniversario} onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }} />
                    </div>

                  </div>

                </div>
              </div>
              <div className='container_buttons'>
                <button className={'ButtonBack'} onClick={() => { navigation('/') }}> anteriro</button>
                <button className={'ButtonnNext'} onClick={() => { setCont(cont + 1) }}> Proximo</button>
              </div>
            </>


          }
          {
            cont == 2 &&
            <>
              <div className='etap_second'>
              <Input divclass={""} type={""} name="setor" title={"Setor"} extiltle={'Ex: Vendas'} value={usersResgister.setor} onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }} />
                <Input divclass={""} type={""} name="dataAdmissao" title={"Data de Admissão"} extiltle={'00/00/2023'} value={usersResgister.dataAdmissao} onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }} />
                <Input divclass={""} type={""} name="salario" title={"Salario"} extiltle={'Ex: 1500'} value={usersResgister.salario} onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }} />

                <div className='all_div'>
                <p>Sexo</p>
                  <select className='P_option'  onChange={(e)=>{setUsersResgister({...usersResgister, [e.target.name]: e.target.value })}}>
                    <option className={ "P_option"} value="MASCULINO" selected>Masculino</option>
                    <option className={"P_option"} value="FEMININO">Feminino</option>
                    <option className={"P_option"} value="OUTROS">Outros</option>
                  </select>
                  <p className="example">Ex:Masculino</p>
                </div>
                
                        </div>
                        <div className='container_buttons'>

                          <button className={'ButtonBack'} onClick={() => { setCont(cont - 1) }}> anteriro</button>
                          <button className={'ButtonnNext'} onClick={() => { setCont(cont + 1) }}> Proximo</button>
                        </div>
                      </>


          }
                      {
                        cont == 3 &&
                        <>
                          <div className='curriculo_pdf'>
                            <form onSubmit={handlePdf}>
                              <input type={'file'} name='curriculo' accept=".pdf" />
                              <button name='img'>Enviar</button>
                            </form>
                          </div>
                          <div className='container_buttons'>

                            <button className={'ButtonBack'} onClick={() => { setCont(cont - 1) }}> anteriro</button>
                            <button className={'ButtonnNext'} onClick={() => { updateUser(id.id, usersResgister) }}> salvar</button>
                          </div>
                        </>

                      }
                      {
                        cont == 4 &&
                        <div className='finsh_register'>
                          <MdVerified />
                        </div>
                      }


                    </section>
                    <div className='register_user'>
                      {
                        cont <= 1 ?
                          <section className='container_info'>
                            <ContainerInfo className={'container_xl'} title1={'Fernadno'} text2={'Silva'} />
                            <div className='container_xl'>
                              <h2>{usersResgister.nome} {usersResgister.sobrenome}</h2>
                              <span className='container_txt'>
                                <textarea className='txtarea' placeholder='Resumo Profissional' value={usersResgister.resumoProfissional} name='resumoProfissional' onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }}>

                                </textarea>
                              </span>
                            </div>
                            <div className='container_xl'>
                              <h2>Experiencia</h2>
                              <span className='container_txt'>
                                <textarea className='txtarea' placeholder='Expereiencia' value={usersResgister.experiencia} name='experiencia' onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }}>
                                  Experiencia
                                </textarea>
                              </span>
                            </div>
                            <div className='container_xl'>
                              <h2>Educacao</h2>
                              <span className='container_txt'>
                                <textarea className='txtarea' placeholder='Educação' value={usersResgister.educacao} name='educacao' onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }}>
                                  Reducacao
                                </textarea>
                              </span>
                            </div>

                            <section id='Idioma_habil'>
                              <div className='container_xl'>
                                <h2>Idiomas</h2>
                                <span className='container_txt'>
                                  <textarea className='txtarea' placeholder='Idiomas' value={usersResgister.idioma} name='idioma' onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }}>
                                    Idiomas
                                  </textarea>
                                </span>
                              </div>
                              <div className='container_xl'>
                                <h2>Habilidades</h2>
                                <span className='container_txt' >
                                  <textarea className='txtarea' placeholder='Habilidades' value={usersResgister.habilidades} name='habilidades' onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }}>
                                    Habilidades
                                  </textarea>
                                </span>
                              </div>

                            </section>

                          </section>
                          :
                          <div className='finsh_register'>
                            <MdVerified />
                          </div>
                      }
                    </div>
                  </div>

                </main>

                )
}




                export default Register;