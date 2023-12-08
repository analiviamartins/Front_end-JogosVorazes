import style from './contato.module.css';
import { useState } from 'react';

const Contato = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Nome: ', nome);
        console.log('Email: ', email);
        console.log('Mensagem: ', mensagem);
    }

    return (
        <section className={style.contato + ' animeLeft'}>
            <div>
                <h1 className="title">Entre em contato</h1>
                <ul className={style.dados}>
                    <li>
                        <h3>Telefone</h3>
                        <span>(11) 99999-9999</span>
                    </li>
</ul>
            </div>
            <form onSubmit={handleSubmit} className={style.form}>
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" name="nome" value={nome} onChange={({ target }) => setNome(target.value)} />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={email} onChange={({ target }) => setEmail(target.value)} />

                <label htmlFor="mensagem">Mensagem</label>
                <textarea id="mensagem" name="mensagem" value={mensagem} onChange={({ target }) => setMensagem(target.value)}></textarea>

                <button>Enviar</button>
            </form>
        </section>
    )
}

export default Contato;