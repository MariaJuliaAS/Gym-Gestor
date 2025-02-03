import picture from '../../img/academia.png';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../Services/firebaseConnection';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'react-toastify';

function Cadastro(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    let navigate = useNavigate();

    async function cadastrar(event){
        event.preventDefault(); //evita o padrão de submissão do button no form (enviar o form e recarregar a página)

        createUserWithEmailAndPassword(auth, email, senha)
        .then((infoUsuario) => {
            const usuario = infoUsuario.user
            sendEmailVerification(usuario)
            .then(() => {
                toast.success('Novo funcionário cadastrado! Um email de verificação foi enviado.', {
                    closeOnClick: true
                })
                setEmail('')
                setSenha('')
                navigate('/', {replace: true})
            })
            .catch((err) => {
                console.log('Erro ao enviar email de verificação', err)
            })
        })
        .catch((err) => {
            if(err.code === 'auth/weak-password'){
                toast.error('Senha muito fraca!', {
                    closeOnClick: true
                })
            }else if(err.code === 'auth/email-already-in-use'){
                toast.error('Esse email já existe!', {
                    closeOnClick: true
                })
            }
        })
    }

    return(
        <main className="container">

            <section className="cadastro-area">
                <div className='login-area'>
                    <h1>Cadastro</h1>
                    <form>
                        <input 
                        type='email' 
                        placeholder='Email' 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                        type='password' 
                        placeholder='Senha' 
                        required
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        />
                        <button type='submit' onClick={cadastrar}>Cadastrar</button>
                    </form>
                    <Link to='/'>Já possui conta? Entre aqui.</Link>
                </div>
            </section>

            <article className="motivacional-area">
                <div className='info-area'>
                    <h1>Gym Gestor</h1>
                    <h3>Gerencia alunos de forma prática e eficiente!</h3>
                    <img src={picture} alt='Pesos de academia' />
                    <p>Exercício = Melhor desempenho na sua vida!</p> <br/>
                    <p>+500 alunos matriculados | 10 treinadores qualificados | 90% de satisfação</p>
                </div>
            </article>
        </main>
    )
}

export default Cadastro;