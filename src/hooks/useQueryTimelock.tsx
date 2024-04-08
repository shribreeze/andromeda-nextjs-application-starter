import { childAddress, timelock } from "@/contracts";
import { useQueryContract } from "@/lib/andrjs";
import { useQuery } from "@tanstack/react-query";

/**
 * A hook for performing a query on a given contract, returns an async query function
 * @param address
 * @returns
 */
export default function useQueryTimelock() {
  const query = useQueryContract(timelock);

  return useQuery({
    queryKey: ["timelock", "get_locked_funds_for_recipient", { query }],
    queryFn: async () => {
      console.log("Query Timelock")
      return await query({
        get_locked_funds_for_recipient: {
          recipient: "andr138mxwjgx0mzp8n9gayeyhrqehqcrfapk72vj9d",
        },
      });
    },
  });
}
