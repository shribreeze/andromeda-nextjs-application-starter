"use client";
import { splitter, childAddress, TimeLockOwner, timelock } from "@/contracts";
import useQueryTimelock from "@/hooks/useQueryTimelock"
import useQuerySplitter from "@/hooks/useQuerySplitter"
import { useExecuteContract } from "@/lib/andrjs";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Center,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {}

const Page: React.FC<Props> = (props) => {
  const [amount, setAmount] = useState<number>(0); // State to hold the amount
  const [showAlert, setShowAlert] = useState<boolean>(false); // State to control alert visibility
  const executeSplitter = useExecuteContract(splitter || "");
  const executeTImelock = useExecuteContract(timelock || ""); // Execute contract function
   // Execute contract function
  const { data }= useQueryTimelock();
  const maximum = data?.funds[0]?.condition.minimum_funds[0];
  const savings = data?.funds[0]?.coins[0];
  
  const { data: splitterData } = useQuerySplitter();
  const walletratio = splitterData?.config.recipients[0]?.percent;
  const timelockratio = splitterData?.config.recipients[1]?.percent;
  
  
  

  const handleSubmit = async () => {
    const msg = { send: {} };
    try {
      // Execute the contract
      await executeSplitter(msg, "auto", "", [
        { amount: amount.toString(), denom: "uandr" },
      ]);

      setShowAlert(true); // Show alert
      setTimeout(() => {
        setShowAlert(false); // Hide alert after 3 seconds
      }, 3000);
    } catch (error) {
      console.error("Error executing contract:", error);
    }
  };

  const handleRelease = async () => {
    const msg = {
        release_funds: {
            recipient_addr: childAddress,
            limit:1
        }
    };
    try {
      // Execute the contract
      await executeTImelock(msg, "auto", "", [
        
      ]);

      setShowAlert(true); // Show alert
      setTimeout(() => {
        setShowAlert(false); // Hide alert after 3 seconds
      }, 3000);
    } catch (error) {
      console.error("Error executing contract:", error);
    }
  };

  return (
    <>
      <Center>
        <FormControl width={200} m={30}>
          <FormControl isRequired>
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              placeholder="Enter the Amount"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            onClick={handleSubmit}
          >
            Send
          </Button>
          <Button
            mt={4}
            colorScheme="teal"
            onClick={handleRelease}
          >
            Release
          </Button>
        </FormControl>
        {/* Card to display savings */}
        <Box
          mt={5}
          p={5}
          borderWidth="1px"
          borderRadius="lg"
          bg="gray.100"
          textAlign="center"
        >
          <Text fontSize="xl">Child&apos;s Savings</Text>
          <Text fontSize="2xl" fontWeight="bold" mt={2}>
            {savings ? `${savings.amount} ${savings.denom}` : 'Loading...'}
          </Text>
        </Box>
        <Box
          mt={5}
          p={5}
          borderWidth="1px"
          borderRadius="lg"
          bg="gray.100"
          textAlign="center"
        >
          <Text fontSize="xl">Condition Amount</Text>
          <Text fontSize="2xl" fontWeight="bold" mt={2}>
            {maximum ? `${maximum.amount} ${maximum.denom}` : 'Loading...'}
          </Text>
        </Box>
        <Box
          mt={5}
          p={5}
          borderWidth="1px"
          borderRadius="lg"
          bg="gray.100"
          textAlign="center"
        >
          <Text fontSize="xl">Regular Ratio</Text>
          <Text fontSize="2xl" fontWeight="bold" mt={2}>
          {walletratio}
          </Text>
        </Box>
        <Box
          mt={5}
          p={5}
          borderWidth="1px"
          borderRadius="lg"
          bg="gray.100"
          textAlign="center"
        >
          <Text fontSize="xl">Savings Ratio</Text>
          <Text fontSize="2xl" fontWeight="bold" mt={2}>
          {timelockratio}
          </Text>
        </Box>

        {/* Alert for successful submission */}
        {showAlert && (
          <Box
            mt={5}
            p={3}
            borderWidth="1px"
            borderRadius="lg"
            bg="green.100"
            textAlign="center"
          >
            <Text fontSize="lg" color="green.800">
              Amount sent successfully!
            </Text>
          </Box>
        )}
        
      </Center>
    </>
  );
};

export default Page;
