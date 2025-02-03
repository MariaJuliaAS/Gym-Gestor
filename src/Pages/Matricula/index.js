import './matricula.css';
import { auth, db } from '../../Services/firebaseConnection';
import { signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';

function Matricula() {
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [mensalidade, setMensalidade] = useState('')
    const [pagamento, setPagamento] = useState('')
    const [vencimento, setVencimento] = useState('')

    let navigate = useNavigate();

    function deslogar() {
        signOut(auth)
        navigate('/', { replace: true })
    }

    async function matricular(event) {
        event.preventDefault();

        if (!nome || !telefone || !mensalidade || !pagamento || !vencimento) {
            toast.warn('Por faovr, preencha todos os campos!', { position: 'bottom-right', closeOnClick: true })
            return
        } else if (telefone.length < 11) {
            toast.warn('Por favor, insira um número de telefone válido!', { position: 'bottom-right', closeOnClick: true })
            return
        }

        await addDoc(collection(db, 'matriculas'), {
            nome: nome,
            telefone: telefone,
            mensalidade: mensalidade,
            pagamento: pagamento,
            vencimento: vencimento
        })
            .then(() => {
                toast.success('Usuário cadastrado com sucesso!', { position: 'bottom-right', closeOnClick: true })
                setNome('')
                setTelefone('')
                setMensalidade('')
                setPagamento('')
                setVencimento('')
            })
            .catch((err) => {
                console.log('Erro', err)
            })
    }

    function limparCampos() {
        setNome('')
        setTelefone('')
        setMensalidade('')
        setPagamento('')
        setVencimento('')
    }

    return (
        <main className='container-matricula'>
            <header>
                <h1>Gym Gestor</h1>
                <div className='header-btns'>
                    <Link to='/verMatriculas'>Ver matriculas</Link>
                    <button onClick={deslogar}>Sair da conta</button>
                </div>
            </header>
            <section className='matricula-area'>
                <div className='form-area'>
                    <h1>Cadastro de novos alunos</h1>
                    <form>
                        <input
                            type='text'
                            placeholder='Nome'
                            required
                            className='input-matricula'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Telefone: (DDD)90000-0000'
                            required
                            className='input-matricula'
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                        <select className='input-matricula' value={mensalidade} onChange={(e) => setMensalidade(e.target.value)}>
                            <option disabled selected value=''>Selecione a mensalidade</option>
                            <option value='Mensal - R$70,00'>Mensal - R$70,00</option>
                            <option value='Trimestral - R$190,00'>Trimestral - R$190,00</option>
                            <option value='Semestral - R$390,00'>Semestral - R$390,00</option>
                            <option value='Anual - R$790,00'>Anual - R$790,00</option>
                        </select>
                        <select className='input-matricula' value={pagamento} onChange={(e) => setPagamento(e.target.value)}>
                            <option disabled selected value=''>Selecione a forma de pagamento</option>
                            <option value='Pix'>Pix</option>
                            <option value='Cartão de crédito'>Cartão de crédito</option>
                            <option value='Cartão de débito'>Cartão de débito</option>
                            <option value='Dinheiro'>Dinheiro</option>
                        </select>
                        <input
                            required
                            type='date'
                            className='input-matricula'
                            value={vencimento}
                            onChange={(e) => setVencimento(e.target.value)}
                        />
                    </form>
                    <div className='buttons'>
                        <button type='submit' onClick={matricular}>Fazer matrícula</button>
                        <button onClick={limparCampos}>Limpar</button>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Matricula;