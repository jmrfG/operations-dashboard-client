import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import axios from 'axios';

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/operations/get_All');
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text>Error: {error}</Text>
      </Flex>
    );
  }

  return (
    <Box p="4">
      <Heading as="h1" mb="8">
        Dashboard
      </Heading>
      <Table variant='striped'>
        <Thead>
          <Tr>
            <Th>Payment Type</Th>
            <Th>Description</Th>
            <Th>Total Value</Th>
            <Th>Paid Value</Th>
            <Th>Remaining Value</Th>
            <Th>Reference Date</Th>
            <Th>Payment Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((product) => (
            <Tr key={product.id}>
              <Td>{product.paymentType}</Td>
              <Td>{product.description}</Td>
              <Td>${product.totalValue}</Td>
              <Td>${product.paidValue}</Td>
              <Td>${product.remainingValue}</Td>
              <Td>{product.referenceDate}</Td>
              <Td>{product.paymentDate}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Dashboard;