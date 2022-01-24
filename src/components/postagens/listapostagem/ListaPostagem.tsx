import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography, Grid } from '@mui/material';
import useLocalStorage from 'react-use-localstorage';
import { busca, post, } from '../../../services/Service';
import Postagem from '../../../models/Postagem';
import "./ListaPostagem.css";

function ListaPostagem() {
    const [posts, setPosts] = useState<Postagem[]>([])
    const [token, setToken] = useLocalStorage('token');
    let history = useHistory();

    useEffect(() => {
        if (token == "") {
            alert("VocÃª precisa estar logado")
            history.push("/login")

        }
    }, [token])

    async function getPost() {
        await busca("/postagens", setPosts, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {

        getPost()

    }, [posts.length])

    return (
        <div>  
            <Grid className='fundo-listap'>
          
                {
                    posts.map(post => (
                        <Grid container >
                            <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                                <Box className='containerListPost'> 
                                    <Box alignItems='center' justifyContent='center'>
                                    <Typography variant="body2" textAlign='left' style={{fontWeight:'bold', color:'#224a59'}}>     
                                            {post.usuario?.nome}
                                    </Typography>
                                        <Typography variant="h5" gutterBottom  align='center' justifyContent='center'>
                                            {post.titulo}
                                        </Typography>
                                        <Typography variant="body1" align='center' component="p" noWrap>
                                            {post.texto}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <img src={post.imagemUrl} alt="" width="500px" />
                                    </Box>
                                    <Typography variant="body2" textAlign='right'>  
                                            {post.tema?.nome}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    )
}

export default ListaPostagem;