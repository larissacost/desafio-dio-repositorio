import React, { useEffect } from 'react'
import './Home.css';
import { Typography, Box, Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import ListaPostagem from '../../components/postagens/listapostagem/ListaPostagem';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';


function Home() {

    let history = useHistory();
    const [token, setToken] = useLocalStorage('token');
    useEffect(() => {
        if (token == '') {
            alert("Você precisa estar logado!")
            history.push('/login')
        }
    }, [token])
    return (
        <>
            <Grid container direction='row' justifyContent="center" className='fundo-home' display='flex'>
                <Grid item xs={2}>
                    <Box display="flex" className="containerHome" >
                    <Box style={{ width:'100%', borderRadius:'15px'}}>    
                            <img src="https://i.imgur.com/fbO3Y7f.jpg" alt="" className='imgPost'/>   
                        </Box>
                        <Typography variant="h5" marginBottom="20px"> Nome usuário</Typography>
                        <Typography variant="h6" marginX="10px" textAlign="center"> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Dolor totam reiciendis repellendus dolorem temporibus consequuntur iusto
                            debitis, fugit voluptatum ea pariatur debitis, fugit voluptatum ea pariatur sequi veritatis facilis
                            quasi asperiores? Praesentium dolorum eum eos!</Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} justifyContent='center' alignItems='center'>
                    <Box display='flex' className='containerForm' height='5%'>
                        <Box justifyContent='left' width='20%' >
                            <img src="https://i.imgur.com/fbO3Y7f.jpg" alt="" className='imgPost'/>     
                        </Box>
                        <Box width='80%'>
                            <ModalPostagem />
                        </Box>
                    </Box>
                  <Box marginBottom={15}> 
                  <ListaPostagem />
                  </Box>   
                </Grid>
                <Grid item xs={2}>
                    <Box display="flex" className="containerHome" >
                        <Typography variant="h4" marginBottom="20px"> Deixe aqui suas ideias</Typography>
                        <Typography variant="h6" marginX="10px" textAlign="center"> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Dolor totam reiciendis repellendus dolorem temporibus consequuntur iusto
                            debitis, fugit voluptatum ea pariatur debitis, fugit voluptatum ea pariatur sequi veritatis facilis
                            quasi asperiores? Praesentium dolorum eum eos!</Typography>
                        <Box className="imagem-home"></Box>
                    </Box>
                </Grid>
            </Grid>

        </>
    )
}

export default Home