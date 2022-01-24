import React from 'react'
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './NavBar.css'
import useLocalStorage from 'react-use-localstorage';
import { useHistory } from 'react-router-dom';

function NavBar() {

    const [token, setToken] = useLocalStorage('token') 
    let history = useHistory(); 

    function goLogout() {
        setToken('')
        alert('Usuário deslogado')
        history.push('/login')
    }
    return (
        <>
            <AppBar position="static" className="cor-navBar">
                <Toolbar variant="dense">
                    <Box>
                        <img src="https://i.imgur.com/kjX8SxB.png" alt="" className="logo-nav" />
                    </Box>

                    <Box display="flex" justifyContent="space-around" ml="alto" width="100%">
                        <Link to="/home" className="text-decoration-none">
                            <Box mx={1} className="cursor">
                                <Typography variant="h6" color="inherit">
                                    Home
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/sobre-nos" className="text-decoration-none">
                            <Box mx={1} className="cursor">
                                <Typography variant="h6" color="inherit">
                                    Sobre nós
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/posts" className="text-decoration-none">
                            <Box mx={1} className="cursor">
                                <Typography variant="h6" color="inherit">
                                    Postagens
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/temas" className="text-decoration-none">
                            <Box mx={1} className="cursor">
                                <Typography variant="h6" color="inherit">
                                    Temas
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="/formularioTema" className="text-decorator-none">
                            <Box mx={1} className='cursor'>
                                <Typography variant="h6" color="inherit">
                                    Cadastrar tema
                                </Typography>
                            </Box>
                        </Link>
                        <Box mx={1} className='cursor' onClick={goLogout}>
                            <Typography variant="h6" color="inherit"> 
                                Sair
                            </Typography>
                        </Box>
                    </Box>

                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar;