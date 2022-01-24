import React, { ChangeEvent, useEffect, useState } from 'react'
import { TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText, Grid, Box, Container } from "@material-ui/core";
import { Typography } from "@mui/material"
import './CadastroPost.css';
import { useHistory, useParams } from 'react-router-dom';
import Tema from '../../../models/Tema';
import useLocalStorage from 'react-use-localstorage';
import Postagem from '../../../models/Postagem';
import { busca, buscaId, post } from '../../../services/Service';

function CadastroPost() {
    let history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [temas, setTemas] = useState<Tema[]>([])
    const [token, setToken] = useLocalStorage('token');

    useEffect(() => {
        if (token == "") {
            alert("VocÃª precisa estar logado")
            history.push("/login")

        }
    }, [token])

    const [tema, setTema] = useState<Tema>(
        {
            id: 0,
            nome: '',
            descricao: ''
        })
    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        imagemUrl: '',
        data: '',
        tema: null
    })

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    async function getTemas() {
        await busca("/temas", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function findByIdPostagem(id: string) {
        await buscaId(`postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {

        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id == undefined && tema.nome != "" && postagem.titulo != "" && postagem.texto != "") {
            post(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            alert('Postagem cadastrada com sucesso');
            back()
        }
        else {
            alert('Preencha os campos corretamente');
        }

    }

    function back() {
        history.push('/posts')
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h4">Postar</Typography>
                <Typography variant="h6" className="txtFieldColor-post" marginTop="10px" align="left">Titulo</Typography>
                <TextField value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="titulo" label="titulo" variant="outlined" name="titulo" placeholder="O titulo deve ter no minimo" fullWidth className="caixatexto-color" />
                <Typography variant="h6" className="txtFieldColor-post" marginTop="10px" align="left">Texto</Typography>
                <TextField value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="texto" label="texto" name="texto" variant="outlined" placeholder="O titulo deve ter no minimo" fullWidth multiline={true} minRows={5} className="caixatexto-color" />
                <Typography variant="h6" className="txtFieldColor-post" marginTop="10px" align="left">Imagem</Typography>
                <TextField value={postagem.imagemUrl} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="imagemUrl" label="imagem" name="imagemUrl" variant="outlined" placeholder="insira a url de uma imagem" fullWidth className="caixatexto-color" />
                <FormControl >
                    <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema, {
                            headers: {
                                'Authorization': token
                            }
                        })}>
                        {
                            temas.map(tema => (
                                <MenuItem value={tema.id}>{tema.nome}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                    <Button type="submit" variant="contained" color="primary">
                        Postar
                    </Button>
                </FormControl>
            </form>
        </Container>
    )
}
export default CadastroPost;