// Complete the Index page component here
// Use chakra-ui
import { Box, Container, Heading, Text, Input, Button, VStack, useToast } from "@chakra-ui/react";
import { FaPython, FaTerminal, FaRegClipboard } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const toast = useToast();

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const executeCode = () => {
    try {
      // Simulating Python code execution in a terminal
      // This is a placeholder, in a real app you would use a server-side execution environment
      const sanitizedCode = code.replace(/['"“”‘’]/g, ""); // Remove quotation marks and punctuation
      const functionBody = new Function(sanitizedCode);
      const result = functionBody();
      setOutput(result.toString());
    } catch (error) {
      toast({
        title: "Error executing code",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4}>
        <Heading as="h1" size="xl" textAlign="center">
          Python Code Generator <FaPython />
        </Heading>
        <Text>Write and execute Python code directly in your browser. Ensure there are no quotation marks or punctuation in your responses.</Text>
        <Input placeholder="Write your Python code here..." value={code} onChange={handleCodeChange} size="lg" />
        <Button leftIcon={<FaTerminal />} colorScheme="blue" onClick={executeCode}>
          Execute Code
        </Button>
        <Box p={4} w="full" bg="gray.100" borderRadius="md">
          <Heading as="h3" size="md">
            Output:
          </Heading>
          <Text fontFamily="monospace">{output}</Text>
        </Box>
        <Button leftIcon={<FaRegClipboard />} colorScheme="teal" onClick={() => navigator.clipboard.writeText(code)}>
          Copy Code to Clipboard
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
