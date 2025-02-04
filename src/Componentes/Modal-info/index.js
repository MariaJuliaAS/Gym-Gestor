import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../Services/firebaseConnection";
import './style.css';

function ModalInfo({ fechar }) {
    const [infoAcad, setInfoAcad] = useState([])
    const [carregando, setCarregnado] = useState(true)
    useEffect(() => {

        const q = query(
            collection(db, 'cadastro-academia'),
            where('userId', '==', auth.currentUser.uid)
        )

        function carregarInfosAcad() {
            getDocs(q)
                .then((snapshot) => {
                    let listaInfoAcad = []
                    snapshot.forEach((info) => {
                        listaInfoAcad.push({
                            academia: info.data().academia,
                            email: info.data().email,
                            endereco: info.data().endereco
                        })
                    })
                    setInfoAcad(listaInfoAcad)
                    setCarregnado(false)
                })
                .catch((error) => {
                    console.log(error.code)
                })
        }

        carregarInfosAcad();

    }, [])

    if(carregando){
        return(
            <h1 style={{color: '#fff'}}>Carregando informações...</h1>
        )
    }

    return (
        <div className="container-info">
            <h1>Informações da academia</h1>
            {infoAcad.map((item) => {
                return (
                    <div className="area-info">
                        <p><strong>Nome:</strong> {item.academia}</p>
                        <p><strong>E-mail:</strong> {item.email}</p>
                        <p><strong>Endereço:</strong> {item.endereco}</p>
                    </div>
                )
            })}

            <button onClick={fechar}>Fechar</button>
        </div>
    )
}

export default ModalInfo;