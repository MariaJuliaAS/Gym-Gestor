import './login.css';
import picture from '../../img/academia.png';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../Services/firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'react-toastify';

function LoginApp() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    let navigate = useNavigate();

    async function entrar(event) {
        event.preventDefault();

        await signInWithEmailAndPassword(auth, email, senha)
            .then((infoUsuario) => {
                const usuario = infoUsuario.user;

                if (usuario.emailVerified) {
                    navigate('/matricula', { replace: true })
                } else {
                    toast.error('Por favor, verifique seu e-mail antes de acessar.', {
                        closeOnClick: true
                    })
                }
            })
            .catch((err) => {
                console.log(err.code)
                switch (err.code) {
                    case 'auth/invalid-credential':
                    case 'auth/wrong-password':
                    case 'auth/user-not-found':
                        toast.error('Email ou senha inválidos!', { closeOnClick: true });
                        break;
                    case 'auth/too-many-requests':
                        toast.error('Muitas tentativas, tente mais tarde!', { closeOnClick: true });
                        break;
                    default:
                        toast.error('Erro ao fazer login!', { closeOnClick: true });
                }
            })
    }

    return (
        <main className="container">
            <section>
                <article className="cadastro-area">
                    <div className='login-area'>
                        <h1>Login</h1>
                        <form onSubmit={entrar}>
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
                            <button type='submit'>Entrar</button>
                        </form>
                        <Link to='/cadastrar'>Cadastrar nova academia.</Link>
                    </div>
                </article>

                <article className="motivacional-area">
                    <div className='info-area'>
                        <h1>Gym Gestor</h1>
                        <h3>Gerencia alunos de forma prática e eficiente!</h3>
                        <img src={picture} alt='Pesos de academia' />
                        <p>Exercício = Melhor desempenho na sua vida!</p> <br />
                        <p>+500 alunos matriculados | 10 treinadores qualificados | 90% de satisfação</p>
                    </div>
                </article>
            </section>
        </main>
    )
}

export default LoginApp;