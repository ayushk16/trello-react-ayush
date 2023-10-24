import {
  Container,
  Box,
  Stack,
  Card,
  CardContent,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';

import useGetList from '../../Hooks/GetLists';
const BoardView = ({ id }) => {
  const { board, loading, error } = useGetList(id);
  console.log('from boards view', board);

  if (loading) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div>error...</div>
      </>
    );
  } else {
    return (
      <>
        {/* <div>
          {board.map((list) => {
            return <div>{list.name}</div>;
          })}
        </div> */}
        <Container>
          <Stack marginTop={3} gap={5} direction="row" overflow="scroll">
            {board.map((list) => {
              return (
                <>
                  <Box width="auto" minWidth={300} maxWidth={500}>
                    <Card
                      sx={{
                        backgroundColor: '#f5f5f5',
                      }}
                    >
                      <CardContent>
                        <Paper elevation={4}>
                          <Typography component="h2" variant="h6">
                            {list.name}
                          </Typography>
                          {/* <h1>{list.name}</h1> */}
                        </Paper>
                      </CardContent>
                    </Card>
                  </Box>
                </>
              );
            })}

            {/* <Box>
              <Card
                sx={{
                  backgroundColor: '#f5f5f5',
                }}
              >
                <CardContent>
                  <Paper elevation={4}>
                    <h1>Board View</h1>
                  </Paper>
                </CardContent>
              </Card>
            </Box> */}
          </Stack>
        </Container>
      </>
    );
  }
};

export default BoardView;
