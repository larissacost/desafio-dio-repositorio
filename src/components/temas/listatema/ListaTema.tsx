import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography, Grid } from '@mui/material';
import Tema from '../../../models/Tema';
import './ListaTema.css';
import useLocalStorage from 'react-use-localstorage';
import { useHistory } from 'react-router-dom';
import { busca } from '../../../services/Service';

function ListaTema() {
  const [temas, setTemas] = useState<Tema[]>([])
  const [token, setToken] = useLocalStorage('token');
  let history = useHistory();

  useEffect(() => {
    if (token == '') {
      alert("VocÃª precisa estar logado")
      history.push("/login")
    }
  }, [token])


  async function getTema() {
    await busca("/temas", setTemas, {
      headers: {
        'Authorization': token
      }
    })
  }


  useEffect(() => {
    getTema()
  }, [temas.length])

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" className="fundo-temas">
        <Box className="caixa-tema-titulo">
          <Typography variant="h3">
            Temas
          </Typography>
        </Box>
        <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center">
          {
            temas.map(tema => (
              <Box m={7} >
                <Card variant="outlined" >
                  <CardContent>
                    <Typography variant="h4" component="h2" className="margem-tema">
                      {tema.nome}
                    </Typography>
                    <Typography variant="h6" component="h2">
                      {tema.descricao}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Box display="flex" justifyContent="center" mb={1.5} >

                      <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none-temas">
                        <Box mx={1}>
                          <Button variant="contained" className="marginLeft" size='small' color="primary" >
                            atualizar
                          </Button>
                        </Box>
                      </Link>
                      <Link to={`/deletarTemas/${tema.id}`} className="text-decorator-none-temas">
                        <Box mx={1}>
                          <Button variant="contained" size='small' color="secondary">
                            deletar
                          </Button>
                        </Box>
                      </Link>
                    </Box>
                  </CardActions>
                </Card>
              </Box>
            ))
          }
        </Box>
      </Grid>
    </>
  );
}


export default ListaTema;