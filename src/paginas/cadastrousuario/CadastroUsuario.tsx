import React, { useState, useEffect, ChangeEvent } from 'react';
import { Grid, Box, Typography, TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './CadastroUsuario.css';
import User from '../../models/User';
import { cadastroUsuario } from '../../services/Service';


function CadastroUsuario() {

    let history = useHistory();
    const [confirmarSenha, setConfirmarSenha] = useState<String>("")
    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            tipoUsuario:'',
            usuario: '',
            senha: ''
        })
    const [userResult, setUserResult] = useState<User>(
        {
            id: 0,
            nome: '',
            tipoUsuario:'',
            usuario: '',
            senha: ''
        })
    useEffect(() => {
        if (userResult.id != 0) {
            history.push("/login")
        }
    }, [userResult])

    function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }


    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        if (user.senha.length >= 8  && confirmarSenha == user.senha) {
            cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
            alert('Usuario cadastrado com sucesso')
        } else {
            alert('Dados inconsistentes. Favor verificar as informações de cadastro.') 
        }
    }

    return (
        <div>
            <Grid container direction="row" justifyContent="center" alignItems="center" className="img-background" style={{backgroundColor:'#dae9ee'}}> 
                    <Box paddingX="20px" border={1} borderRadius={35} className="boxlogin1">   
                        <img src="https://i.imgur.com/lkhAgRt.png" alt="" className="tamanho-logo" />
                        <Box display="flex" justifyContent="center">
                            <Box marginBottom='15px'>
                                <form  onSubmit={onSubmit}>
                                    <Typography  className='txtFieldColor' align="left">Nome</Typography>
                                    <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="nome" label="digite seu nome" variant="outlined" name="nome" fullWidth className="campo-de-texto1" />
                                    <Typography className='txtFieldColor' align="left">Usuario</Typography>
                                    <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="usuario" label="digite seu email" variant="outlined" name="usuario" fullWidth className="campo-de-texto1" />
                                    <Typography className='txtFieldColor' align="left">Tipo de usuario</Typography>
                                    <TextField value={user.tipoUsuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="tipoUsuario" label="digite o tipo de usuario" variant="outlined" name="tipoUsuario" fullWidth className="campo-de-texto1" />
                                </form>
                            </Box>
                            <Box className="boxlogin2">
                                <form onSubmit={onSubmit}>
                                    <Typography className='txtFieldColor' align="left">Senha</Typography>
                                    <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="senha" label="digite sua senha" variant="outlined" name="senha" type="password" fullWidth className="campo-de-texto2" />
                                    <Typography className='txtFieldColor'  align="left">Confirmar senha</Typography>
                                    <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id="confirmarSenha" label="confirmar senha" variant="outlined" name="confirmarSenha" type="password" fullWidth className="campo-de-texto2" />
                                </form>
                                <Box display='flex'  marginTop='25px'>   
                                    <form onSubmit={onSubmit}>
                                        <Link to='/login' className="textDecoration">
                                            <Button size="small"  variant="contained" className='botao-cancel'> 
                                                Cancelar
                                            </Button>
                                        </Link>
                                        <Button size="small" type="submit" variant="contained" className="botao-cadastro">
                                            Cadastrar
                                        </Button>
                                    </form>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
            </Grid>
        </div>
    )
}

export default CadastroUsuario;
