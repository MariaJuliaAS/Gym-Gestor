import { signOut } from 'firebase/auth';
import { auth, db } from '../../Services/firebaseConnection';
import { useNavigate, Link } from 'react-router-dom';
import { onSnapshot, deleteDoc, doc, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './style.css';
import Modal from 'react-modal';
import ConteudoModal from '../../Componentes/Modal';

Modal.setAppElement('#root');

function VerMatriculas() {
    const [matriculas, setMatriculas] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [statusModal, setStatusModal] = useState(false)
    const [id, setId] = useState('')

    let navigate = useNavigate();

    useEffect(() => {
        async function carregarMatriculas() {
            onSnapshot(collection(db, 'matriculas'), (snapshot) => {
                let lista = []

                snapshot.forEach((info) => {

                    lista.push({
                        nome: info.data().nome,
                        telefone: info.data().telefone,
                        mensalidade: info.data().mensalidade,
                        pagamento: info.data().pagamento,
                        vencimento: info.data().vencimento,
                        id: info.id
                    })
                })
                setMatriculas(lista)
                if(lista.length >= 1){
                    setCarregando(false)
                }else{
                    setCarregando(true)
                }
            })
        }

        carregarMatriculas()
    }, [])

    function deslogar() {
        signOut(auth)
        navigate('/', { replace: true })
    }

    async function excluirAluno(id) {
        let deletarRef = doc(db, 'matriculas', id)

        deleteDoc(deletarRef)
            .then(() => {
                toast.success(`Matrícula cancelada com sucesso!`)
            })
            .catch((error) => {
                console.log('Erro ao deletar aluno', error)
            })
    }

    if (carregando) {
        return (
            <main className='container-matricula'>
                <header>
                    <h1>Gym Gestor</h1>
                    <div className='header-btns'>
                        <Link to='/matricula'>Cadastrar novo aluno</Link>
                        <button onClick={deslogar}>Sair da conta</button>
                    </div>
                </header>
                <div className='texto-carregando'>
                    <h1>Nenhum aluno matrículado!</h1>
                </div>
            </main>
        )
    }

    function abrirModal(id){
        setStatusModal(true)
        setId(id)
    }

    function fecharModal(){
        setStatusModal(false)
    }

    return (
        <main className='container-matricula'>
            <header>
                <h1>Gym Gestor</h1>
                <div className='header-btns'>
                    <Link to='/matricula'>Cadastrar novo aluno</Link>
                    <button onClick={deslogar}>Sair da conta</button>
                </div>
            </header>

            <section className='matricula-area'>
                <div className='tabela-area'>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>Mensalidade</th>
                                <th>Forma de pagamento</th>
                                <th>Vencimento</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matriculas.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.nome}</td>
                                        <td>{item.telefone}</td>
                                        <td>{item.mensalidade}</td>
                                        <td>{item.pagamento}</td>
                                        <td>{item.vencimento}</td>
                                        <td>
                                            <button onClick={() => abrirModal(item.id)}>Editar</button>
                                            <button onClick={() => excluirAluno(item.id)}>Excluir</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
            <Modal 
            isOpen={statusModal} 
            contentLabel='Modal'
            className='modal-content'
            overlayClassName='modal-overlay' 
            >
                <ConteudoModal fechar={fecharModal} id={id}/>
            </Modal>
        </main>
    )
}

export default VerMatriculas;