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
import { doc, updateDoc } from 'firebase/firestore';








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
    salario: Number,
    nacionalidade: '',
    resumoProfissional: '',
    experiencia: '',
    foto: '',
    educacao: '',
    idioma: '',
    habilidades: '',
    curriculo: '',
    ativo: true,

  })
  
  const imgPage = 'https://firebasestorage.googleapis.com/v0/b/avalicao-taugor.appspot.com/o/imgsPage%2Flogo.png?alt=media&token=99101e00-db61-4072-a8bf-3046ce947146';

  const navigation = useNavigate();
  const [cont, setCont] = useState(1);
  const [cancel, setCancel] = useState(false)
  const [File, setFile] = useState('');
  const [teste, setTest] = useState();
  const  id  = useParams()


console.log(usersResgister.foto)

  




  const uploadImage = (event) => {
  
 
}

  const updateUser = async (id) => {
     let validate = true;

    if (!usersResgister.nome) {
     window.alert('Campos Obrigatorios Nome')
      validate = false;



    }

    if (!usersResgister.email) {
      window.alert('Campos Obrigatorios Email')
      validate = false;
      setCont(1)

    }
    if (!usersResgister.endereco) {
      window.alert('Campos Obrigatorios Endereco')
      validate = false;
      setCont(1)

    }
    if (!usersResgister.sobrenome) {
      window.alert('Campos Obrigatorios Sobrenome')
      validate = false;
      setCont(1)

    }
    if (!usersResgister.telefone) {
      window.alert('Campos Obrigatorios Telefone')
      validate = false;
      setCont(1)

    }
    if (!usersResgister.dataAniversario) {
      window.alert('Campos Obrigatorios Data de Aniversario')
      validate = false;
      setCont(1)

    }

    if (validate) {

      const userdoc = doc(db, "users", id);
      const updatedice = {usersResgister}
      await updateDoc(userdoc, updatedice);
      navigation('/');



    }
 
  }


  useEffect(() => {
 
  },  [usersResgister])


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
                     <form onSubmit={uploadImage}>
                     <input type="file" id="image" accept=".png, .jpg, .jpeg, .gif" name="image" />
                       <input type='submit' value={'upload'}/>
                     </form>
                    </div>
                  </div>
                  <Input divclass={""} type={""} name="cargo" title={"Emprego"} extiltle={'Ex:Vendedor'} value={usersResgister.cargo} onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }} />
                  <Input divclass={""} type={""} name="endereco" title={"Endereco"} extiltle={'Ex:av. Goiais'} value={usersResgister.endereco} onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }} />
                  <div className='tel_email_nac_data'>
                    <div>
                      <Input divclass={""} type={"tel"} name="telefone" title={"Telefone"} extiltle={'Ex:(11)93258741'} value={usersResgister.telefone} onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }} />
                      <Input divclass={""} type={"email"} name="email" title={"Email"} onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }} />
                    </div>
                    <div>
                      <Input divclass={""} type={""} name="nacionalidade" title={"Nacionalidade"} extiltle={'Ex:Brasil'} value={usersResgister.nacionalidade} onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }} />
                      <Input divclass={""} type={""} name="dataAniversario" title={"Data"} extiltle={'Ex:00/00/00'} value={usersResgister.dataAniversario} onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }} />
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
                <Input divclass={""} type={""} name="dataAdmissao" title={"Data de Admissão"} value={usersResgister.dataAdmissao} onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }} />
                <Input divclass={""} type={"number"} name="salario" title={"Salario"} value={usersResgister.salario} onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }} />
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
                <form onSubmit={''}>
                  <input type={'file'} name='img' accept=".pdf"  />
                  <button name='img' onClick={() => { '' }}>Enviar</button>
                </form>

                <AiOutlineClose onClick={() => { setCancel(true) }} />
              </div>
              <div className='container_buttons'>

                <button className={'ButtonBack'} onClick={() => { setCont(cont - 1) }}> anteriro</button>
                <button className={'ButtonnNext'} onClick={() => { setCont(cont + 1); updateUser(id) }}> salvar</button>
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
                    <textarea className='txtarea' value={''} name='resumProfissional' onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }}>
                     
                    </textarea>
                  </span>
                </div>
                <div className='container_xl'>
                  <h2>Experiencia</h2>
                  <span className='container_txt'>
                    <textarea className='txtarea' value={''}  name='experiencia' onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }}>
                      Experiencia
                    </textarea>
                  </span>
                </div>
                <div className='container_xl'>
                  <h2>educacao</h2>
                  <span className='container_txt'>
                    <textarea className='txtarea' value={''} name='educacao' onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }}>
                      Reducacao
                    </textarea>
                  </span>
                </div>

                <section id='Idioma_habil'>
                  <div className='container_xl'>
                    <h2>Idiomas</h2>
                    <span className='container_txt'>
                      <textarea className='txtarea' value={''}  name='idiomas' onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }}>
                        Idiomas
                      </textarea>
                    </span>
                  </div>
                  <div className='container_xl'>
                    <h2>Habilidades</h2>
                    <span className='container_txt' >
                      <textarea className='txtarea' value={''} name='habilidades' onChange={(event) => { setUsersResgister({ ...usersResgister, [event.target.name]: event.target.value }) }}>
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