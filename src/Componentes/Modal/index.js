import { useEffect, useState } from "react";
import { db } from "../../Services/firebaseConnection";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import './modal.css'

function ConteudoModal({ fechar, id }) {
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [mensalidade, setMensalidade] = useState('')
    const [pagamento, setPagamento] = useState('')
    const [vencimento, setVencimento] = useState('')

    useEffect(() => {
        let pegarDadosRef = doc(db, 'matriculas', id)

        async function pegarDados() {
            await getDoc(pegarDadosRef)
                .then((snapshot) => {
                    setNome(snapshot.data().nome)
                    setTelefone(snapshot.data().telefone)
                    setMensalidade(snapshot.data().mensalidade)
                    setPagamento(snapshot.data().pagamento)
                    setVencimento(snapshot.data().vencimento)
                })
        }
        pegarDados()

    }, [])

    async function atualizarDados() {
        let atualizarRef = doc(db, 'matriculas', id)

        await updateDoc(atualizarRef, {
            nome: nome,
            telefone: telefone,
            mensalidade: mensalidade,
            pagamento: pagamento,
            vencimento: vencimento
        })
            .then(() => {
                toast.success('Dados atualizados com sucesso!')

            })
            .catch((error) => {
                console.log('Erro ao atualizar dados', error)
            })
    }

    return (
        <div className="modal-area">
            <h1>Editar matrícula</h1>
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
            <div className="buttons">
                <button onClick={atualizarDados}>Atualizar</button>
                <button onClick={fechar}>Fechar</button>
            </div>

        </div>
    )
}

export default ConteudoModal;