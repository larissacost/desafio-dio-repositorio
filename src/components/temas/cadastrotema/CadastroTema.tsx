import React, { useState, useEffect, ChangeEvent } from 'react'
import { Container, Typography, TextField, Button, Grid, Box } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom'
import { buscaId, post } from '../../../services/Service';
import useLocalStorage from 'react-use-localstorage';
import Tema from '../../../models/Tema';
import './CadastroTema.css';


function CadastroTema() {
    let history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [token, setToken] = useLocalStorage('token');
    const [tema, setTema] = useState<Tema>({
        id: 0,
        nome: '',
        descricao: ''

    })

    useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado")
            history.push("/login")

        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/temas/${id}`, setTema, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedTema(e: ChangeEvent<HTMLInputElement>) {

        setTema({
            ...tema,
            [e.target.name]: e.target.value,
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log("tema " + JSON.stringify(tema))

        if (id == undefined) {

            post(`/temas`, tema, setTema, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Tema cadastrado com sucesso');
        }
        back()
    }

    function back() {
        history.push('/temas')
    }


    return (
        <Grid container xs={12} justifyContent="center" alignItems="center" className='planoDeFundo'>

            <Grid item xs={5}>
                <Box className="containerCadastroTema" >
                    <form onSubmit={onSubmit}>
                        <Typography variant="h3" color="textSecondary" component="h1" align="center" className="text1 margem-descricao-tema" >Formulário de cadastro tema</Typography>
                        <Typography variant="h6" className="txtFieldColor-post" marginTop="10px" align="left">Titulo</Typography>
                        <TextField className="caixa-de-texto-fundo margem-descricao-tema" value={tema.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="nome do tema" label="nome do tema" variant="outlined" name="nome do tema" fullWidth />
                        <Typography variant="h6" className="txtFieldColor-post" marginTop="10px" align="left">Descrição</Typography>
                        <TextField className="caixa-de-texto-fundo margem-descricao-tema" value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="descricao" label="descrição" variant="outlined" name="descricao" fullWidth />
                        <Button type="submit" variant="contained" color="primary">
                            Cadastrar
                        </Button>
                    </form>
                </Box>
            </Grid>

        </Grid>
    )
}

export default CadastroTema;