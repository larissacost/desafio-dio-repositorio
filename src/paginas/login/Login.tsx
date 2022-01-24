import React, { useState, useEffect, ChangeEvent } from 'react'
import { Box, Grid, Typography, TextField, Button } from '@mui/material'
import { Link, useHistory } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { login } from '../../services/Service';
import './Login.css';
import UserLogin from '../../models/UserLogin';



function Login() {

    let history = useHistory();
    const [token, setToken] = useLocalStorage('token');
    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            usuario: '',
            senha: '',
            token: ''
        }
    )

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (token !== '') {
            history.push('/home')
        }
    }, [token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await login(`/usuarios/logar`, userLogin, setToken)
            alert('Usuário logado com sucesso!')
        } catch (error) {
            alert('Dados dos usuários inconsistentes. Erro ao logar!')
        }
        /*console.log('userLogin: ' + Object.values(userLogin));*/
    }

    return (
        <div>
            <Grid container direction="row" justifyContent="center" alignItems="center" className="colorlogin-background">
                <Grid item xs={3} alignItems="center">
                    <Box paddingX="20px" border={1} borderRadius={9} className="boxlogin1">
                        <Box> 
                            <form onSubmit={onSubmit}>
                                <img src="https://i.imgur.com/lkhAgRt.png" alt="" className="tamanho-logo-login"/>   
                                <Typography className='txtFieldColorLogin' align="left">Usuario</Typography>
                                <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="usuario" label="digite seu email" variant="outlined" name="usuario" fullWidth className="campo-de-texto" />
                                <Typography className='txtFieldColorLogin'align="left">Senha</Typography>
                                <TextField  value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="senha" label="digite sua senha" variant="outlined" name="senha" type="password" fullWidth className="campo-de-texto" />
                            </form> 
                        </Box>
                        <Box marginTop={1} textAlign="center">
                            <form onSubmit={onSubmit}> 
                                <Button type="submit" variant="contained" className="botao">
                                    Entrar
                                </Button>
                            </form>
                            <Box display="flex" justifyContent="center" marginTop={2}>
                                <Box>
                                    <Typography variant="subtitle1"  align="center" className='txtFieldColorLogin'>Não possui um cadastro?</Typography>
                                    <Link to='/cadastrousuario'  className='text-decoration-none'> 
                                    <Typography variant="subtitle1" gutterBottom align="center" className="boldColor cursorCad">Cadastrar-se</Typography>
                                    </Link> 
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login;